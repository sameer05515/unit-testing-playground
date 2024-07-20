import { createButton, createDiv, createSelect } from "../../../../../modules/common/ElementCreatorUtil";

const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
];

const styles = {
    select: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc'
    },
    option: {
        color: 'blue',  // Basic styling for option elements
        backgroundColor: '#f9f9f9'
    }
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
    styles.option, // Pass styles for option elements
);

myButtonContainerDiv.appendChild(selectEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);
