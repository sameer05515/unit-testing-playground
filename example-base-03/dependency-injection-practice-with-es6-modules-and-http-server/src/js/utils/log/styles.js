export const getStylesForType = (type = 'container') => {
    const baseStyle = {
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

export const applyStyles = (element, styles) => {
    if (!element || !styles) {
        return;
    }
    for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
            element.style[property] = styles[property];
        }
    }
};
