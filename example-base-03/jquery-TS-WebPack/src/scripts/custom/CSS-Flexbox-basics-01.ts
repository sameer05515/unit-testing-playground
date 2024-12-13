interface Styles {
    [key: string]: string | number;
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '10vh',
        backgroundColor: '#f0f0f0',
    } as Styles,
    item: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '2px',
        margin: '3px',
        textAlign: 'center',
        flex: '1 1 50px',
    } as Styles
};

const applyStyles = (element: HTMLElement, styles: Styles): void => {
    for (const property in styles) {
        (element.style as any)[property] = styles[property];
    }
};

const createElement = (tag: string, attributes: { [key: string]: string } = {}, innerHTML: string = '', styles: Styles = {}): HTMLElement => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    applyStyles(element, styles);
    element.innerHTML = innerHTML;
    return element;
};

interface ElementConfig {
    type: string;
    style?: Styles;
    innerHTML?: string;
    children?: ElementConfig[];
}

const elements: ElementConfig[] = [
    {
        type: 'div', style: styles.container, children: [
            // Initially no children, will be added dynamically
        ]
    }
];

let childrenCount = 0;

const addChildren = (containerEl: HTMLElement): void => {
    containerEl.innerHTML = '';
    elements[0].children?.push({
        type: 'div', style: styles.item, innerHTML: `Item ${++childrenCount}`
    });
    render(elements, containerEl);
};

const render = (elementList: ElementConfig[], parent: HTMLElement = document.body): void => {
    elementList.forEach(({ type, style, children, innerHTML }) => {
        const element = createElement(type, {}, innerHTML || '', style || {});
        if (children && Array.isArray(children) && children.length > 0) {
            children.forEach(child => {
                const childElement = createElement(child.type, {}, child.innerHTML || '', child.style || {});
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

let intervalId: NodeJS.Timeout | null = null;

buttonEl.addEventListener('click', () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        addChildren(myElementsContainerDiv);
    }, 10);

    setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
    }, 1000);
});
