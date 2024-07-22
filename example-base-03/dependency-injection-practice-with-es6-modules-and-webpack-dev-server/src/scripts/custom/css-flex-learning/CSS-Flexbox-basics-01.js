const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '10vh',
        backgroundColor: '#f0f0f0',
    },
    item: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '2px',
        margin: '3px',
        textAlign: 'center',
        flex: '1 1 50px',
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
        type: 'div', style: styles.container, children: [
            // { type: 'div', style: styles.item, innerHTML: 'Item 1' },
            // { type: 'div', style: styles.item, innerHTML: 'Item 2' },
            // { type: 'div', style: styles.item, innerHTML: 'Item 3' },
            // { type: 'div', style: styles.item, innerHTML: 'Item 4' },
        ]
    }
];

let childrenCount = 0;

const addChildren = (containerEl) => {
    containerEl.innerHTML = '';
    elements[0].children.push({
        type: 'div', style: styles.item, innerHTML: `Item ${++childrenCount}`
    });
    render(elements, containerEl);
}

const render = (elementList, parent = document.body) => {
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

const buttonEl = createElement('button', {}, 'Add', {});

myButtonContainerDiv.appendChild(buttonEl);

myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);

document.body.appendChild(myContainerDiv);

let intervalId;

buttonEl.addEventListener('click', () => {
    // elements.children=[];
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        
        addChildren(myElementsContainerDiv);
    }, 10);

    setTimeout(() => {
        clearInterval(intervalId);
    }, 1000);
});
