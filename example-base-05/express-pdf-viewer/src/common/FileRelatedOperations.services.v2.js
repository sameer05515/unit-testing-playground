const fs = require("fs");
const path = require("path");

const prepareErrorMessage = require("./prepareErrorMessage");

class FileRelatedOperations {
  static getFileExtension(filePath) {
    return path.extname(filePath).slice(1).toLowerCase() || "text";
  }

  static fileExists(filePath) {
    try {
      return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    } catch (error) {
      return false;
    }
  }

  static ensureDirectoryExists(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error creating directory"));
    }
  }

  static ensureFileExists(filePath, defaultContent = "") {
    try {
      if (!this.fileExists(filePath)) {
        this.ensureDirectoryExists(path.dirname(filePath));
        fs.writeFileSync(filePath, defaultContent, "utf8");
      }
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error creating file"));
    }
  }

  static readFileContentSync(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      return fs.readFileSync(filePath, "utf8");
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error reading file"));
    }
  }

  static readJsonFileSync(filePath) {
    try {
      if (this.getFileExtension(filePath) !== "json") {
        throw new Error(`Invalid JSON file: ${filePath}`);
      }
      const content = this.readFileContentSync(filePath);
      return JSON.parse(content);
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error reading JSON file"));
    }
  }

  static async readFileContent(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      return await fs.promises.readFile(filePath, "utf8");
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error reading file"));
    }
  }

  static async readJsonFile(filePath) {
    try {
      if (this.getFileExtension(filePath) !== "json") {
        throw new Error(`Invalid JSON file: ${filePath}`);
      }
      const content = await this.readFileContent(filePath);
      return JSON.parse(content);
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error reading JSON file"));
    }
  }

  static writeFileContentSync(filePath, data = "") {
    try {
      this.ensureFileExists(filePath);
      fs.writeFileSync(filePath, data, "utf8");
    } catch (error) {
      console.error("❌ Error:", error);
    }
  }

  static readDirectory(dir, options = { withFileTypes: true }) {
    try {
      if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        throw new Error(`Invalid directory: ${dir}`);
      }
      return fs.readdirSync(dir, options);
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error reading directory"));
    }
  }

  static getFileStats(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new Error(`File does not exist: ${filePath}`);
      }
      return fs.statSync(filePath);
    } catch (error) {
      throw new Error(prepareErrorMessage(error, "Error getting file stats"));
    }
  }
}

module.exports = FileRelatedOperations;
