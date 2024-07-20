// loggerUtility.js

let registeredElement = null;

const validConfig = () => {
    if (registeredElement) {
        return true;
    } else {
        console.warn(
            "No valid appender found. Logging utility is not initialized properly. Only console logs will be shown ."
        );
        return false;
    }
};

const registerLoggingConfig = (element, elementId) => {
    if (element) {
        registeredElement = element;
    } else if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            registeredElement = el;
        }
    }
};

// === creating spans for appropriate log level ==============

const getStylesForType = (type = 'container') => {
    const baseStyle = {
        color: 'black',
        //padding: '5px',
        margin: '3px',
        borderRadius: '3px',
        whiteSpace: "pre-wrap",
        display: 'block'
    };

    switch (type) {
        case 'error':
        case 'trace':
        case 'debug':
            return {
                ...baseStyle, color: 'red',
            };
        case 'warn':
            return {
                ...baseStyle, color: 'black',
                backgroundColor: 'yellow',
            };
        case 'info':
            return {
                ...baseStyle, color: 'blue',
            };
        case 'success':
            return {
                ...baseStyle, color: 'green',
            };
        default:
            return {
                ...baseStyle,
            };
    }
};

const applyStyles = (element, styles) => {
    if (!element || !styles) {
        return;
    }
    for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
            element.style[property] = styles[property];
        }
    }
};

const createMessageSpan = (type = '', logMessage = '') => {
    const span = document.createElement('span');
    applyStyles(span, getStylesForType(type));
    // span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${text.timestamp}]: ${text.logMessage}`;
    // span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: <pre>${logMessage}</pre>`;
    span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: ${logMessage}`;
    return span;
};

// ==== Appending to div
const appendInnerHtmlToElement = (message, logLevel = "info") => {
    if (!validConfig()) {
        return;
    }
    // registeredElement.innerHTML += some;
    const messageSpan = createMessageSpan(logLevel, message);
    registeredElement.appendChild(messageSpan);
};

const resetInnerHtmlToElement = () => {
    if (!validConfig()) {
        return;
    }
    registeredElement.innerHTML = `<b>Logs to be displayed:-</b>`;
};

const reset = () => {
    resetInnerHtmlToElement();
};

const logToConsole = (message, logLevel = 'info') => {
    if (logLevel && message) {
        switch (logLevel) {
            case "info":
                console.info(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
            case "warn":
                console.warn(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
            case "success":
                console.info(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
            case "error":
                console.error(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
            case "debug":
                console.debug(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
            case "trace":
                console.trace(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
            default:
                console.warn(`Invalid/Unknown Log Level: '${logLevel}'.`)
                console.log(
                    `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                );
                break;
        }
    }
};

const log = (logLevel = "info", ...message) => {
    if (
        !logLevel ||
        !["info", "warn", "success", "error", "debug", "trace"].includes(
            logLevel.trim().toLowerCase()
        )
    ) {
        console.log(
            `Invalid/Unknown Log Level: '${logLevel}'. Unable to log message.`
        );
        return;
    } else if (!message) {
        console.log(`Invalid Message: '${message}'. Unable to log message.`);
        return;
    }

    logToConsole(message, logLevel);

    appendInnerHtmlToElement(message, logLevel);
};

const info = (...message) => log("info", message);
const warning = (...message) => log("warn", message);
const success = (...message) => log("success", message);
const error = (...message) => log("error", message);
const trace = (...message) => log("trace", message);
const debug = (...message) => log("debug", message);

module.exports = {
    registerLoggingConfig,
    info,
    warning,
    success,
    error,
    trace,
    debug,
    reset,
};
