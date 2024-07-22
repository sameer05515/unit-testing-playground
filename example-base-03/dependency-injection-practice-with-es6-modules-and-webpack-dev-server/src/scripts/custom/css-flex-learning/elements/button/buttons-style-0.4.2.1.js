import { applyStyles, resetStyles, createButton, createDiv } from "../../../../../modules/common/ElementCreatorUtil";

// Define styles
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

// Initialize state
let count = 0;
const state = { isMouseHover: false };

// Utility function to get button styles based on state
const getButtonStyle = (state) => {
    return state.isMouseHover ? { ...styles.button, ...styles.buttonHover } : styles.button;
};

// Event handlers
const handleButtonClick = () => {
    count++;
    buttonAddEl.innerHTML = `Current count {${count}}`;
};

const handleMouseOver = () => {
    state.isMouseHover = true;
    updateButtonStyle();
};

const handleMouseOut = () => {
    state.isMouseHover = false;
    updateButtonStyle();
};

// Update button style based on current state
const updateButtonStyle = () => {
    resetStyles(buttonAddEl);
    applyStyles(buttonAddEl, getButtonStyle(state));
};

// Create initial elements
const myContainerDiv = createDiv({}, "", {}, {});
const myButtonContainerDiv = createDiv({}, "", {}, {});
const myElementsContainerDiv = createDiv({}, "", {}, {});

const buttonAddEl = createButton(
    {},
    `Current count {${count}}`,
    styles.button,
    {
        click: handleButtonClick,
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
    }
);

// Append elements to the DOM
myButtonContainerDiv.appendChild(buttonAddEl);
myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);
document.body.appendChild(myContainerDiv);

// Add initial content to elements container
const addInitialContent = () => {
    const initialContent = createDiv({}, "Initial content", {}, {});
    myElementsContainerDiv.appendChild(initialContent);
};

addInitialContent();
