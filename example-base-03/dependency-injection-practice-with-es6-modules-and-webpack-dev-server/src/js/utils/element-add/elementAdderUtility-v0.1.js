import { idUtility, styleUtility } from '../global/globalHelperUtility.js';

const elementAdderUtility = (() => {

    const createElement = (config, parentElement = null) => {
        return new Promise((resolve, reject) => {
            if (!config.elementType || !["div", "input", "button", "span", "select", "h1", "h2", "h3", "p", "ul", "li", "img", "a", "header", "footer", "section", "article"].includes(config.elementType.trim().toLowerCase())) {
                reject(new Error(`Invalid elementType provided '${config.elementType}'`));
                return;
            }

            const id = idUtility.generateId({ length: 20, prefix: config.elementType });
            const element = document.createElement(config.elementType);
            element.id = id;
            styleUtility.applyStyles(element, { ...styleUtility.getDefaultStyle(config.elementType), ...config.style });

            if (config.innerText) {
                const textNode = document.createTextNode(config.innerText);
                element.appendChild(textNode);
            }
            
            if (config.elementType === "input" && config.innerText) {
                element.placeholder = config.innerText;
            }

            if (config.elementType === "a" && config.href) {
                element.href = config.href;
            }

            if (config.options && Array.isArray(config.options)) {
                config.options.forEach(optionData => {
                    const option = document.createElement("option");
                    option.value = optionData.value;
                    option.innerText = optionData.label;
                    element.appendChild(option);
                });
            }

            if (config.onClick) {
                element.addEventListener("click", config.onClick);
            }

            if (parentElement) {
                parentElement.appendChild(element);
            } else {
                document.body.appendChild(element);
            }

            if (config.children && Array.isArray(config.children)) {
                const childPromises = config.children.map(childConfig => createElement(childConfig, element));
                Promise.all(childPromises)
                    .then(() => resolve(element))
                    .catch(reject);
            } else {
                resolve(element);
            }
        });
    };

    const addElementsFromArray = (elementsConfigArray) => {
        const promises = elementsConfigArray.map(config => createElement(config));
        return Promise.all(promises);
    };

    return {
        addElementsFromArray,
    };
})();

export default elementAdderUtility;
