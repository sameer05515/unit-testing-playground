const FileRelatedOperations = require("../../FileRelatedOperations.services.v2");
const { JsonFileMapWithDetails } = require("../services");
const Contants = require("../../constants");
const ProcessedConversation = require("../ProcessedConversation");
const { holiSpecialLog, HoliSpecialColors } = require("./holiSpecialLog");
const getConversationMessages = require("./getConversationMessages");
const formatUnixTimestamp = require("./formatUnixTimestamp");

const testDir = "D:\\v-dir";
const baseProcessedJsonPath = `${testDir}\\base.json`;
const getIterationFolderName = (iterationName = "") => `${testDir}\\${iterationName}`;

const printStepLog = (title = "", stepOutput = "") => {
  console.log("-------------------------------------");
  console.log(HoliSpecialColors.YELLOW, title);
  console.log(HoliSpecialColors.GREEN, stepOutput, "\n");
};

const step0 = () => {
  printStepLog("1. snapshot backup ka base-data.json kaha rakhi huyi hai??", Contants.CGPT_SNAPSHOT_FILE_LOCATION);
};

const step1 = () => {
  printStepLog("2. analysis base-directory kaha rakhi huyi hai??", testDir);
};

const step2 = () => {
  FileRelatedOperations.writeFileContentSync(baseProcessedJsonPath, JSON.stringify(JsonFileMapWithDetails));
  printStepLog("3. base.json kaha banayenge?", baseProcessedJsonPath);
};

const step111 = async () => {
  // const arr = [];
  for (let det of JsonFileMapWithDetails) {
    try {
      const pp = ProcessedConversation.fromData(det);
      if (pp?.createdBy !== "PREMENDRA") {
        continue;
      }
      const data = await FileRelatedOperations.readJsonFile(`${Contants.CgptProjectRoot}/public/${pp.location}`);
      let totalMsgCount = 0;

      const snapshotObject = {
        slug: pp.slug,
        convCount: data.length,
        totalMsgCount: 0,
        conversations: [],
        userName: pp.createdBy,
        messages: [],
      };

      const msgContents = [];
      for (let conversation of data) {
        const convObj = {
          id: conversation.id || conversation.conversation_id,
          title: conversation.title,
          createdOn: conversation.create_time ? formatUnixTimestamp(conversation.create_time) : null,
          updatedOn: conversation.update_time ? formatUnixTimestamp(conversation.update_time) : null,
          messages: [],
        };
        snapshotObject.conversations.push(convObj);
        const messages = getConversationMessages(conversation);
        convObj.msgCount = messages.length || 0;
        convObj.messages.push(...messages.filter((m) => m.author === "User").map((m) => m.id));
        snapshotObject.messages.push(
          ...messages.map((m) => ({
            ...m,
            content: undefined,
            convId: convObj.id,
            // msgCount: messages.length || 0,
          }))
        );
        msgContents.push(
          ...messages.map((m) => ({
            id: m.id,
            content: m.content,
            convId: convObj.id,
          }))
        );
        totalMsgCount += messages.length;
      }
      // res.json(data.length);
      // console.log({ slug: pp.slug, convCount: data.length, msgCount, userName: pp.createdBy });
      // const snapshotObject = { slug: pp.slug, convCount: data.length, msgCount, userName: pp.createdBy };
      snapshotObject.totalMsgCount = totalMsgCount;
      FileRelatedOperations.writeFileContentSync(`${testDir}\\itr1\\${pp.slug}.json`, JSON.stringify(snapshotObject));
      FileRelatedOperations.writeFileContentSync(
        `${testDir}\\itr1\\${pp.slug}.contents.json`,
        JSON.stringify(msgContents)
      );
      // arr.push(snapshotObject);
    } catch (error) {
      // res.status(500).json({ error: prepareErrorMessage(error) });
      console.error(error);
    }
  }
  // console.log(arr);
};

const bootstrap = async () => {
  step0();
  step1();
  step2();

  step111();

  // console.log(arr);
  // holiSpecialLog();
};

bootstrap();
