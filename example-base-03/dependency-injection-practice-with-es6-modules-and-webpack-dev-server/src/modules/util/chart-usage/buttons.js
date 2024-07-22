import { styles } from './stylesUtil.js';

const createReloadButton = (onClick, container) => {
    const button = document.createElement("button");
    button.innerText = "Reload";

    Object.keys(styles.button).forEach((styleKey) => {
        button.style[styleKey] = styles.button[styleKey];
    });

    button.onclick = () => {
        onClick();
    };

    container.appendChild(button);
};

export { createReloadButton };
