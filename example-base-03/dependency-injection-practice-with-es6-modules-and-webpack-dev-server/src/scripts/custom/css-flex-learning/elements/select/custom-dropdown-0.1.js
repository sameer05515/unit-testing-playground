import { applyStyles, createButton, createDiv, resetStyles } from "../../../../../modules/common/ElementCreatorUtil";

// Custom dropdown styles
const styles = {
    selectContainer: {
        position: 'relative',
        width: '200px',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        color: '#333',
        width: '100%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        outline: 'none',
    },
    optionsList: {
        display: 'none',
        position: 'absolute',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
    },
    option: {
        padding: '8px 10px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s, color 0.2s',
        color: 'green',
    },
    optionHover: {
        padding: '8px 10px',
        backgroundColor: 'yellow',
        color: 'black',
    },
    optionSelected: {
        backgroundColor: '#d1eaff',
        color: '#000',
    }
};

const createCustomSelect = (options = [], styles = {}, events = {}) => {
    const container = createDiv({}, '', styles.selectContainer);
    const selected = createDiv({}, 'Select an option', styles.select);
    const optionsList = createDiv({}, '', styles.optionsList);

    options.forEach(optionData => {
        const option = createDiv({}, optionData.label, styles.option);
        option.addEventListener('click', () => {
            selected.innerText = optionData.label;
            optionsList.style.display = 'none';
            if (events.change) events.change(optionData.value);
        });
        option.addEventListener('mouseover', () => {
            resetStyles(option);
            applyStyles(option, styles.optionHover);
        });
        option.addEventListener('mouseout', () => {
            resetStyles(option);
            applyStyles(option, styles.option);
        });
        optionsList.appendChild(option);
    });

    selected.addEventListener('click', () => {
        optionsList.style.display = optionsList.style.display === 'none' ? 'block' : 'none';
    });

    container.appendChild(selected);
    container.appendChild(optionsList);

    return container;
};

const myContainerDiv = createDiv({}, "", {}, {});
const myButtonContainerDiv = createDiv({}, "", {}, {});
const myElementsContainerDiv = createDiv({}, "", {}, {});

const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
];

const customSelect = createCustomSelect(
    selectOptions,
    styles,
    {
        change: (value) => {
            console.log('Select value changed:', value);
        }
    }
);

myButtonContainerDiv.appendChild(customSelect);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);
