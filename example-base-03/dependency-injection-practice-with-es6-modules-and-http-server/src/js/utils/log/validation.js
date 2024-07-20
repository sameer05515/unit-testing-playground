export const validConfig = (registeredElement) => {
    if (registeredElement) {
        return true;
    } else {
        console.warn("No valid appender found. Logging utility is not initialized properly. Only console logs will be shown.");
        return false;
    }
};

export const registerLoggingConfig = (element, elementId) => {
    let registeredElement = null;
    if (element) {
        registeredElement = element;
    } else if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            registeredElement = el;
        }
    }
    return registeredElement;
};
