type StyleType = 'container' | 'error' | 'trace' | 'debug' | 'warn' | 'info' | 'success';

interface Styles {
    [key: string]: string; // All style properties should be strings
}

export const getStylesForType = (type: StyleType = 'container'): Styles => {
    const baseStyle: Styles = {
        color: 'black',
        margin: '3px',
        borderRadius: '3px',
        whiteSpace: 'pre-wrap',
        display: 'block',
    };

    switch (type) {
        case 'error':
        case 'trace':
        case 'debug':
            return { ...baseStyle, color: 'red' };
        case 'warn':
            return { ...baseStyle, color: 'black', backgroundColor: 'yellow' };
        case 'info':
            return { ...baseStyle, color: 'blue' };
        case 'success':
            return { ...baseStyle, color: 'green' };
        default:
            return { ...baseStyle };
    }
};

export const applyStyles = (element: HTMLElement | null, styles: Styles): void => {
    if (!element || !styles) {
        return;
    }
    for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
            element.style[property as any] = styles[property]; // Type assertion
        }
    }
};
