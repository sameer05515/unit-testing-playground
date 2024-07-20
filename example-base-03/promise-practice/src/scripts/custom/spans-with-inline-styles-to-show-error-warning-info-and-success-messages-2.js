(() => {
    const messages = [
        { type: 'error', text: 'This is an error message' },
        { type: 'warning', text: 'This is a warning message' },
        { type: 'info', text: 'This is an info message' },
        { type: 'success', text: 'This is a success message' }
    ];

    const styles =(type='container')=> {

        const baseStyle={
            color: 'white',
            backgroundColor: 'red',
            padding: '5px',
            margin: '3px',
            borderRadius: '3px',
            display: 'block'
        }

        return{
            error: {
                ...baseStyle, backgroundColor: 'red',
            },
            warning: {
                ...baseStyle, backgroundColor: 'yellow',color: 'black',
            },
            info: {
                ...baseStyle, backgroundColor: 'blue',
            },
            success: {
                ...baseStyle, backgroundColor: 'green',
            }
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

    const createMessageSpan = (type, text) => {
        const span = document.createElement('span');
        applyStyles(span, styles()[type]);
        span.textContent = text;
        return span;
    };

    const container = document.createElement('div');
    messages.forEach(msg => {
        const messageSpan = createMessageSpan(msg.type, msg.text);
        container.appendChild(messageSpan);
    });

    document.body.appendChild(container);
})();
