const fs = require("fs");
const path = require("path");

const prepareErrorMessage = require("./prepareErrorMessage");

class FileRelatedOperations {
  static getFileExtension(filePath) {
    return path.extname(filePath).substring(1) || "text";
  }

  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  static readFileContent(filePath) {
    return fs.promises.readFile(filePath, "utf8");
  }

  static async readJsonFile(filePath) {
    try {
      if (!FileRelatedOperations.fileExists(filePath)) {
        throw new Error("File not found: " + filePath);
      }
      if (FileRelatedOperations.getFileExtension(filePath) !== "json") {
        throw new Error("Not a json file: " + filePath);
      }
      const content = await FileRelatedOperations.readFileContent(filePath);
      return JSON.parse(content);
    } catch (error) {
      const errMessage = prepareErrorMessage(error, "Error reading json file");
      console.error(errMessage);
      throw new Error(errMessage);
    }
  }

  static readDirectory(dir, options) {
    return fs.readdirSync(dir, options);
  }

  static getFileStats(filePath) {
    return fs.statSync(filePath);
  }
}

module.exports = FileRelatedOperations;
