import LOGGER from '../log/loggerUtility.js';
import cssStylesUtility from '../global/cssStylesUtility.js'
import elementAdderUtility from '../element-add/elementAdderUtility.js'; 

export const initialConsoleComponentCreatorUtility = (() => {
    const {styles}= cssStylesUtility;
    const {addElementWithPromise} = elementAdderUtility;
    const components = [
        {
            elementType: 'div',
            addToBody: true,
            style: styles.div,
            name: 'Container div',
        },
        {
            elementType: 'button',
            addToBody: true,
            style: styles.div,
            innerText: 'Restart',
            onClick: () => {},
            name: 'button to be added in container div',
        },
        {
            elementType: 'div',
            addToBody: true,
            style: styles.div,
            name: 'message logger div',
        },
    ];

    const createInitialComponents = async (
        successCallback = () => {},
        failCallback = () => {},
        addButton = false,
        restartButtonOnClick = () => {}
    ) => {
        let myContainerDivId = null;
        let componentsCreatedSuccesfully = false;

        if (addButton && addButton === true) {
            addElementWithPromise({
                elementType: 'button',
                addToBody: true,
                innerText: 'Restart',
                onClick: restartButtonOnClick,
            }).then(
                (createdElement) => {
                    LOGGER.info(
                        `${createdElement.tagName} is created successfully with id:'${createdElement.id}'!`
                    );
                },
                (error) => LOGGER.error(`Error: ${error.message}`)
            );
        }

        try {
            const newlyAddedDiv = await addElementWithPromise({
                elementType: 'div',
                addToBody: true,
                style: {...styles.div, overflowY:'auto', width: "500px", height: "100px"},
            });
            LOGGER.success(`[Success]: Created div: ${newlyAddedDiv.id}`);
            myContainerDivId = newlyAddedDiv.id;
            LOGGER.registerLoggingConfig(newlyAddedDiv);

            LOGGER.reset();
            LOGGER.success(`Created div: ${myContainerDivId}`);

            componentsCreatedSuccesfully = true;
        } catch (error) {
            LOGGER.error(`[Warning]: Error occured: ${error}`);
            LOGGER.error(`[${new Date()}]: Stopping element creation due to error.`);
        }

        if (componentsCreatedSuccesfully) {
            LOGGER.info(`All initial components created successfully!`);
            successCallback(myContainerDivId);
        } else {
            LOGGER.error(`Stopping as error occurred in initial components creation.`);
            failCallback(`Stopping as error occurred in initial components creation.`);
        }
    };

    return { createInitialComponents };
})();
