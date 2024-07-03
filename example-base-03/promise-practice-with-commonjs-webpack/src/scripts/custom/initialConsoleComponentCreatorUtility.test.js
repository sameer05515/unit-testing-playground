// main.js (or any other module where you want to use createInitialComponents)

// Require the module where createInitialComponents is defined
const { createInitialComponents } = require('../../modules/v1/initialConsoleComponentCreatorUtility');
const LOGGER = require('../../modules/v1/loggerUtility');

// Define success and fail callbacks
const successCallback = (containerId) => {
    LOGGER.info(`Initialization succeeded! Container div id: ${containerId}`);
    // Additional logic after successful initialization
};

const failCallback = (error) => {
    LOGGER.error(`Initialization failed: ${error}`);
    // Additional error handling logic
};

// Define an optional restart button click handler
const restartButtonOnClick = () => {
    LOGGER.info('Restart button clicked!');
    // Additional logic for restart button click
};

// Call createInitialComponents with necessary arguments
createInitialComponents(successCallback, failCallback, true, restartButtonOnClick);
