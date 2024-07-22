// Import necessary functions from ElementCreatorUtil.js
import { applyStyles, createDiv, createLabel } from "../../../../../modules/common/ElementCreatorUtil";

// Define styles
const styles = {
    label: {
        display: 'block',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#333'
    }
};

// Create a container div
const myContainerDiv = createDiv({}, "", {}, {});

// Create a label element
const myLabel = createLabel(
    { for: 'myInput' }, // Attributes
    'My Custom Label', // Inner HTML
    styles.label, // Styles
    {} // Events
);

// Append the label to the container div
myContainerDiv.appendChild(myLabel);

// Append the container div to the body
document.body.appendChild(myContainerDiv);

// Optionally, add an input element associated with the label
const myInput = document.createElement('input');
myInput.id = 'myInput';
myContainerDiv.appendChild(myInput);
