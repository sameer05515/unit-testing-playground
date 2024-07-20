(function () {
    console.log("Initialization code runs");
    // Initialization code here
    // =============== Utility methods ====================================================
    const { converHtmlElementToJson: elementToJson } = globalHelperUtility;

    const { addElementWithPromise } = elementAdderUtility;

    // =============== Creating controles ====================================================

    const customComponentsIdList = [];
    const elementNames = ["div", "input", "button", "span"];
    let currentIndex = 0;

    // htmlElementToBeCreated.style.width = "300px";
    // htmlElementToBeCreated.style.height = "300px";
    // htmlElementToBeCreated.style.border = "1px solid";
    // htmlElementToBeCreated.style.borderLeft = "5px solid blue";

    const styles = {
        div: {
            fontSize: '20px',
            // lineHeight: '400px',
            // textAlign: 'center',
            backgroundColor: 'lightblue',
            padding: '10px',
            width: "100px",
            height: "100px",
            border: "1px solid",
            borderLeft: "5px solid blue"
        },
        input:{backgroundColor: 'yellow',},
        button:{backgroundColor: 'green',},
        span:{backgroundColor: 'pink',},
    };

    // Function to update the button visibility based on the array length
    const updateButtonVisibility = () => {
        if (customComponentsIdList.length > 0) {
            removeElementButtonEl.style.display = "inline-block";
        } else {
            removeElementButtonEl.style.display = "none";
        }
    };

    const addCustomElement = (elementType, addToBody, parentElementId, style) => {
        let newlyCreatedElementId = null;
        let newlyCreatedElementType = null;
        addElementWithPromise({
            elementType,
            addToBody,
            parentElementId,
            style
        }).then(
            (createdElement) => {
                console.log(
                    `${createdElement.tagName} is created successfully with id:'${createdElement.id}'!`,
                    elementToJson(createdElement)
                );
                newlyCreatedElementId = createdElement.id;
                newlyCreatedElementType = createdElement.tagName;
                console.log(
                    `newlyCreatedElementId: '${newlyCreatedElementId}', newlyCreatedElementType: '${newlyCreatedElementType}', `
                );
                if (newlyCreatedElementId) {
                    customComponentsIdList.push(newlyCreatedElementId);
                    updateButtonVisibility();
                }
            },
            (error) => console.log(`Error: ${error.message}`)
        );

        //return { newlyCreatedElementId, newlyCreatedElementType };
    };

    const removeLastAddedCustomElement = () => {
        const lastElementId = customComponentsIdList.pop(); // Remove the last element ID from the array
        if (lastElementId) {
            const element = document.getElementById(lastElementId);
            if (element) {
                element.parentElement.removeChild(element);
                console.log(`Element with ID ${lastElementId} has been removed.`);
                updateButtonVisibility();
            } else {
                console.log(
                    `Element with ID ${lastElementId} does not exist in the DOM.`
                );
            }
        } else {
            console.log("No elements in customComponentsIdList to remove.");
        }
    };

    const addElementButtonEl = document.createElement("button");
    addElementButtonEl.innerText = "Add an element";
    addElementButtonEl.onclick = () =>
        {
            const elementName=elementNames[
                (currentIndex++ + elementNames.length) % elementNames.length
                ];
            addCustomElement(
                elementName,
            false,
            "custom-components-container-div-id",
            styles[elementName]
        )};

    const removeElementButtonEl = document.createElement("button");
    removeElementButtonEl.innerText = "Remove last added element";
    // Style the button initially (hidden)
    removeElementButtonEl.style.display = "none";
    removeElementButtonEl.onclick = () => removeLastAddedCustomElement();

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
