import { initialConsoleComponentCreatorUtility } from "../utils/initial-console-component/initialConsoleComponentCreatorUtility.js";
import LOGGER from "../utils/log/loggerUtility.js";





const createConsoleAndRegisterMyId = (successHandler = () => { }, failHandler = () => { }, restartHandler = () => { }) => {
    initialConsoleComponentCreatorUtility.createInitialComponents(
        (myContainerDivId) => {
            LOGGER.registerLoggingConfig(null, myContainerDivId);
            LOGGER.success(`[Success]: myContainerDivId: ${myContainerDivId}`);
            LOGGER.info(
                "I am from v2.1. We will learn javascript dependency-injection in this version"
            );
            successHandler({ consoleDivId: myContainerDivId, LOGGER });
        },
        (errorMessage) => {
            console.log(`[Fail]: ${errorMessage}`);
            failHandler(errorMessage);
        },
        true,
        () => {
            LOGGER.info('I am clicked. Will do restart work')
            restartHandler(LOGGER);
        }
    );
};

export { createConsoleAndRegisterMyId }