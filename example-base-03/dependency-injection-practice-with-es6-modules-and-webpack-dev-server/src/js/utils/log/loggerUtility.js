import { applyStyles, getStylesForType } from './styles.js';
import { validConfig, registerLoggingConfig } from './validation.js';

const LoggerUtility = () => {
    let registeredElement = null;

    const createMessageSpan = (type = '', logMessage = '') => {
        const span = document.createElement('span');
        applyStyles(span, getStylesForType(type));
        span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: ${logMessage}`;
        return span;
    };

    const appendInnerHtmlToElement = (message, logLevel = 'info') => {
        if (!validConfig(registeredElement)) {
            return;
        }
        const messageSpan = createMessageSpan(logLevel, message);
        registeredElement.appendChild(messageSpan);
    };

    const resetInnerHtmlToElement = () => {
        if (!validConfig(registeredElement)) {
            return;
        }
        registeredElement.innerHTML = `<b>Logs to be displayed:-</b>`;
    };

    const logToConsole = (message, logLevel = 'info') => {
        if (logLevel && message) {
            
            const logFunction = console[logLevel] || console.log;
            logFunction(`[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`);
        }
    };

    const log = (logLevel = 'info', ...message) => {
        const validLogLevels = ['info', 'warn', 'success', 'error', 'debug', 'trace', 'reset'];
        if (!validLogLevels.includes(logLevel.trim().toLowerCase())) {
            console.log(`Invalid/Unknown Log Level: '${logLevel}'. Unable to log message.`);
            return;
        } else if (!message) {
            console.log(`Invalid Message: '${message}'. Unable to log message.`);
            return;
        }
        
        if(logLevel==='reset'){
            console.clear();
            resetInnerHtmlToElement();
            return;
        }

        logToConsole(message, logLevel);
        appendInnerHtmlToElement(message, logLevel);
        
    };

    const info = (...message) => log('info', message);
    const warning = (...message) => log('warn', message);
    const success = (...message) => log('success', message);
    const error = (...message) => log('error', message);
    const trace = (...message) => log('trace', message);
    const debug = (...message) => log('debug', message);
    // const reset = () => resetInnerHtmlToElement();
    const reset = ()=> log('reset', ['Console is about to cleaned up']);


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

    // Public interface
    return {
        registerLoggingConfig,
        info,
        warning,
        success,
        error,
        trace,
        debug,
        reset
    };
};

const loggerUtility = LoggerUtility();
export default loggerUtility;
