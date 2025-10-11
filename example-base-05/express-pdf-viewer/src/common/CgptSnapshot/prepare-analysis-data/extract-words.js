const FileRelatedOperations = require("../../FileRelatedOperations.services.v2");

const extractWordsFromText = (text) => {
  if (!text) return [];
  return text.match(/\b\w+\b/g) || [];
};
const extractWordsFromSnapshots = async (snapshotPath) => {
  const data = await FileRelatedOperations.readJsonFile(snapshotPath);
  const allWords = new Set();
  data.forEach((item) => {
    const words = extractWordsFromText(item.content);
    words.forEach((word) => allWords.add(word));
  });
  return Array.from(allWords);
};

extractWordsFromSnapshots("D:\\v-dir\\itr2\\v1\\message.contents.json").then(async (words) => {
  //   console.log("Extracted Words:", words);

  const res = await fetch("http://localhost:3030/api/words/multiple", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ words: words }),
  });
  const responseWords = await res.json();
  console.log("Response from server:", responseWords.length);
});
// module.exports = { extractWordsFromText, extractWordsFromSnapshots };
