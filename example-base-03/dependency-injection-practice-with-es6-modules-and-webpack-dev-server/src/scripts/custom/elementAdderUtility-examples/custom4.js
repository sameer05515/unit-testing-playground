import elementAdderUtility from "../../../js/utils/element-add/elementAdderUtility-v3.js";
import { createConsoleAndRegisterMyId } from "../../../js/lib/utils.js";
import LOGGER from "../../../js/utils/log/loggerUtility.js";
import { createElementsArray } from "../../../modules/util/elementAdderUtility-examples/elementUtility.js";







const myLogic = (() => {
    let createdHTMLElementsIdArray = [];

    const createHTMLElement = (element) => {
        return elementAdderUtility.addElementWithPromise(element)
            .then((createdElement) => {
                createdHTMLElementsIdArray.push(createdElement.id);
                if (element.children && element.children.length > 0) {
                    createdElement.style.display = "flex";
                    createdElement.style.flexDirection = "row";
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
            });
    };

    const createHTMLElementsFromArray = (elementsArray) => {
        createdHTMLElementsIdArray = [];
        const elementPromises = elementsArray.map((elm) => createHTMLElement(elm));
        
        Promise.all(elementPromises)
            .catch((error) => {
                LOGGER.info(error.message);
            })
            .finally(() => {
                LOGGER.info(
                    `Finished calculation for given set of array: ${JSON.stringify(
                        createdHTMLElementsIdArray,
                        null,
                        2
                    )}`
                );
                LOGGER.success(`Total elements created:- ${createdHTMLElementsIdArray.length}`)
            });
    };

    return { createHTMLElementsFromArray };
})();

const childrenCreator = (() => {
    const createChildren = (providedChildArray = [], parentElementId) => {
        let parentElm = createElementsArray(providedChildArray.length, false, parentElementId);
        parentElm = parentElm.map((elm, index) => ({
            ...elm,
            children: createElementsArray(providedChildArray[index] || 0, false)
        }));
        return parentElm;
    };

    return { createChildren };
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
        const arr = createChildren([2, 2], "premendra-kumar");
        //LOGGER.info("createChildren: ", JSON.stringify(arr, null, 2));
        createHTMLElementsFromArray(arr);
    }
);
document.body.appendChild(myContainerDiv);
