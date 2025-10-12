const path = require("path");
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

// Core Snapshot Processor (parallelized)
const processSnapshots = async () => {
  await Promise.all(
    JsonFileMapWithDetails.map(async (det) => {
      try {
        const pp = ProcessedConversation.fromData(det);

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
        await Promise.all([
          FileRelatedOperations.writeFileContentSync(`${outDir}\\index.json`, JSON.stringify(snapshotObject)),
          FileRelatedOperations.writeFileContentSync(`${outDir}\\conversations.json`, JSON.stringify(conversations)),
          FileRelatedOperations.writeFileContentSync(`${outDir}\\message.json`, JSON.stringify(messagesWdoutContent)),
          FileRelatedOperations.writeFileContentSync(`${outDir}\\message.contents.json`, JSON.stringify(msgContents)),
        ]);

        // Build messageContentsMap in one pass
        const messageContentsMap = msgContents.reduce((acc, mc) => {
          const meta = messagesWdoutContent.find((msg) => msg.id === mc.id);
          acc[mc.id] = { ...meta, ...mc };
          return acc;
        }, {});

        await FileRelatedOperations.writeFileContentSync(
          `${outDir}\\messageContentsMap.json`,
          JSON.stringify(messageContentsMap)
        );
      } catch (error) {
        console.error("Snapshot Error:", error);
      }
    })
  );
};

// Prepare question-answer map (parallelized)
const prepareQAMap = async () => {
  try {
    const snapshotData = await FileRelatedOperations.readJsonFile(baseProcessedJsonPath);

    await Promise.all(
      snapshotData.map(async (snapshot) => {
        try {
          const outDir = `${testDir}\\itr2\\${snapshot.slug}`;
          const [conv, messages] = await Promise.all([
            FileRelatedOperations.readJsonFile(`${outDir}\\conversations.json`),
            FileRelatedOperations.readJsonFile(`${outDir}\\message.json`),
          ]);

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

          const qnAMapObj = Object.fromEntries(qnAMap);

          FileRelatedOperations.writeFileContentSync(`${outDir}\\qNa.json`, JSON.stringify(qnAMapObj));
        } catch (err) {
          console.error(`QnA Map Error for slug ${snapshot.slug}:`, err);
        }
      })
    );
  } catch (error) {
    console.error("Error preparing question answer map:", error);
  }
};

// ✅ Convert "22-Apr-2024 06:39:43" → "2024-04-22"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    const [day, mon, year] = dateString.split(" ")[0].split("-");
    const months = {
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
    return new Date(year, months[mon], day).toISOString().split("T")[0];
  }
  return date.toISOString().split("T")[0];
};

const prepareDatewiseMessages = async () => {
  try {
    const snapshotData = await FileRelatedOperations.readJsonFile(baseProcessedJsonPath);

    // ✅ Run all snapshots concurrently
    await Promise.all(
      snapshotData.map(async (snapshot) => {
        const outDir = path.join(testDir, "itr2", snapshot.slug);
        const messages = await FileRelatedOperations.readJsonFile(path.join(outDir, "message.json"));

        const datewiseMessages = messages.filter((msg) => msg.isUserMessage).reduce((acc, msg) => {
          const date = formatDate(msg.createdOn);
          acc[date] = acc[date] || [];
          acc[date].push(msg.id);
          return acc;
        }, {});

        // ✅ Sort messages by timestamp within each date
        Object.keys(datewiseMessages).forEach((date) => {
          datewiseMessages[date].sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
        });

        FileRelatedOperations.writeFileContentSync(
          path.join(outDir, "datewiseMessages.json"),
          JSON.stringify(datewiseMessages)
        );
      })
    );

    console.log("✅ All snapshots processed successfully!");
  } catch (error) {
    console.error("❌ Error preparing datewise messages:", error);
  }
};

// Bootstrap
const bootstrap = async () => {
  const start = performance.now();

  step0();
  step1();
  step2();
  await processSnapshots();
  await prepareQAMap();
  await prepareDatewiseMessages();
  console.log(HoliSpecialColors.CYAN, "All tasks completed successfully!");

  const end = performance.now();
  console.log(`Time taken: ${end - start} ms`);
};

bootstrap();
