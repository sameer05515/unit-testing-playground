import { applyStyles, createDiv, createInput } from "../../../../../modules/common/ElementCreatorUtil";

const styles = {
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '300px',
        boxSizing: 'border-box', // Ensure padding and border are included in the width
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputFocus: {
        borderColor: '#4CAF50', // Change border color on focus
        boxShadow: '0 0 5px rgba(76, 175, 80, 0.5)' // Add shadow on focus
    }
};

const myContainerDiv = createDiv({}, "", {}, {});
const myInputContainerDiv = createDiv({}, "", {}, {});

const onInputFocus = (event) => {
    applyStyles(event.target, styles.inputFocus);
};

const onInputBlur = (event) => {
    applyStyles(event.target, styles.input);
};

const inputEl = createInput(
    { type: 'text', placeholder: 'Enter text here...' },
    '', // No innerHTML for input
    styles.input,
    {
        focus: onInputFocus,
        blur: onInputBlur
    }
);

myInputContainerDiv.appendChild(inputEl);
myContainerDiv.appendChild(myInputContainerDiv);
document.body.appendChild(myContainerDiv);
