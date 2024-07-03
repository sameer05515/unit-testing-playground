

(function () {
    console.log('Initialization code runs');
    // Initialization code here
    // =============== Utility methods ====================================================
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const generateString = (length = 10) => {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };

    // Function to convert the element to a JSON representation
    function elementToJson(element) {
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
    }

    // =============== Main logic ====================================================

    const addDiv = () => {
        let div = document.createElement("div");
        const id = generateString();
        div.id = id;
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.border = "1px solid";
        div.style.borderLeft = "5px solid blue";
        document.body.append(div);
        return id;
    };

    const addElementWithPromise = ({
        elementType = "",
        addToBody = false,
        parentElementId = "",
    }) => {
        return new Promise((resolve, reject) => {
            let parentElement = null;
            // console.log(`parentElementId : '${parentElementId}'`);

            /**
             * 1. elementType should be from supported elements list.
             * 2. if 'addToBody' is false, then non-empty value for 'parentElementId' should be provided
             * 3.
             * 3. An existing element must exist for given 'parentElementId'
             */
            if (
                !elementType ||
                !["div", "input"].includes(elementType.trim().toLowerCase())
            ) {
                reject(new Error(`Invalid elementType provided '${elementType}'`));
                return;
            }
            // else if(!addToBody){
            //     reject(new Error(`Unable to create element as addToBody is provided as '${addToBody}'. Currently we only support to add elements in body.`));
            //     return;
            // }
            else if (
                !addToBody &&
                (!parentElementId || parentElementId.trim().length < 1)
            ) {
                reject(
                    new Error(
                        `Unable to create element with addToBody:'${addToBody}' and parentElementId : '${parentElementId}' {An invalid value} is provided simulaneously.`
                    )
                );
                return;
            } else if (!addToBody && parentElementId) {
                parentElement = document.getElementById(parentElementId);
                // console.log(`parentElementId:${parentElementId}, parentElement:${parentElement}`, elementToJson(parentElement));
                if (!parentElement) {
                    // console.log('Element with ID ' + parentElementId + ' does not exist.');
                    reject(
                        new Error(
                            `Parent Element with ID '${parentElementId}' does not exist.`
                        )
                    );
                    return;
                }
            }

            let htmlElementToBeCreated = null;
            switch (elementType.trim().toLowerCase()) {
                case "div":
                case "input":
                    htmlElementToBeCreated = document.createElement(elementType);
                    const id = generateString();
                    htmlElementToBeCreated.id = id;
                    htmlElementToBeCreated.style.width = "300px";
                    htmlElementToBeCreated.style.height = "300px";
                    htmlElementToBeCreated.style.border = "1px solid";
                    htmlElementToBeCreated.style.borderLeft = "5px solid blue";
                    addToBody
                        ? document.body.append(htmlElementToBeCreated)
                        : parentElement.appendChild(htmlElementToBeCreated);
                    resolve(htmlElementToBeCreated);
                    break;
                default:
                    htmlElementToBeCreated = null;
                    break;
            }

            // if (htmlElementToBeCreated) {
            //     htmlElementToBeCreated.onload = () => resolve(htmlElementToBeCreated);
            //     htmlElementToBeCreated.onerror = () => reject(new Error(`Error occured while loading elementType ${elementType}`));
            //     document.body.append(htmlElementToBeCreated);
            // } else {
            //     reject(new Error(`Error occured while loading elementType '${elementType}'`));
            // }

            if (!htmlElementToBeCreated) {
                reject(
                    new Error(`Error occured while loading elementType '${elementType}'`)
                );
            }
        });
    };

    // =============== Creating controles ====================================================

    const customComponentsIdList = [];
    const addElementButtonEl = document.createElement("button");
    addElementButtonEl.innerText = "Add an element";
    addElementButtonEl.onclick = function () {
        // const result = addDiv();
        // console.log(result);
        //   console.log(`[${new Date()}]: Add div button clicked.`);

        addElementWithPromise({
            elementType: "input",
            addToBody: false,
            parentElementId: "custom-components-container-div-id",
        }).then(
            (createdElement) => {
                console.log(
                    `${createdElement.tagName} is created successfully with id:'${createdElement.id}'!`,
                    elementToJson(createdElement)
                );
                customComponentsIdList.push(createdElement.id);
                updateButtonVisibility();
            },
            (error) => console.log(`Error: ${error.message}`)
        );
    };

    const removeElementButtonEl = document.createElement("button");
    removeElementButtonEl.innerText = "Remove last added element";
    // Style the button initially (hidden)
    removeElementButtonEl.style.display = 'none';
    removeElementButtonEl.onclick = function () {
        const lastElementId = customComponentsIdList.pop(); // Remove the last element ID from the array
        if (lastElementId) {
            const element = document.getElementById(lastElementId);
            if (element) {
                element.parentElement.removeChild(element);
                console.log(`Element with ID ${lastElementId} has been removed.`);
                updateButtonVisibility();
            } else {
                console.log(`Element with ID ${lastElementId} does not exist in the DOM.`);
            }
        } else {
            console.log('No elements in customComponentsIdList to remove.');
        }
    }

    // Function to update the button visibility based on the array length
    function updateButtonVisibility() {
        if (customComponentsIdList.length > 0) {
            removeElementButtonEl.style.display = 'inline-block';
        } else {
            removeElementButtonEl.style.display = 'none';
        }
    }

    const customComponentsContainerDiv = document.createElement("div");
    customComponentsContainerDiv.id = "custom-components-container-div-id";
    customComponentsContainerDiv.style.width = "1000px";
    customComponentsContainerDiv.style.height = "1000px";
    customComponentsContainerDiv.style.border = "1px solid";
    customComponentsContainerDiv.style.borderLeft = "5px solid green";

    document.body.appendChild(addElementButtonEl);
    document.body.appendChild(removeElementButtonEl);
    document.body.appendChild(customComponentsContainerDiv);
})();