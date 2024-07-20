// elementAdderUtility-v3.js

/**
 * Element Adder Utility Module.
 * @module elementAdderUtility
 */

import { idUtility, styleUtility } from '../global/globalHelperUtility.js';

/**
 * Utility for adding elements to the DOM.
 * @module elementAdderUtility
 */
const elementAdderUtility = (() => {
    /**
     * Validates parameters for element creation.
     * @param {Object} params - Parameters for creating the element.
     * @returns {Object} Validation result.
     */
    const validateParams = ({ elementType, addToBody, parentElementId }) => {
        if (addToBody) {
            return { isValid: false, error: `addToBody is deprecated in v2. Please provide valid parentElementId with addToBody 'false'. Currently provided value for addToBody '${addToBody}'` };
        } else if (
            !elementType ||
            ![
                "div", "input", "button", "span", "select", "h1", "h2", "h3", "p", "ul", "li", "img", "a",
                "header", "footer", "section", "article"
            ].includes(elementType.trim().toLowerCase())
        ) {
            return { isValid: false, error: `Invalid elementType provided '${elementType}'` };
        } else if (!addToBody && (!parentElementId || parentElementId.trim().length < 1)) {
            return { isValid: false, error: `Unable to create element with addToBody:'${addToBody}' and parentElementId : '${parentElementId}' {An invalid value} is provided simultaneously.` };
        } else if (!addToBody && parentElementId) {
            const parentElement = document.getElementById(parentElementId);
            if (!parentElement) {
                return { isValid: false, error: `Parent Element with ID '${parentElementId}' does not exist.` };
            }
            return { isValid: true, parentElement };
        }
        return { isValid: true };
    };

    /**
     * Common logic for element creation.
     * @param {HTMLElement} element - The element to be created.
     * @param {Object} params - Parameters for creating the element.
     */
    const applyCommonAttributes = (element, { id, innerText, style, onClick }) => {
        element.id = id;
        styleUtility.applyStyles(element, { ...styleUtility.getDefaultStyle(element.tagName), ...style });
        element.appendChild(document.createTextNode(innerText || id));
        element.appendChild(document.createElement('br'));
        if (onClick) element.addEventListener("click", onClick);
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
    const addElementWithPromise = ({
        elementType, addToBody, parentElementId, style, innerText, onClick, options
    } = {
        elementType: "",
        addToBody: false,
        parentElementId: "",
        style: {},
        innerText: "",
        onClick: () => { },
        options: [],
    }) => {
        return new Promise((resolve, reject) => {
            const { isValid, error, parentElement } = validateParams({ elementType, addToBody, parentElementId });

            if (!isValid) {
                reject(new Error(error));
                return;
            }

            const id = idUtility.generateId({ length: 20, prefix: elementType });
            let htmlElementToBeCreated;

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
                    applyCommonAttributes(htmlElementToBeCreated, { id, innerText, style, onClick });
                    if (elementType === "input") htmlElementToBeCreated.placeholder = innerText || id;
                    if (elementType === "a") htmlElementToBeCreated.href = '#';
                    break;
                case "select":
                    htmlElementToBeCreated = document.createElement(elementType);
                    applyCommonAttributes(htmlElementToBeCreated, { id, innerText, style, onClick });
                    if (options && Array.isArray(options)) {
                        options.forEach(optionData => {
                            const option = document.createElement("option");
                            option.value = optionData.value;
                            option.innerText = optionData.label;
                            htmlElementToBeCreated.appendChild(option);
                        });
                    }
                    htmlElementToBeCreated.addEventListener("change", onClick);
                    break;
                case "img":
                    htmlElementToBeCreated = document.createElement(elementType);
                    applyCommonAttributes(htmlElementToBeCreated, { id, innerText, style, onClick });
                    htmlElementToBeCreated.src = innerText || '';
                    break;
                default:
                    reject(new Error(`Error occurred while loading elementType '${elementType}'`));
                    return;
            }

            parentElement.appendChild(htmlElementToBeCreated);
            resolve(htmlElementToBeCreated);
        });
    };

    return { addElementWithPromise };
})();

export default elementAdderUtility;
