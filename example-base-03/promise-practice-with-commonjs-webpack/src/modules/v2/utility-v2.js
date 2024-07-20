const counterUtility = (function () {
    let count = 0;
    const increment = () => {
        count=count+5;
        return count;
    };

    const decrement = () => {
        count=count-5;
        return count;
    };

    const getCount = () => {
        return count;
    };

    return {
        increment,
        decrement,
        getCount,
    };
})();

const globalConstants = (() => {
    // Define options for my scripts select combobox
    const scriptNames = [
        { link: "non-existing-script.js", external: false },
        { link: "basic-promise-syntax1.js", external: false },
        { link: "basic-promise-syntax2.js", external: false },
        { link: "basic-promise-syntax3.js", external: false },
        { link: "basic-promise-syntax4.js", external: false },
        { link: "image-reload-script.js", external: false },
        { link: "add-and-remove-elements-on-click.js", external: false },
        { link: "add-and-remove-scripts-on-click.js", external: false },
        { link: "utility-functions-consumer.js", external: false },
        {
            link: "add-and-remove-elements-on-click-with-utility.js",
            external: false,
        },
        {
            link: "reuse-promise-for-set-of-given-values-with-promise-allSettled-1.js",
            external: false,
        },
        {
            link: "reuse-promise-for-set-of-given-values-with-promise-allSettled-2.js",
            external: false,
        },
        {
            link: "reuse-promise-for-set-of-given-values-with-runSequentially-with-async-await.js",
            external: false,
        },
        {
            link: "reuse-promise-for-set-of-given-values-with-runSequentially-promiseChain.js",
            external: false,
        },
        { link: "promiseChain-example-1.js", external: false },
        {
            link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-1.js",
            external: false,
        },
        {
            link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-2.js",
            external: false,
        },
        {
            link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-3.js",
            external: false,
        },
        {
            link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-4.js",
            external: false,
        },
        {
            link: "create-a-div-for-given-xml-string.js"
        },
        {
            link: "convert-a-given-xml-string-into-a-json-object.js"
        },
        {
            link: "promise-dot-all-use-case.js"
        },
        {
            link: "promiseChain-example-2.js"
        },
        {
            link: "object-to-a-new-array.js"
        },
        {
            link:"attendance-visualization-v1.js"
        },
        {
            link:"attendance-visualization-v2.js"
        },
        {
            link:"attendance-visualization-v3.js"
        },
        {
            link:'fetch-api-learning/get-all-employees-v1.js'
        },
        {
            link:'fetch-api-learning/get-all-employees-v2-with-console.js'
        },
        {
            link:'fetch-api-learning/get-all-employees-v3-with-console-and-utility.js'
        }
    ];

    const SCRIPTS_OPTIONS = scriptNames.map((v) => ({
        value:
            !v.external || v.external !== true ? `scripts/custom/${v.link}` : v.link,
        label: v.link,
    }));

    return {
        SCRIPTS_OPTIONS,
    };
})();

