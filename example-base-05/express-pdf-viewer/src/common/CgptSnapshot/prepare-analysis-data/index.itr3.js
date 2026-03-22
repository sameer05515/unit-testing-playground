/* eslint-disable no-console -- one-off CLI snapshot / analysis script */
const path = require('path');
const fs = require('fs');
const FileRelatedOperations = require('../../FileRelatedOperations.services.v2');
const { JsonFileMapWithDetails } = require('../services');
const Constants = require('../../constants');
const ProcessedConversation = require('../ProcessedConversation');
const { HoliSpecialColors } = require('./holiSpecialLog');
const getConversationMessages = require('./getConversationMessages');
const formatUnixTimestamp = require('./formatUnixTimestamp');

const outputRootDirectory = 'D:\\v-dir';
const baseProcessedJsonPath = path.join(outputRootDirectory, 'base.json');

const getItr2OutputPath = conversationSlug =>
  path.join(outputRootDirectory, 'itr2', conversationSlug);

const printStepBanner = (title = '', detail = '') => {
  console.log('-------------------------------------');
  console.log(HoliSpecialColors.YELLOW, title);
  console.log(HoliSpecialColors.GREEN, detail, '\n');
};

const logCgptSnapshotFileLocation = () =>
  printStepBanner(
    '1. snapshot backup ka base-data.json kaha rakhi huyi hai??',
    Constants.CGPT_SNAPSHOT_FILE_LOCATION,
  );

const logOutputRootDirectory = () =>
  printStepBanner('2. analysis base-directory kaha rakhi huyi hai??', outputRootDirectory);

const writeBaseProcessedJsonFile = () => {
  FileRelatedOperations.writeFileContentSync(
    baseProcessedJsonPath,
    JSON.stringify(JsonFileMapWithDetails),
  );
  printStepBanner('3. base.json kaha banayenge?', baseProcessedJsonPath);
};

/**
 * Merge conversations-*.json shards under a directory, write merged-conversations.json, return records.
 */
const mergeConversationShardFiles = directoryPath => {
  const mergedConversations = [];
  for (const fileName of fs.readdirSync(directoryPath)) {
    if (!fileName.startsWith('conversations-') || !fileName.endsWith('.json')) {
      continue;
    }
    const parsed = JSON.parse(
      fs.readFileSync(path.join(directoryPath, fileName), 'utf8'),
    );
    const records = Array.isArray(parsed) ? parsed : [parsed];
    mergedConversations.push(...records);
    console.warn('Loaded:', fileName);
  }
  fs.writeFileSync(
    path.join(directoryPath, 'merged-conversations.json'),
    JSON.stringify(mergedConversations, null, 2),
  );
  return mergedConversations;
};

/**
 * Load conversation records from a single JSON file or from a directory of shard files.
 */
const loadConversationRecords = async absolutePath => {
  const pathStats = await FileRelatedOperations.stat(absolutePath);
  if (!pathStats) {
    console.warn(`Path not found: ${absolutePath}`);
    return null;
  }
  if (pathStats.isFile()) {
    return FileRelatedOperations.readJsonFile(absolutePath);
  }
  if (pathStats.isDirectory()) {
    return mergeConversationShardFiles(absolutePath);
  }
  console.warn(`Unknown path type: ${absolutePath}`);
  return null;
};

const buildSnapshotOutputs = (conversationRecords, processedConversation) => {
  const messageContentsList = [];
  const conversationSummaries = [];
  const messagesWithoutContent = [];
  let totalMessageCount = 0;

  for (const conversation of conversationRecords) {
    const conversationId = conversation.id || conversation.conversation_id;
    const messages = getConversationMessages(conversation);

    conversationSummaries.push({
      id: conversationId,
      title: conversation.title,
      createdOn: conversation.create_time
        ? formatUnixTimestamp(conversation.create_time)
        : null,
      updatedOn: conversation.update_time
        ? formatUnixTimestamp(conversation.update_time)
        : null,
      msgCount: messages.length,
      messages: messages.filter(message => message.author === 'User').map(message => message.id),
    });

    messageContentsList.push(
      ...messages.map(message => ({
        id: message.id,
        content: message.content,
        convId: conversationId,
      })),
    );
    messagesWithoutContent.push(
      ...messages.map(message => ({
        ...message,
        content: undefined,
        convId: conversationId,
      })),
    );
    totalMessageCount += messages.length;
  }

  const snapshotSummary = {
    slug: processedConversation.slug,
    convCount: conversationRecords.length,
    totalMsgCount: totalMessageCount,
    userName: processedConversation.createdBy,
  };

  return {
    snapshotSummary,
    conversationSummaries,
    messageContentsList,
    messagesWithoutContent,
  };
};

const buildMessageContentsById = (messageContentsList, messagesWithoutContent) => {
  const metadataByMessageId = new Map(
    messagesWithoutContent.map(message => [message.id, message]),
  );
  return Object.fromEntries(
    messageContentsList.map(messageContent => [
      messageContent.id,
      { ...(metadataByMessageId.get(messageContent.id) || {}), ...messageContent },
    ]),
  );
};

const writeItr2OutputJson = (conversationSlug, outputFileName, serializableData) =>
  FileRelatedOperations.writeFileContentSync(
    path.join(getItr2OutputPath(conversationSlug), outputFileName),
    JSON.stringify(serializableData),
  );

