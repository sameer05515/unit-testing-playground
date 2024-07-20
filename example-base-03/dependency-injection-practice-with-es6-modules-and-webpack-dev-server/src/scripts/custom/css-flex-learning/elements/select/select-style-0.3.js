import { createButton, createDiv, createSelect, applyStyles } from "../../../../../modules/common/ElementCreatorUtil";

const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
];

const styles = {
    select: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        color: '#333',
        width: '200px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    option: {
        color: '#333',
        backgroundColor: '#f9f9f9',
        padding: '8px 10px',
        fontSize: '16px',
        border: '1px solid transparent',
        transition: 'background-color 0.2s',
    },
    optionHover: {
        backgroundColor: '#e0e0e0',
        color: 'yellow',
    },
    optionSelected: {
        backgroundColor: '#d1eaff',
        color: '#000',
    }
};

// Apply styles to options with a hover effect using JavaScript
const applyOptionStyles = (option, styles) => {
    applyStyles(option, styles);
    option.addEventListener('mouseover', () => applyStyles(option, styles.optionHover));
    option.addEventListener('mouseout', () => applyStyles(option, styles));
};

const myContainerDiv = createDiv({}, "", {}, {});
const myButtonContainerDiv = createDiv({}, "", {}, {});
const myElementsContainerDiv = createDiv({}, "", {}, {});

const selectEl = createSelect(
    {},
    
    styles.select,
    
    {
        change: (event) => {
            console.log('Select value changed:', event.target.value);
        }
    },
    selectOptions,
    styles.option,
);

document.querySelectorAll('option').forEach(option => applyOptionStyles(option, styles.option));

myButtonContainerDiv.appendChild(selectEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);
