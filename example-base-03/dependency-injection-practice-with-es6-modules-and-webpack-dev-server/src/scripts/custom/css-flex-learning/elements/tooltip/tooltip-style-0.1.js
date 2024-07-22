
import { applyStyles, resetStyles, createButton, createDiv, createSelect, createInput, createLabel } from "../../../../../modules/common/ElementCreatorUtil";

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif'
    },
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
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        outline: 'none',
        width: '200px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
    },
    label: {
        fontSize: '16px',
        color: '#333',
        display: 'block',
        marginBottom: '5px',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '14px',
        maxWidth: '200px',
        display: 'none',
        zIndex: '1000',
    },
    tooltipStrong: {
        color: '#ff0',
    },
    tooltipEm: {
        color: '#0f0',
    },
    tooltipU: {
        color: '#f00',
    },
    tooltipCode: {
        backgroundColor: '#f1f1f1',
        color: '#333',
        padding: '2px 4px',
        borderRadius: '3px',
    }
};

applyStyles(document.body, styles.body);

const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
];

const myContainerDiv = createDiv({}, "", {}, {});
const myButtonContainerDiv = createDiv({}, "", {}, {});
const myElementsContainerDiv = createDiv({}, "", {}, {});

const labelEl = createLabel({}, "This is a label", styles.label);
const inputEl = createInput({ type: 'text', placeholder: 'Enter text' }, styles.input);
const selectEl = createSelect({},  styles.select, {
    change: (event) => {
        console.log('Select value changed:', event.target.value);
    }
},selectOptions, styles.option);

myButtonContainerDiv.appendChild(labelEl);
myButtonContainerDiv.appendChild(inputEl);
myButtonContainerDiv.appendChild(selectEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);

const tooltip = createDiv({ id: 'tooltip' }, "", styles.tooltip);
document.body.appendChild(tooltip);

const tooltipElements = document.querySelectorAll('.tooltip');
tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', event => {
        const tooltipText = event.target.getAttribute('data-tooltip');
        tooltip.innerHTML = tooltipText;
        tooltip.style.display = 'block';
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX + event.target.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;
    });

    element.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});

document.addEventListener('mousemove', event => {
    if (tooltip.style.display === 'block') {
        const rect = tooltip.getBoundingClientRect();
        tooltip.style.left = `${event.clientX - rect.width / 2}px`;
        tooltip.style.top = `${event.clientY - rect.height - 10}px`;
    }
});