const processSnapshots = async () => {
  await Promise.all(
    JsonFileMapWithDetails.map(async mapDetail => {
      try {
        const processedConversation = ProcessedConversation.fromData(mapDetail);
        const sourcePath = path.join(
          Constants.CgptProjectRoot,
          'public',
          processedConversation.location,
        );
        const conversationRecords = await loadConversationRecords(sourcePath);
        if (!conversationRecords) {
          return;
        }

        const {
          snapshotSummary,
          conversationSummaries,
          messageContentsList,
          messagesWithoutContent,
        } = buildSnapshotOutputs(conversationRecords, processedConversation);

        const conversationSlug = processedConversation.slug;

        await Promise.all([
          writeItr2OutputJson(conversationSlug, 'index.json', snapshotSummary),
          writeItr2OutputJson(conversationSlug, 'conversations.json', conversationSummaries),
          writeItr2OutputJson(conversationSlug, 'message.json', messagesWithoutContent),
          writeItr2OutputJson(conversationSlug, 'message.contents.json', messageContentsList),
        ]);

        await FileRelatedOperations.writeFileContentSync(
          path.join(getItr2OutputPath(conversationSlug), 'messageContentsMap.json'),
          JSON.stringify(buildMessageContentsById(messageContentsList, messagesWithoutContent)),
        );
      } catch (error) {
        console.error('Snapshot Error:', error);
      }
    }),
  );
};

const buildQuestionAnswerMapping = messages => {
  const answerIdsByUserMessageId = new Map();
  let activeUserMessageId = null;
  for (const message of messages) {
    if (message.isUserMessage) {
      activeUserMessageId = message.id;
      answerIdsByUserMessageId.set(activeUserMessageId, []);
    } else if (activeUserMessageId) {
      answerIdsByUserMessageId.get(activeUserMessageId).push(message.id);
    }
  }
  return Object.fromEntries(answerIdsByUserMessageId);
};

const buildQuestionAnswerFiles = async () => {
  try {
    const snapshotRows = await FileRelatedOperations.readJsonFile(baseProcessedJsonPath);
    await Promise.all(
      snapshotRows.map(async snapshotRow => {
        try {
          const outputDirectory = getItr2OutputPath(snapshotRow.slug);
          const [, messages] = await Promise.all([
            FileRelatedOperations.readJsonFile(path.join(outputDirectory, 'conversations.json')),
            FileRelatedOperations.readJsonFile(path.join(outputDirectory, 'message.json')),
          ]);
          FileRelatedOperations.writeFileContentSync(
            path.join(outputDirectory, 'qNa.json'),
            JSON.stringify(buildQuestionAnswerMapping(messages)),
          );
        } catch (error) {
          console.error(`QnA Map Error for slug ${snapshotRow.slug}:`, error);
        }
      }),
    );
  } catch (error) {
    console.error('Error preparing question answer map:', error);
  }
};

const MONTH_ABBREV_TO_INDEX = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const formatDate = dateString => {
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) {
    const [day, monthAbbrev, year] = dateString.split(' ')[0].split('-');
    return new Date(year, MONTH_ABBREV_TO_INDEX[monthAbbrev], day).toISOString().split('T')[0];
  }
  return parsedDate.toISOString().split('T')[0];
};

const buildSortedUserMessageIdsByDate = messages => {
  const userMessagesByDate = messages
    .filter(message => message.isUserMessage)
    .reduce((accumulator, message) => {
      const dateKey = formatDate(message.createdOn);
      if (!accumulator[dateKey]) {
        accumulator[dateKey] = [];
      }
      accumulator[dateKey].push({ id: message.id, createdOn: message.createdOn });
      return accumulator;
    }, {});

  for (const dateKey of Object.keys(userMessagesByDate)) {
    userMessagesByDate[dateKey].sort(
      (first, second) => new Date(first.createdOn) - new Date(second.createdOn),
    );
    userMessagesByDate[dateKey] = userMessagesByDate[dateKey].map(entry => entry.id);
  }
  return userMessagesByDate;
};

const buildDatewiseMessageFiles = async () => {
  try {
    const snapshotRows = await FileRelatedOperations.readJsonFile(baseProcessedJsonPath);
    await Promise.all(
      snapshotRows.map(async snapshotRow => {
        const outputDirectory = getItr2OutputPath(snapshotRow.slug);
        const messages = await FileRelatedOperations.readJsonFile(
          path.join(outputDirectory, 'message.json'),
        );
        const datewiseUserMessageIds = buildSortedUserMessageIdsByDate(messages);
        FileRelatedOperations.writeFileContentSync(
          path.join(outputDirectory, 'datewiseMessages.json'),
          JSON.stringify(datewiseUserMessageIds),
        );
      }),
    );
    console.log('✅ All snapshots processed successfully!');
  } catch (error) {
    console.error('❌ Error preparing datewise messages:', error);
  }
};

const runPipeline = async () => {
  const startedAt = performance.now();
  logCgptSnapshotFileLocation();
  logOutputRootDirectory();
  writeBaseProcessedJsonFile();
  await processSnapshots();
  await buildQuestionAnswerFiles();
  await buildDatewiseMessageFiles();
  console.log(HoliSpecialColors.CYAN, 'All tasks completed successfully!');
  console.log(`Time taken: ${performance.now() - startedAt} ms`);
};

runPipeline();
