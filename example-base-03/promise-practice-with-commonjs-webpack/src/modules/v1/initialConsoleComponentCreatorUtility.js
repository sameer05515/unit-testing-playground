// initialConsoleComponentCreatorUtility.js

// Import dependencies
const  LOGGER  = require('./loggerUtility'); // Adjust the path as needed
const { styles: cssStyles } = require('./cssStylesUtility'); // Adjust the path as needed
const { addElementWithPromise } = require('./elementAdderUtility'); // Adjust the path as needed

// Define initial components
const components = [
    {
        elementType: "div",
        addToBody: true,
        style: cssStyles.div,
        name: "Container div"
    },
    {
        elementType: "button",
        addToBody: true,
        style: cssStyles.div, // This seems incorrect, it should be cssStyles.button
        innerText: "Restart",
        onClick: () => { },
        name: "Button to be added in container div"
    },
    {
        elementType: "div",
        addToBody: true,
        style: cssStyles.div,
        name: "Message logger div"
    }
];

// Main function to create initial components
async function createInitialComponents(successCallback = () => { }, failCallback = () => { }, addButton = false, restartButtonOnClick = () => { }) {
    let myContainerDivId = null;
    let componentsCreatedSuccessfully = false;

    // Adding restart button if required
    if (addButton) {
        try {
            const createdElement = await addElementWithPromise({
                elementType: "button",
                addToBody: true,
                innerText: "Restart",
                onClick: restartButtonOnClick,
                showInnerText: true
            });
            LOGGER.info(`${createdElement.tagName} is created successfully with id: '${createdElement.id}'!`);
        } catch (error) {
            LOGGER.error(`Error: ${error.message}`);
        }
    }

    // Adding initial div
    try {
        const newlyAddedDiv = await addElementWithPromise({
            elementType: "div",
            addToBody: true,
            style: cssStyles.div,
        });
        LOGGER.success(`[Success]: Created div: ${newlyAddedDiv.id}`);
        myContainerDivId = newlyAddedDiv.id;
        LOGGER.registerLoggingConfig(newlyAddedDiv);

        componentsCreatedSuccessfully = true;
    } catch (error) {
        LOGGER.error(`[Warning]: Error occurred: ${error}`);
        LOGGER.error(`[${new Date()}]: Stopping element creation due to error.`);
    }

    // Handling success or failure callbacks
    if (componentsCreatedSuccessfully) {
        LOGGER.info(`All initial components created successfully!`);
        successCallback(myContainerDivId);
    } else {
        LOGGER.error(`Stopping as error occurred in initial components creation.`);
        failCallback(`Stopping as error occurred in initial components creation.`);
    }
}

// Exporting the function
module.exports = { createInitialComponents };
