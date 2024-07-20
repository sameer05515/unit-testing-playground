/**
 * Element Adder Utility Module.
 * @module elementAdderUtility
 */

import globalHelperUtility from '../global/globalHelperUtility.js';

const elementAdderUtility = (() => {
    const { generateRandomString: generateString } = globalHelperUtility;

    /**
     * Applies styles to a given element.
     * @param {HTMLElement} element - The element to style.
     * @param {Object} styles - An object containing the styles to apply.
     */
    const applyStyles = (element, styles) => {
        if (!element || !styles) {
            return;
        }
        for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property] = styles[property];
            }
        }
    };

    /**
     * Returns default styles for a given element type.
     * @param {string} elementType - The type of the element.
     * @returns {Object} The default styles for the element type.
     */
    const getDefaultStyle = (elementType) => {
        const defaultStyles = {
            div: {
                border: '1px solid #000',
                padding: '10px',
                margin: '5px'
            },
            input: {
                padding: '5px',
                margin: '5px'
            },
            button: {
                padding: '10px 20px',
                margin: '5px',
                cursor: 'pointer'
            },
            span: {
                margin: '5px'
            },
            select: {
                padding: '5px',
                margin: '5px'
            },
            h1: {
                fontSize: '24px',
                margin: '10px 0'
            },
            h2: {
                fontSize: '20px',
                margin: '10px 0'
            },
            h3: {
                fontSize: '16px',
                margin: '10px 0'
            },
            p: {
                margin: '10px 0'
            },
            ul: {
                margin: '10px 0',
                padding: '0',
                listStyleType: 'none'
            },
            li: {
                margin: '5px 0'
            },
            img: {
                maxWidth: '100%',
                height: 'auto'
            },
            a: {
                color: '#007BFF',
                textDecoration: 'none',
                cursor: 'pointer'
            },
            header: {
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e5e5e5'
            },
            footer: {
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #e5e5e5'
            },
            section: {
                padding: '10px',
                margin: '10px 0'
            },
            article: {
                padding: '10px',
                margin: '10px 0'
            }
        };
        return defaultStyles[elementType.toLowerCase()] || {};
    };

    /**
     * Adds a new HTML element with specified attributes and returns it.
     * @param {Object} params - Parameters for creating the element.
     * @param {string} params.elementType - The type of the element to create (e.g., 'div', 'input').
     * @param {boolean} params.addToBody - Whether to add the element directly to the body.
     * @param {string} [params.parentElementId] - The ID of the parent element to add the new element to.
     * @param {Object} [params.style] - An object containing the styles to apply to the element.
     * @param {string} [params.innerText] - The inner text or placeholder text for the element.
     * @param {Function} [params.onClick] - A callback function to attach to the element's click event.
     * @param {Array} [params.options] - An array of options for the select element.
     * @returns {Promise<HTMLElement>} A promise that resolves to the created HTML element.
     */
    const addElementWithPromise = (
        { elementType, addToBody, parentElementId, style, innerText, onClick, options } = {
            elementType: "",
            addToBody: false,
            parentElementId: "",
            style: {},
            innerText: "",
            onClick: () => { },
            options: [],
        }
    ) => {
        return new Promise((resolve, reject) => {
            let parentElement = null;

            if (
                !elementType ||
                ![
                    "div", "input", "button", "span", "select", "h1", "h2", "h3", "p", "ul", "li", "img", "a",
                    "header", "footer", "section", "article"
                ].includes(elementType.trim().toLowerCase())
            ) {
                reject(new Error(`Invalid elementType provided '${elementType}'`));
                return;
            } else if (addToBody && parentElementId && parentElementId.trim().length > 0) {
                reject(new Error(`[Ambiguous situation]: Both addToBody : '${addToBody}' and parentElementId : '${parentElementId}' {A non-empty value} should not be provided.`));
                return;
            } else if (!addToBody && (!parentElementId || parentElementId.trim().length < 1)) {
                reject(new Error(`Unable to create element with addToBody:'${addToBody}' and parentElementId : '${parentElementId}' {An invalid value} is provided simultaneously.`));
                return;
            } else if (!addToBody && parentElementId) {
                parentElement = document.getElementById(parentElementId);
                if (!parentElement) {
                    reject(new Error(`Parent Element with ID '${parentElementId}' does not exist.`));
                    return;
                }
            }

            let htmlElementToBeCreated = null;
            const id = generateString({ length: 20, prefix: elementType });
            switch (elementType.trim().toLowerCase()) {
                case "div":
                case "input":
                case "button":
                case "span":
                case "h1":
                case "h2":
                case "h3":
                case "p":
                case "ul":
                case "li":
                case "header":
                case "footer":
                case "section":
                case "article":
                    htmlElementToBeCreated = document.createElement(elementType);
                    htmlElementToBeCreated.id = id;
                    applyStyles(htmlElementToBeCreated, style || getDefaultStyle(elementType));
                    // htmlElementToBeCreated.innerText = innerText || id;
                    const textNode = document.createTextNode(innerText || id);
                    htmlElementToBeCreated.appendChild(textNode);
                    if (elementType === "input") {
                        htmlElementToBeCreated.placeholder = innerText || id;
                    }
                    if (elementType === "a") {
                        htmlElementToBeCreated.href = '#';
                    }
                    if (onClick) {
                        htmlElementToBeCreated.addEventListener("click", onClick);
                    }
                    if (addToBody) {
                        document.body.append(htmlElementToBeCreated);
                    } else {
                        parentElement.appendChild(htmlElementToBeCreated);
                    }
                    resolve(htmlElementToBeCreated);
                    break;
                case "select":
                    htmlElementToBeCreated = document.createElement(elementType);
                    htmlElementToBeCreated.id = id;
                    applyStyles(htmlElementToBeCreated, style || getDefaultStyle(elementType));
                    if (options && Array.isArray(options)) {
                        options.forEach(optionData => {
                            const option = document.createElement("option");
                            option.value = optionData.value;
                            option.innerText = optionData.label;
                            htmlElementToBeCreated.appendChild(option);
                        });
                    }
                    if (onClick) {
                        htmlElementToBeCreated.addEventListener("change", onClick);
                    }
                    if (addToBody) {
                        document.body.append(htmlElementToBeCreated);
                    } else {
                        parentElement.appendChild(htmlElementToBeCreated);
                    }
                    resolve(htmlElementToBeCreated);
                    break;
                case "img":
                    htmlElementToBeCreated = document.createElement(elementType);
                    htmlElementToBeCreated.id = id;
                    applyStyles(htmlElementToBeCreated, style || getDefaultStyle(elementType));
                    htmlElementToBeCreated.src = innerText || '';
                    if (onClick) {
                        htmlElementToBeCreated.addEventListener("click", onClick);
                    }
                    if (addToBody) {
                        document.body.append(htmlElementToBeCreated);
                    } else {
                        parentElement.appendChild(htmlElementToBeCreated);
                    }
                    resolve(htmlElementToBeCreated);
                    break;
                default:
                    reject(new Error(`Error occurred while loading elementType '${elementType}'`));
                    break;
            }
        });
    };

    return {
        addElementWithPromise,
    };
})();

export default elementAdderUtility;
