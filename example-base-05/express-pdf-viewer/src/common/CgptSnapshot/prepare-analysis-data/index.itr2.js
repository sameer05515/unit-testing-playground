const FileRelatedOperations = require("../../FileRelatedOperations.services.v2");
const { JsonFileMapWithDetails } = require("../services");
const Contants = require("../../constants");
const ProcessedConversation = require("../ProcessedConversation");
const { holiSpecialLog, HoliSpecialColors } = require("./holiSpecialLog");
const getConversationMessages = require("./getConversationMessages");
const formatUnixTimestamp = require("./formatUnixTimestamp");

// Constants & Helpers
const testDir = "D:\\v-dir";
const baseProcessedJsonPath = `${testDir}\\base.json`;
const getIterationFolderName = (iterationName = "") => `${testDir}\\${iterationName}`;

const printStepLog = (title = "", stepOutput = "") => {
  console.log("-------------------------------------");
  console.log(HoliSpecialColors.YELLOW, title);
  console.log(HoliSpecialColors.GREEN, stepOutput, "\n");
};

// Logging Steps
const step0 = () =>
  printStepLog("1. snapshot backup ka base-data.json kaha rakhi huyi hai??", Contants.CGPT_SNAPSHOT_FILE_LOCATION);

const step1 = () => printStepLog("2. analysis base-directory kaha rakhi huyi hai??", testDir);

const step2 = () => {
  FileRelatedOperations.writeFileContentSync(baseProcessedJsonPath, JSON.stringify(JsonFileMapWithDetails));
  printStepLog("3. base.json kaha banayenge?", baseProcessedJsonPath);
};

// Core Snapshot Processor
const processSnapshots = async () => {
  for (let det of JsonFileMapWithDetails) {
    try {
      const pp = ProcessedConversation.fromData(det);
      // if (pp?.createdBy !== "PREMENDRA") continue;

      const data = await FileRelatedOperations.readJsonFile(`${Contants.CgptProjectRoot}/public/${pp.location}`);

      const snapshotObject = {
        slug: pp.slug,
        convCount: data.length,
        totalMsgCount: 0,
        userName: pp.createdBy,
      };

      let totalMsgCount = 0;
      const msgContents = [];
      const conversations = [];
      const messagesWdoutContent = [];

      for (let conversation of data) {
        const convId = conversation.id || conversation.conversation_id;
        const messages = getConversationMessages(conversation);

        conversations.push({
          id: convId,
          title: conversation.title,
          createdOn: conversation.create_time ? formatUnixTimestamp(conversation.create_time) : null,
          updatedOn: conversation.update_time ? formatUnixTimestamp(conversation.update_time) : null,
          msgCount: messages.length,
          messages: messages.filter((m) => m.author === "User").map((m) => m.id),
        });

        msgContents.push(...messages.map((m) => ({ id: m.id, content: m.content, convId })));

        messagesWdoutContent.push(...messages.map((m) => ({ ...m, content: undefined, convId })));

        totalMsgCount += messages.length;
      }

      snapshotObject.totalMsgCount = totalMsgCount;

      const outDir = `${testDir}\\itr2\\${pp.slug}`;
      FileRelatedOperations.writeFileContentSync(`${outDir}\\index.json`, JSON.stringify(snapshotObject));
      FileRelatedOperations.writeFileContentSync(`${outDir}\\conversations.json`, JSON.stringify(conversations));
      FileRelatedOperations.writeFileContentSync(`${outDir}\\message.json`, JSON.stringify(messagesWdoutContent));
      FileRelatedOperations.writeFileContentSync(`${outDir}\\message.contents.json`, JSON.stringify(msgContents));

      const messageContentsMap = {};
      msgContents.forEach((mc) => {
      messageContentsMap[mc.id] = { ...mc, ...messagesWdoutContent.find((msg) => msg.id === mc.id) };

      FileRelatedOperations.writeFileContentSync(`${outDir}\\messageContentsMap.json`, JSON.stringify(messageContentsMap));
    });

    } catch (error) {
      console.error("Snapshot Error:", error);
    }
  }
};

// prepare question answer map
const prepareQAMap = async () => {
  try {
    const snapshotData = await FileRelatedOperations.readJsonFile(baseProcessedJsonPath);
    // console.log("prepare question answer map: ",data);
    for (let snapshot of snapshotData) {
      // console.log("slug: "+pp.slug);
      const outDir = `${testDir}\\itr2\\${snapshot.slug}`;
      const conv = await FileRelatedOperations.readJsonFile(`${outDir}\\conversations.json`);
      const messages = await FileRelatedOperations.readJsonFile(`${outDir}\\message.json`);
      // const userMessages=[];
      // for(let c of conv){
      //   userMessages.push(...c.messages)
      // }

      // Build the map
      const qnAMap = new Map();
      let currentUserMessage = null;

      for (const msg of messages) {
        if (msg.isUserMessage) {
          currentUserMessage = msg.id;
          qnAMap.set(currentUserMessage, []);
        } else if (currentUserMessage) {
          qnAMap.get(currentUserMessage).push(msg.id);
        }
      }

      // Convert Map to a plain object
      const qnAMapObj = Object.fromEntries(qnAMap);

      FileRelatedOperations.writeFileContentSync(`${outDir}\\qNa.json`, JSON.stringify(qnAMapObj));

      // console.log(userMessages);
    }
  } catch (error) {
    console.error("Error preparing question answer map :", error);
  }
};

// Bootstrap
const bootstrap = async () => {
  step0();
  step1();
  step2();
  await processSnapshots();
  await prepareQAMap();
};

bootstrap();
