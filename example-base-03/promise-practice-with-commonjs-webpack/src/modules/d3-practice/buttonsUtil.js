// buttonsUtil.js

const { styles } = require('./stylesUtil');

/**
 * Creates a button with the inner text "Reload" and attaches a click event handler.
 * @param {Function} onClick - The function to call when the button is clicked.
 * @param {HTMLElement} container - The container to append the button to.
 */
const createReloadButton = (onClick, container) => {
    const button = document.createElement("button");
    button.innerText = "Reload";

    // Apply styles from the styles JSON
    Object.keys(styles.button).forEach((styleKey) => {
        button.style[styleKey] = styles.button[styleKey];
    });

    button.onclick = () => {
        onClick();
    };

    container.appendChild(button);
};

module.exports = { createReloadButton };
