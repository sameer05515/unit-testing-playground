import { applyStyles, getStylesForType } from './styles';
import { validConfig } from './validation';
import $ from "jquery";

type LogLevel = 'info' | 'warn' | 'success' | 'error' | 'debug' | 'trace' | 'reset';
type StyleType = 'info' | 'warn' | 'success' | 'error' | 'debug' | 'trace'; // Exclude 'reset'

const LoggerUtility = () => {
    let registeredElement: HTMLElement | null = null;

    const createMessageSpan = (type: StyleType, logMessage: string = ''): HTMLSpanElement => {
        const span = document.createElement('span');
        applyStyles(span, getStylesForType(type));
        span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: ${logMessage}`;
        return span;
    };

    const appendInnerHtmlToElement = (message: string[], logLevel: StyleType): void => {
        if (!validConfig(registeredElement)) {
            return;
        }
        const messageSpan = createMessageSpan(logLevel, message.join(' '));
        registeredElement?.appendChild(messageSpan);
    };

    const resetInnerHtmlToElement = (): void => {
        if (!validConfig(registeredElement)) {
            return;
        }
        registeredElement!.innerHTML = `<b>Logs to be displayed:-</b>`;
    };

    const logToConsole = (message: string[], logLevel: LogLevel = 'info'): void => {
        if (logLevel && message.length > 0) {
            const logFunction = logLevel === 'error' ? console.error :
                               logLevel === 'warn' ? console.warn :
                               logLevel === 'debug' ? console.debug :
                               console.log; // Default to console.log

            logFunction(`[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message.join(' ')}`);
        }
    };

    const log = (logLevel: LogLevel = 'info', ...messages: string[]): void => {
        const validLogLevels: LogLevel[] = ['info', 'warn', 'success', 'error', 'debug', 'trace', 'reset'];

        if (!validLogLevels.includes(logLevel.trim().toLowerCase() as LogLevel)) {
            console.log(`Invalid/Unknown Log Level: '${logLevel}'. Unable to log message.`);
            return;
        } else if (messages.length === 0) {
            console.log(`Invalid Message: '${messages}'. Unable to log message.`);
            return;
        }

        if (logLevel === 'reset') {
            console.clear();
            resetInnerHtmlToElement();
            return;
        }

        logToConsole(messages, logLevel);
        appendInnerHtmlToElement(messages, logLevel as StyleType); // Cast to StyleType
    };

    const info = (...messages: string[]) => log('info', ...messages);
    const warning = (...messages: string[]) => log('warn', ...messages);
    const success = (...messages: string[]) => log('success', ...messages);
    const error = (...messages: string[]) => log('error', ...messages);
    const trace = (...messages: string[]) => log('trace', ...messages);
    const debug = (...messages: string[]) => log('debug', ...messages);
    const reset = () => log('reset', 'Console is about to be cleaned up');

    const registerLoggingConfig = (element: HTMLElement | null, elementId?: string): void => {
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
