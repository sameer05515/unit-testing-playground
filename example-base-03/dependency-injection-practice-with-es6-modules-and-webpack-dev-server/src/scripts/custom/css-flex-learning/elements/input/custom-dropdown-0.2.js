import { applyStyles, createDiv, createInput, removeStyles, resetStyles } from "../../../../../modules/common/ElementCreatorUtil";

const styles = {
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '300px',
        boxSizing: 'border-box',
        cursor: 'pointer',
    },
    dropdownContainer: {
        position: 'relative',
        width: '300px',
        boxSizing: 'border-box',
    },
    dropdownList: {
        display: 'none',
        position: 'absolute',
        top: '100%',
        left: '0',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        maxHeight: '200px',
        overflowY: 'auto',
    },
    dropdownItem: {
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    dropdownItemHover: {
        backgroundColor: '#e0e0e0',
    },
    dropdownVisible: {
        display: 'block',
    }
};

const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
];

const myContainerDiv = createDiv({}, "", {}, {});
const dropdownContainer = createDiv({}, "", styles.dropdownContainer, {});
const inputEl = createInput(
    { type: 'text', placeholder: 'Select an option...', readonly: true },
    '',
    styles.input,
    {
        click: () => {
            dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
        }
    }
);

const dropdownList = createDiv({}, "", styles.dropdownList, {});

// Create dropdown items
options.forEach(option => {
    const item = createDiv({}, option.label, styles.dropdownItem, {
        click: () => {
            inputEl.value = option.label;
            dropdownList.style.display = 'none';
        }
    });
    
    item.addEventListener('mouseover', () => applyStyles(item, styles.dropdownItemHover));
    item.addEventListener('mouseout', () => removeStyles(item, styles.dropdownItemHover));
    
    dropdownList.appendChild(item);
});

dropdownContainer.appendChild(inputEl);
dropdownContainer.appendChild(dropdownList);
myContainerDiv.appendChild(dropdownContainer);
document.body.appendChild(myContainerDiv);
