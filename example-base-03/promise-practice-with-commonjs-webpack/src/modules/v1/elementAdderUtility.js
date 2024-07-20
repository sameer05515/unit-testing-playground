

// elementAdderUtility.js
const globalHelperUtility = require('./globalHelperUtility');

const elementAdderUtility = (() => {
    const { generateRandomString: generateString } = globalHelperUtility;

    const defaultStyles = {
        div: {
            width: "300px",
            height: "300px",
            border: "1px solid",
            borderLeft: "5px solid blue",
        },
        input: {
            width: "300px",
            height: "30px",
            border: "1px solid",
            padding: "5px",
        },
        button: {
            width: "100px",
            height: "40px",
            border: "1px solid",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "5px",
        },
        span: {
            padding: "5px",
            fontSize: "16px",
            color: "black",
        }
    };

    const applyStyles = (element, styles) => {
        if (!element || !styles) return;
        for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property] = styles[property];
            }
        }
    };

    const addElementWithPromise = (
        { elementType, addToBody, parentElementId, style, innerText, onClick, showInnerText } = {
            elementType: "",
            addToBody: false,
            parentElementId: "",
            style: {},
            innerText: "",            
            onClick: () => { },
            showInnerText: true
        }
    ) => {
        return new Promise((resolve, reject) => {
            let parentElement = null;

            if (
                !elementType ||
                !["div", "input", "button", "span"].includes(
                    elementType.trim().toLowerCase()
                )
            ) {
                reject(new Error(`Invalid elementType provided '${elementType}'`));
                return;
            } else if (
                addToBody &&
                parentElementId &&
                parentElementId.trim().length > 0
            ) {
                reject(
                    new Error(
                        `[Ambiguous situation]: Both addToBody : '${addToBody}' and parentElementId : '${parentElementId}' {A non-empty value} should not be provided.`
                    )
                );
                return;
            } else if (
                !addToBody &&
                (!parentElementId || parentElementId.trim().length < 1)
            ) {
                reject(
                    new Error(
                        `Unable to create element with addToBody:'${addToBody}' and parentElementId : '${parentElementId}' {An invalid value} is provided simultaneously.`
                    )
                );
                return;
            } else if (!addToBody && parentElementId) {
                parentElement = document.getElementById(parentElementId);
                if (!parentElement) {
                    reject(
                        new Error(
                            `Parent Element with ID '${parentElementId}' does not exist.`
                        )
                    );
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
                    htmlElementToBeCreated = document.createElement(elementType);
                    htmlElementToBeCreated.id = id;

                    applyStyles(htmlElementToBeCreated, defaultStyles[elementType]);
                    applyStyles(htmlElementToBeCreated, style);

                    if (showInnerText) {
                        htmlElementToBeCreated.innerText = innerText || id;
                        if (elementType === "input") {
                            htmlElementToBeCreated.placeholder = innerText || id;
                        }
                    }

                    if (onClick && typeof onClick === "function") {
                        htmlElementToBeCreated.addEventListener('click', onClick);
                    }

                    addToBody
                        ? document.body.append(htmlElementToBeCreated)
                        : parentElement.appendChild(htmlElementToBeCreated);

                    resolve(htmlElementToBeCreated);
                    break;
                default:
                    htmlElementToBeCreated = null;
                    break;
            }

            if (!htmlElementToBeCreated) {
                reject(
                    new Error(`Error occurred while creating element of type '${elementType}'`)
                );
            }
        });
    };

    return {
        addElementWithPromise,
    };
})();

module.exports = elementAdderUtility;