import { applyStyles, createButton, createDiv} from "../../../../../modules/common/ElementCreatorUtil";

const styles = {
    button: {
        backgroundColor: "#4CAF50", // Green background color
        color: "white", // White text color
        border: "none", // No border
        borderRadius: "5px", // Rounded corners
        padding: "10px 20px", // Padding for top/bottom and left/right
        fontSize: "16px", // Font size
        cursor: "pointer", // Pointer cursor on hover
        transition: "background-color 0.3s, transform 0.2s", // Smooth transition effects
    },
    buttonHover: {
        backgroundColor: "red", // Slightly darker green for hover effect
        transform: "scale(1.25)", // Slightly enlarge the button on hover
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

const buttonAddEl = createButton(
    {},
    `Current count {${count}}`,
    styles.button,
    {
        click: onMyClick,
        mouseover: () => {
            applyStyles(buttonAddEl, styles.buttonHover);
        },
        mouseout: () => {
            applyStyles(buttonAddEl, styles.button);
        },
    }
);

myButtonContainerDiv.appendChild(buttonAddEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);

// Optionally add some initial content or functionality
const addInitialContent = () => {
    // Add some initial content to `myElementsContainerDiv` if needed
    const initialContent = createDiv({}, "Initial content", {}, {});
    myElementsContainerDiv.appendChild(initialContent);
};

addInitialContent();
