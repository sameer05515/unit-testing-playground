import elementAdderUtility from "../../utils/element-add/elementAdderUtility-v2.js";
import { createConsoleAndRegisterMyId } from "../../lib/utils.js";
import LOGGER from "../../utils/log/loggerUtility.js";

const colorUtility = (() => {
    const colors = [
        "Red",
        "Green",
        "Blue",
        "Yellow",
        "Orange",
        "Purple",
        "Pink",
        "Brown",
        "Cyan",
        "Magenta",
    ];

    /**
     * Get a random color from the predefined colors array.
     * @returns {string} A random color.
     */
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return {
        getRandomColor,
    };
})();

const arrayUtility = (() => {
    /**
     * Create an array of numbers from 1 to the specified length.
     * @param {number} number - The length of the array.
     * @returns {number[]} Array of numbers from 1 to the specified length.
     */
    const createNumbersArray = (number) =>
        Array.from({ length: number }, (_, index) => index + 1);

    return {
        createNumbersArray,
    };
})();

const elementUtility = (() => {
    /**
     * Create an array of elements with random background colors.
     * @param {number} numberOfElements - Number of elements to create.
     * @param {boolean} addToBody - Flag indicating whether to add the elements to the body.
     * @returns {Object[]} Array of element objects.
     */
    const createElementsArray = (
        numberOfElements,
        addToBody = false,
        parentElementId = ""
    ) =>
        arrayUtility.createNumbersArray(numberOfElements).map((n) => ({
            elementType: "div",
            addToBody: false,
            parentElementId: parentElementId,
            style: { margin:'5px',padding:'5px',height: "100px", backgroundColor: colorUtility.getRandomColor() },
        }));

    return {
        createElementsArray,
    };
})();

const myLogic = (() => {
    let promiseChain = Promise.resolve();
    let createdHTMLElementsIdArray = [];

    /**
     * Create an HTML element and its children recursively.
     * @param {Object} element - The element object to create.
     * @returns {Promise<void>}
     */
    const createHTMLElement = (element) => {
        promiseChain = promiseChain.then(() =>
            elementAdderUtility
                .addElementWithPromise(element)
                .then((createdElement) => {
                    createdHTMLElementsIdArray.push(createdElement.id);
                    if (element.children && element.children.length > 0) {
                        createdElement.style.display = "flex";
                        createdElement.style.flexDirection = "row";
                        // createdElement.style.gap = "10px";

                        const childPromises = element.children.map((child, index) => {
                            child.parentElementId = createdElement.id;
                            child.addToBody = false;
                            child.innerText = `${index + 1}th Child of ${createdElement.id}`;
                            child.style = { ...child.style, flex: 1 };
                            return createHTMLElement(child);
                        });
                        return Promise.all(childPromises);
                    }
                })
                .catch((error) => {
                    LOGGER.error("Error creating element:", error);
                })
        );
    };

    /**
     * Create HTML elements from the provided array of element objects.
     * @param {Object[]} elementsArray - Array of element objects.
     */
    const createHTMLElementsFromArray = (elementsArray) => {
        createdHTMLElementsIdArray=[];
        promiseChain = Promise.resolve();

        elementsArray.forEach((elm) => createHTMLElement(elm));

        promiseChain
            .catch((error) => {
                LOGGER.info(error.message);
            })
            .finally(() => {
                LOGGER.info(
                    `[${new Date()}]: Finished calculation for given set of array: ${JSON.stringify(
                        createdHTMLElementsIdArray,
                        null,
                        2
                    )}`
                );
            });
    };

    return {
        createHTMLElementsFromArray,
    };
})();

const childrenCreator = (() => {
    /**
     * Create a nested structure of elements with children.
     * @param {number[]} providedChildArray - Array representing the number of children at each level.
     * @returns {Object[]} Array of parent element objects with children.
     */
    const createChildren = (providedChildArray = [1, 2], parentElementId) => {
        let parentElm = elementUtility.createElementsArray(
            providedChildArray.length,
            false,
            parentElementId
        );
        parentElm = parentElm.map((elm, index) => ({
            ...elm,
            children: elementUtility.createElementsArray(
                providedChildArray[index] || 0,
                false
            ),
        }));
        return parentElm;
    };

    return {
        createChildren,
    };
})();

export { myLogic, childrenCreator };

const { createHTMLElementsFromArray } = myLogic;
const { createChildren } = childrenCreator;

const myContainerDiv = document.createElement("div");
myContainerDiv.id = "premendra-kumar";
myContainerDiv.style.padding = "10px";

createConsoleAndRegisterMyId(
    (successResponse) => {
        console.clear();
        const createdElementDiv = document.getElementById(
            successResponse.consoleDivId
        );
        createdElementDiv.style.width = "95%";
        LOGGER.info("[Success]: ", JSON.stringify(successResponse));
        //reshuffle();
    },
    (errorMessage) => {
        LOGGER.error("[Fail]: ", errorMessage);
    },
    (LOGGERR) => {
        LOGGER.reset();
        LOGGER.info(
            "Console cleared.===================================================="
        );
        myContainerDiv.replaceChildren();
        const arr = createChildren([2, 3], "premendra-kumar");
        //LOGGER.info("createChildren: ", JSON.stringify(arr, null, 2));
        createHTMLElementsFromArray(arr);
    }
);
document.body.appendChild(myContainerDiv);
