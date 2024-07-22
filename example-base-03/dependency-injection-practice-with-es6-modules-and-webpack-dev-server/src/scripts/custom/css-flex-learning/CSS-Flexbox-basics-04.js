const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 'auto',
        backgroundColor: '#f0f0f0',
    },
    item: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '2px',
        margin: '3px',
        textAlign: 'center',
        flex: '0 1 30%',
        boxSizing: 'border-box'
    }
};

const applyStyles = (element, styles) => {
    for (const property in styles) {
        element.style[property] = styles[property];
    }
};

const createElement = (tag, attributes = {}, innerHTML = '', styles = {}) => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    applyStyles(element, styles);
    element.innerHTML = innerHTML;
    return element;
};

const elements = [
    {
        type: 'div', style: styles.container, children: []
    }
];

let childrenCount = 0;
let numberOfItems = 3;

const addChildren = (containerEl) => {
    elements[0].children.push({
        type: 'div', style: { ...styles.item, flex: `0 1 calc(${100 / numberOfItems}% - 6px)` }, innerHTML: `Item ${++childrenCount}`
    });
    render(elements, containerEl);
}

const render = (elementList, parent = document.body) => {
    parent.innerHTML = ''; // Clear the parent content before rendering
    elementList.forEach(({ type, style, children, innerHTML }) => {
        const element = createElement(type, {}, innerHTML, style);
        if (children && Array.isArray(children) && children.length > 0) {
            children.forEach(child => {
                const childElement = createElement(child.type, {}, child.innerHTML, child.style);
                element.appendChild(childElement);
            });
        }
        parent.appendChild(element);
    });
};

const myContainerDiv = createElement('div', {}, '', {});
const myButtonContainerDiv = createElement('div', {}, '', {});
const myElementsContainerDiv = createElement('div', {}, '', {});

const buttonAddEl = createElement('button', {}, 'Add', {});
const buttonIncreaseEl = createElement('button', {}, `Increase Elements in Row {${numberOfItems}}`, {});

myButtonContainerDiv.appendChild(buttonAddEl);
myButtonContainerDiv.appendChild(buttonIncreaseEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);

let intervalId;

buttonAddEl.addEventListener('click', () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        addChildren(myElementsContainerDiv);
    }, 10);

    setTimeout(() => {
        clearInterval(intervalId);
    }, 1000);
});

buttonIncreaseEl.addEventListener('click', () => {
    buttonIncreaseEl.innerHTML = `Increase Elements in Row {${++numberOfItems}}`;
    elements[0].children.forEach(child => {
        child.style.flex = `0 1 calc(${100 / numberOfItems}% - 6px)`;
    });
    render(elements, myElementsContainerDiv);
});
