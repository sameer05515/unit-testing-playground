import { applyStyles, resetStyles, createButton, createDiv } from "../../../../../modules/common/ElementCreatorUtil";

const styles = {
    button: {
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.2s",
    },
    buttonHover: {
        backgroundColor: "red",
        transform: "scale(1.25)",
    },
};

let count = 0;

const myContainerDiv = createDiv({}, "", {}, {});
const myButtonContainerDiv = createDiv({}, "", {}, {});
const myElementsContainerDiv = createDiv({}, "", {}, {});

const onMyClick = () => {
    count++;
    buttonAddEl.innerHTML = `Current count {${count}}`;
};

const state = { isMouseHover: false };

const refreshButtonStyle = (state) => {
    return state.isMouseHover ? { ...styles.button, ...styles.buttonHover } : styles.button;
};

const buttonAddEl = createButton(
    {},
    `Current count {${count}}`,
    styles.button,
    {
        click: onMyClick,
        mouseover: () => {
            state.isMouseHover = true;
            resetStyles(buttonAddEl);
            applyStyles(buttonAddEl, refreshButtonStyle(state));
        },
        mouseout: () => {
            state.isMouseHover = false;
            resetStyles(buttonAddEl);
            applyStyles(buttonAddEl, refreshButtonStyle(state));
        },
    }
);

myButtonContainerDiv.appendChild(buttonAddEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);

const addInitialContent = () => {
    const initialContent = createDiv({}, "Initial content", {}, {});
    myElementsContainerDiv.appendChild(initialContent);
};

addInitialContent();
