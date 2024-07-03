(() => {
    const messages = [
        { type: 'error', text: 'This is an error message' },
        { type: 'warning', text: 'This is a warning message' },
        { type: 'info', text: 'This is an info message' },
        { type: 'success', text: 'This is a success message' }
    ];

    const styles = {
        error: 'color: white; background-color: red; padding: 5px; margin: 3px; border-radius: 3px; display: block;',
        warning: 'color: black; background-color: yellow; padding: 5px; margin: 3px; border-radius: 3px; display: block;',
        info: 'color: white; background-color: blue; padding: 5px; margin: 3px; border-radius: 3px; display: block;',
        success: 'color: white; background-color: green; padding: 5px; margin: 3px; border-radius: 3px; display: block;'
    };

    const createMessageSpan = (type, text) => {
        const span = document.createElement('span');
        span.style.cssText = styles[type];
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
