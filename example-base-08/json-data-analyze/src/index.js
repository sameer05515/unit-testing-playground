import JsonFileMapWithDetails from "./JsonFileMap.js";
import fs from "fs";
import path from "path";
import { prepareErrorMessage } from "./message-preparation-utils-v2.js";

/**
 * Ensures a directory exists; creates it if not.
 * @param {string} dirPath - The directory path to check or create.
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

console.log("JsonFileMapWithDetails: ", JsonFileMapWithDetails);

const outputFilePath = "D:\\GIT\\unit-testing-playground\\example-base-08\\json-data-analyze\\data";
const publicPath = "D:\\GIT\\microservices-playground\\example-base-03\\fontend\\chat-gpt-conversation";

fs.writeFileSync(`${outputFilePath}\\step-1.json`, JSON.stringify(JsonFileMapWithDetails, null, 2));

// Utility to fetch and parse JSON data
const getRawFileData = async (selectedFileLocation) => {
  try {
    if (!selectedFileLocation || typeof selectedFileLocation !== "string") {
      throw new Error("File name is null, undefined, or not a string");
    }
    const response = await fetch(selectedFileLocation);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    const errorMessage = prepareErrorMessage(error, "An unexpected error occurred during data fetching");
    console.error(`Error fetching data: ${errorMessage}`, error);
    throw new Error(errorMessage);
  }
};


// getRawFileData(`${}`)