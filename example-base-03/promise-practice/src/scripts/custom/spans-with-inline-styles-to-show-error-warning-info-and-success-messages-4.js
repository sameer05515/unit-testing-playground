(() => {
    const messages = [
        { 
            type: 'error', 
            text: {
                timestamp: new Date().toString(),
                logMessage: 'This is an error message'
            } 
        },
        { 
            type: 'warning', 
            text: {
                timestamp: new Date().toString(),
                logMessage: 'This is a warning message'
            } 
        },
        { 
            type: 'info', 
            text: {
                timestamp: new Date().toString(),
                logMessage: 'This is an info message'
            } 
        },
        { 
            type: 'success', 
            text: {
                timestamp: new Date().toString(),
                logMessage: 'This is a success message'
            } 
        }
    ];

    const styles = {
        error: {
            color: 'red',
            // backgroundColor: 'red',
            padding: '5px',
            margin: '3px',
            borderRadius: '3px',
            display: 'block'
        },
        warning: {
            color: 'black',
            // backgroundColor: 'yellow',
            padding: '5px',
            margin: '3px',
            borderRadius: '3px',
            display: 'block'
        },
        info: {
            color: 'blue',
            // backgroundColor: 'blue',
            padding: '5px',
            margin: '3px',
            borderRadius: '3px',
            display: 'block'
        },
        success: {
            color: 'green',
            // backgroundColor: 'green',
            padding: '5px',
            margin: '3px',
            borderRadius: '3px',
            display: 'block'
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

    const createMessageSpan = (type='', text='') => {
        const span = document.createElement('span');
        applyStyles(span, styles[type]);
        span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${text.timestamp}]: ${text.logMessage}`;
        return span;
    };

    const container = document.createElement('div');
    messages.forEach(msg => {
        const messageSpan = createMessageSpan(msg.type, msg.text);
        container.appendChild(messageSpan);
    });

    document.body.appendChild(container);
})();