const globalHelperUtility = (() => {
    // =============== Utility methods ====================================================
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // Unique String generator method
    const generateRandomString = (
        { length, prefix } = { length: 10, prefix: "" }
    ) => {
        let result = prefix ? `${prefix.toUpperCase()}_` : "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // Function to convert the html element to a JSON representation
    const converHtmlElementToJson = (element) => {
        const json = {
            tagName: element?.tagName || "",
            attributes: {},
            innerText: element?.innerText || "",
            styles: {},
        };
        if (!element) {
            return json;
        }

        // Add attributes to the JSON object
        for (let attr of element.attributes) {
            json.attributes[attr.name] = attr.value;
        }

        // Add styles to the JSON object
        for (let style of element.style) {
            json.styles[style] = element.style[style];
        }

        return json;
    };

    return {
        generateRandomString,
        converHtmlElementToJson,
    };
})();

// const elementAdderUtility = (() => {
//     // =============== Utility methods ====================================================
//     const { generateRandomString: generateString } = globalHelperUtility;

//     /**
//      * Apply styles to an HTML element.
//      * @param {HTMLElement} element - The HTML element to style.
//      * @param {Object} styles - A JSON object containing CSS properties and values.
//      */
//     const applyStyles = (element, styles) => {
//         if (!element || !styles) {
//             return;
//         }
//         for (const property in styles) {
//             if (styles.hasOwnProperty(property)) {
//                 element.style[property] = styles[property];
//             }
//         }
//     };

//     // =============== Main logic ====================================================

//     const addElementWithPromise = (
//         { elementType, addToBody, parentElementId, style, innerText, onClick } = {
//             elementType: "",
//             addToBody: false,
//             parentElementId: "",
//             style: {},
//             innerText: "",
//             onClick: () => { }
//         }
//     ) => {
//         return new Promise((resolve, reject) => {
//             let parentElement = null;
//             // console.log(`parentElementId : '${parentElementId}'`);

//             /**
//              * 1. elementType should be from supported elements list.
//              * 2. if 'addToBody' is true, then non-empty value for 'parentElementId' should not be provided
//              * 3. if 'addToBody' is false, then non-empty value for 'parentElementId' should be provided
//              * 4. An existing element must exist for given 'parentElementId'
//              */
//             if (
//                 !elementType ||
//                 !["div", "input", "button", "span"].includes(
//                     elementType.trim().toLowerCase()
//                 )
//             ) {
//                 reject(new Error(`Invalid elementType provided '${elementType}'`));
//                 return;
//             } else if (
//                 addToBody &&
//                 parentElementId &&
//                 parentElementId.trim().length > 0
//             ) {
//                 reject(
//                     new Error(
//                         `[Ambiguous situation]: Both addToBody : '${addToBody}' and parentElementId : '${parentElementId}' {A non-empty value} should not be provided.`
//                     )
//                 );
//                 return;
//             } else if (
//                 !addToBody &&
//                 (!parentElementId || parentElementId.trim().length < 1)
//             ) {
//                 reject(
//                     new Error(
//                         `Unable to create element with addToBody:'${addToBody}' and parentElementId : '${parentElementId}' {An invalid value} is provided simulaneously.`
//                     )
//                 );
//                 return;
//             } else if (!addToBody && parentElementId) {
//                 parentElement = document.getElementById(parentElementId);
//                 // console.log(`parentElementId:${parentElementId}, parentElement:${parentElement}`, elementToJson(parentElement));
//                 if (!parentElement) {
//                     // console.log('Element with ID ' + parentElementId + ' does not exist.');
//                     reject(
//                         new Error(
//                             `Parent Element with ID '${parentElementId}' does not exist.`
//                         )
//                     );
//                     return;
//                 }
//             }

//             let htmlElementToBeCreated = null;
//             const id = generateString({ length: 20, prefix: elementType });
//             switch (elementType.trim().toLowerCase()) {
//                 case "div":
//                     htmlElementToBeCreated = document.createElement(elementType);
//                     htmlElementToBeCreated.id = id;
//                     // htmlElementToBeCreated.style.width = "300px";
//                     // htmlElementToBeCreated.style.height = "300px";
//                     // htmlElementToBeCreated.style.border = "1px solid";
//                     // htmlElementToBeCreated.style.borderLeft = "5px solid blue";
//                     applyStyles(htmlElementToBeCreated, style);
//                     htmlElementToBeCreated.innerText = innerText || id;
//                     addToBody
//                         ? document.body.append(htmlElementToBeCreated)
//                         : parentElement.appendChild(htmlElementToBeCreated);
//                     resolve(htmlElementToBeCreated);
//                     break;
//                 case "input":
//                     htmlElementToBeCreated = document.createElement(elementType);
//                     htmlElementToBeCreated.id = id;
//                     // htmlElementToBeCreated.style.width = "300px";
//                     // htmlElementToBeCreated.style.height = "300px";
//                     // htmlElementToBeCreated.style.border = "1px solid";
//                     // htmlElementToBeCreated.style.borderLeft = "5px solid blue";
//                     applyStyles(htmlElementToBeCreated, style);
//                     htmlElementToBeCreated.placeholder = innerText || id;
//                     addToBody
//                         ? document.body.append(htmlElementToBeCreated)
//                         : parentElement.appendChild(htmlElementToBeCreated);
//                     resolve(htmlElementToBeCreated);
//                     break;

//                 case "button":
//                 case "span":
//                     htmlElementToBeCreated = document.createElement(elementType);
//                     // const id = generateString({ length: 20, prefix: elementType });
//                     htmlElementToBeCreated.id = id;
//                     // htmlElementToBeCreated.style.width = "300px";
//                     // htmlElementToBeCreated.style.height = "300px";
//                     // htmlElementToBeCreated.style.border = "1px solid";
//                     // htmlElementToBeCreated.style.borderLeft = "5px solid blue";
//                     applyStyles(htmlElementToBeCreated, style);
//                     htmlElementToBeCreated.innerText = innerText || id;
//                     htmlElementToBeCreated.addEventListener('click', onClick);
//                     addToBody
//                         ? document.body.append(htmlElementToBeCreated)
//                         : parentElement.appendChild(htmlElementToBeCreated);
//                     resolve(htmlElementToBeCreated);
//                     break;
//                 default:
//                     htmlElementToBeCreated = null;
//                     break;
//             }

//             // if (htmlElementToBeCreated) {
//             //     htmlElementToBeCreated.onload = () => resolve(htmlElementToBeCreated);
//             //     htmlElementToBeCreated.onerror = () => reject(new Error(`Error occured while loading elementType ${elementType}`));
//             //     document.body.append(htmlElementToBeCreated);
//             // } else {
//             //     reject(new Error(`Error occured while loading elementType '${elementType}'`));
//             // }

//             if (!htmlElementToBeCreated) {
//                 reject(
//                     new Error(`Error occured while loading elementType '${elementType}'`)
//                 );
//             }
//         });
//     };

//     return {
//         addElementWithPromise,
//     };
// })();



// console.log("elementAdderUtility script loaded successfully");


const elementAdderUtility = (() => {
    // =============== Utility methods ====================================================
    const { generateRandomString: generateString } = globalHelperUtility;

    /**
     * Default styles for various element types.
     */
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

    /**
     * Apply styles to an HTML element.
     * @param {HTMLElement} element - The HTML element to style.
     * @param {Object} styles - A JSON object containing CSS properties and values.
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
     * Add an HTML element to the DOM with optional styling, innerText, and onClick event.
     * @param {Object} options - Options for creating the HTML element.
     * @param {string} options.elementType - The type of element to create (div, input, button, span).
     * @param {boolean} options.addToBody - If true, append the element to the body.
     * @param {string} [options.parentElementId] - The ID of the parent element to append to if addToBody is false.
     * @param {Object} [options.style] - Custom styles to apply to the element.
     * @param {string} [options.innerText] - Inner text to set for the element.
     * @param {Function} [options.onClick] - Click event handler for the element.
     * @returns {Promise<HTMLElement>} - A promise that resolves with the created element.
     */
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

                    // Apply default styles first
                    applyStyles(htmlElementToBeCreated, defaultStyles[elementType]);

                    // Apply user-provided styles
                    applyStyles(htmlElementToBeCreated, style);

                    if(showInnerText){
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


const promiseUtility = (() => {
    const checkNumWithPromise = (num = 0) => {
        // console.log(`[${new Date()}]: Going to check validity for : ${num}`);
        return new Promise(function (myResolve, myReject) {
            let x = parseInt(num);
            // The producing code (this may take some time)
            setTimeout(() => {
                if (x % 2 === 0) {
                    myResolve(`number ${num} is multiple of 2`);
                } else {
                    myReject(`number ${num} is not multiple of 2`);
                }
            }, (x && x > 0 ? /**x*/ 1 : 1) * 1000);
        });
    };

    return { checkNumWithPromise };
})();

const cssStylesUtility = (() => {
    const styles = {
        div: {
            fontSize: "12px",
            // lineHeight: '400px',
            // textAlign: 'center',
            // backgroundColor: 'lightblue',
            padding: "10px",
            width: "1000px",
            height: "1000px",
            border: "1px solid",
            borderLeft: "5px solid blue",
        },
        input: { backgroundColor: "yellow" },
        button: { backgroundColor: "green" },
        span: { backgroundColor: "pink" },
    };
    return { styles };
})();



const loggerUtility = (() => {
    let registeredElement = null;
    const validConfig = () => {
        if (registeredElement) {
            return true;
        } else {
            // console.warn(
            //     "No valid appender found. Logging utility is not initialized properly. Only console logs will be shown ."
            // );
            return false;
        }
    };
    const registerLoggingConfig = (element, elementId) => {
        if (element) {
            registeredElement = element;
        } else if (elementId) {
            const el = document.getElementById(elementId);
            if (el) {
                registeredElement = el;
            }
        }
    };

    // === creating spans for appropriate log level ==============

    const getStylesForType = (type = 'container') => {

        const baseStyle = {
            color: 'black',
            //padding: '5px',
            margin: '3px',
            borderRadius: '3px',
            whiteSpace: "pre-wrap",
            display: 'block'
        }

        switch (type) {
            case 'error':
            case 'trace':
            case 'debug':
                return {
                    ...baseStyle, color: 'red',
                };
            case 'warn':
                return {
                    ...baseStyle, color: 'black',
                    backgroundColor: 'yellow',
                };
            case 'info':
                return {
                    ...baseStyle, color: 'blue',
                };
            case 'success':
                return {
                    ...baseStyle, color: 'green',
                };
            default:
                return {
                    ...baseStyle,
                };

        }
    };

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

    const createMessageSpan = (type = '', logMessage = '') => {
        const span = document.createElement('span');
        applyStyles(span, getStylesForType(type));
        // span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${text.timestamp}]: ${text.logMessage}`;
        // span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: <pre>${logMessage}</pre>`;
        span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: ${logMessage}`;
        return span;
    };

    // ==== Appending to div
    const appendInnerHtmlToElement = (message, logLevel = "info") => {
        if (!validConfig()) {
            return;
        }
        // registeredElement.innerHTML += some;
        const messageSpan = createMessageSpan(logLevel, message);
        registeredElement.appendChild(messageSpan);
    };

    const resetInnerHtmlToElement = (element, elementId) => {
        if (!validConfig()) {
            return;
        }
        registeredElement.innerHTML = `<b>Logs to be displayed:-</b>`;
    };

    const reset = () => {
        resetInnerHtmlToElement();
    };

    const logToConsole = (message, logLevel = 'info') => {
        if (logLevel && message) {
            switch (logLevel) {
                case "info":
                    console.info(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
                case "warn":
                    console.warn(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
                case "success":
                    console.info(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
                case "error":
                    console.error(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
                case "debug":
                    console.debug(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
                case "trace":
                    console.trace(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
                default:
                    console.warn(`Invalid/Unknown Log Level: '${logLevel}'.`)
                    console.log(
                        `[${logLevel.trim().toUpperCase()}]: [${new Date()}]: ${message}`
                    );
                    break;
            }
        }
    };

    const log = (logLevel = "info", ...message) => {
        if (
            !logLevel ||
            !["info", "warn", "success", "error", "debug", "trace"].includes(
                logLevel.trim().toLowerCase()
            )
        ) {
            console.log(
                `Invalid/Unknown Log Level: '${logLevel}'. Unable to log message.`
            );
            return;
        } else if (!message) {
            console.log(`Invalid Message: '${message}'. Unable to log message.`);
            return;
        }

        logToConsole(message, logLevel);

        appendInnerHtmlToElement(message, logLevel);
    };

    const info = (...message) => log("info", message);
    const warning = (...message) => log("warn", message);
    const success = (...message) => log("success", message);
    const error = (...message) => log("error", message);
    const trace = (...message) => log("trace", message);
    const debug = (...message) => log("debug", message);



    return {
        registerLoggingConfig,
        info,
        warning,
        success,
        error,
        trace,
        debug,
        reset,
    };
})();

const initialConsoleComponentCreatorUtility = (() => {

    // ======== Some helper utilities ===============
    const LOGGER = loggerUtility;
    const { styles } = cssStylesUtility;
    const { addElementWithPromise } = elementAdderUtility;

    const components = [
        {
            elementType: "div",
            addToBody: true,
            style: styles.div,
            name: "Container div"
        },
        {
            elementType: "button",
            addToBody: true,
            style: styles.div,
            innerText: "Restart",
            onClick: () => { },
            name: "button to be added in container div, "
        },
        {
            elementType: "div",
            addToBody: true,
            style: styles.div,
            name: "message logger div"
        }
    ]

    // ======== Main logic =========================
    // ======== Creating Initial controles =====================

    const createInitialComponents = async (successCallback = () => { }, failCallback = () => { }, addButton = false, restartButtonOnClick = () => { }) => {
        let myContainerDivId = null;
        let componentsCreatedSuccesfully = false;

        //=========================
        if (addButton && addButton === true) {
            addElementWithPromise({
                elementType: "button",
                addToBody: true,
                innerText: "Restart",
                onClick: restartButtonOnClick,
                showInnerText:true
            }).then(
                (createdElement) => {
                    LOGGER.info(
                        `${createdElement.tagName} is created successfully with id:'${createdElement.id}'!`
                    );
                },
                (error) => LOGGER.error(`Error: ${error.message}`)
            );
        }

        //===============================
        try {
            const newlyAddedDiv = await addElementWithPromise({
                elementType: "div",
                addToBody: true,
                style: styles.div,
            });
            LOGGER.success(`[Success]: Created div: ${newlyAddedDiv.id}`);
            myContainerDivId = newlyAddedDiv.id;
            LOGGER.registerLoggingConfig(newlyAddedDiv);


            LOGGER.reset();
            LOGGER.success(`Created div: ${myContainerDivId}`);

            componentsCreatedSuccesfully = true;
        } catch (error) {
            LOGGER.error(`[Warning]: Error occured: ${error}`);
            LOGGER.error(`[${new Date()}]: Stopping element creation due to error.`);
        }

        if (componentsCreatedSuccesfully) {

            LOGGER.info(`All intial components created succesully!`);
            successCallback(myContainerDivId)
        } else {

            LOGGER.error(`Stopping as error occured in intial components creation.`);
            failCallback(`Stopping as error occured in intial components creation.`)
        }
    };

    return { createInitialComponents };
})();

console.log("utility-v1.js script loaded successfully");
