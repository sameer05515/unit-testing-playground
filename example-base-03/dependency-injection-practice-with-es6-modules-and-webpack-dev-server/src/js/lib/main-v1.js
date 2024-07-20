// main.js
import DIContainer from "../lessons/dependency-injection/DIContainer.js";
import Logger from "../lessons/dependency-injection/Logger.js";
import UserService from "../lessons/dependency-injection/UserService.js";
import LOGGER from "../utils/log/loggerUtility.js";
import { initialConsoleComponentCreatorUtility } from "../utils/initial-console-component/initialConsoleComponentCreatorUtility.js";

// Create DI container
const container = new DIContainer();

// Register dependencies
container.register("logger", new Logger());
container.register("userService", new UserService(container.get("logger")));

// Resolve dependencies
const userService = container.get("userService");
const user = userService.getUser();
// console.log(user);

//=========================================


const logMessage = () => {
    // LOGGER.registerLoggingConfig(logElementDiv);

    LOGGER.info("This is an info message");
    LOGGER.warning("This is a warning message");
    LOGGER.success("This is a success message");
    LOGGER.error("This is an error message");
    LOGGER.trace("This is a trace message");
    LOGGER.debug("This is a debug message");
    LOGGER.success(JSON.stringify(user));
}

// ======================================

initialConsoleComponentCreatorUtility.createInitialComponents(
    (myContainerDivId) => {
        console.log(`[Success]: myContainerDivId: ${myContainerDivId}`);
        LOGGER.registerLoggingConfig(null, myContainerDivId);
    },
    (errorMessage) => console.log(`[Fail]: ${errorMessage}`),
    true,
    logMessage
);
