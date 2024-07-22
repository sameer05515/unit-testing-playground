// ElementCreatorUtil.js

export const applyStyles = (element, styles) => {
    for (const property in styles) {
        element.style[property] = styles[property];
    }
};

export const removeStyles = (element, styles) => {
    for (const property in styles) {
        element.style[property] = '';
    }
};

export const resetStyles = (element) => {
    element.style.cssText = '';
};

const createElement = (
    tag,
    attributes = {},
    innerHTML = "",
    styles = {},
    events = {}
) => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach((attr) =>
        element.setAttribute(attr, attributes[attr])
    );
    applyStyles(element, styles);
    element.innerHTML = innerHTML;

    // Attach event listeners
    Object.keys(events).forEach((event) => {
        element.addEventListener(event, events[event]);
    });

    return element;
};

export const createButton = (attributes = {}, innerHTML = '', styles = {}, events = {}) => {
    // common validation method applied for any element type
    // validation required for element type: button
    const button = createElement('button', attributes, innerHTML, styles, events);
    return button;
};

export const createDiv = (attributes = {}, innerHTML = '', styles = {}, events = {}) => {
    // common validation method applied for any element type
    // validation required for element type: div
    const button = createElement('div', attributes, innerHTML, styles, events);
    return button;
};

export const createSelect = (attributes = {}, styles = {}, events = {}, options = [], optionStyles = {}) => {
    const select = createElement('select', attributes, '', styles, events);

    options.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.innerText = optionData.label;
        applyStyles(option, optionStyles); // Apply styles to each option
        select.appendChild(option);
    });

    return select;
};


export const createInput = (attributes = {}, innerHTML = '', styles = {}, events = {}) => {
    return createElement('input', attributes, innerHTML, styles, events);
};

export const createLabel = (attributes = {}, innerHTML = '', styles = {}, events = {}) => {
    const label = createElement('label', attributes, innerHTML, styles, events);
    return label;
};


