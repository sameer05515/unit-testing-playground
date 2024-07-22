export const validConfig = (registeredElement: HTMLElement | null): boolean => {
    if (registeredElement) {
        return true;
    } else {
        console.warn("No valid appender found. Logging utility is not initialized properly. Only console logs will be shown.");
        return false;
    }
};

export const registerLoggingConfig = (element: HTMLElement | null, elementId?: string): HTMLElement | null => {
    let registeredElement: HTMLElement | null = null;

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
