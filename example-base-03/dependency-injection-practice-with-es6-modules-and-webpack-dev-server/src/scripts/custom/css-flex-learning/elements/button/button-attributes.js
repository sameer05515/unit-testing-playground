import { applyStyles, createButton, createDiv } from "../../../../../modules/common/ElementCreatorUtil";

// const createButton = (attributes = {}, innerHTML = '', styles = {}, events = {}) => {
//     const button = createElement('button', attributes, innerHTML, styles, events);
//     return button;
// };

const buttonAttributes = {
    type: 'submit',
    id: 'submitButton',
    class: 'btn btn-success',
    ariaLabel: 'Submit Form',
    name: 'submitBtn',
    value: 'submit'
};

const buttonStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
};

const buttonEvents = {
    click: () => alert('Button Clicked!')
};

const submitButton = createButton(buttonAttributes, 'Submit', buttonStyles, buttonEvents);

document.body.appendChild(submitButton);
