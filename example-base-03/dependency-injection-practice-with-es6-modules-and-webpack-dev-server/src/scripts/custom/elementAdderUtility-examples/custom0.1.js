import { createConsoleAndRegisterMyId } from "../../../js/lib/utils.js";
import elementAdderUtility from "../../../js/utils/element-add/elementAdderUtility.js";
import LOGGER from "../../../js/utils/log/loggerUtility.js";
import { createElementsArray } from "../../../modules/util/elementAdderUtility-examples/elementUtility.js";


const createChildren = (providedChildArray = [1, 2]) => {
    let parentElm = createElementsArray(providedChildArray.length, true);
    parentElm = parentElm.map((elm, index) => ({
        ...elm,
        children: createElementsArray(providedChildArray[index] || 0, false),
    }));
    return parentElm;
};

let promiseChain = Promise.resolve();
const createdHTMLElementsIdArray = [];

const createHTMLElement = (element) => {
    promiseChain = promiseChain.then(() =>
        elementAdderUtility
            .addElementWithPromise(element)
            .then((createdElement) => {
                createdHTMLElementsIdArray.push(createdElement.id);
                if (element.children && element.children.length > 0) {
                    createdElement.style.display = "flex";
                    createdElement.style.flexDirection = "row";
                    createdElement.style.gap = "10px";

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

const createHTMLElementsFromArray = (elementsArray) => {
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

createConsoleAndRegisterMyId(
    (successResponse) => {
        console.clear();
        LOGGER.info("[Success]: ", JSON.stringify(successResponse));
    },
    (errorMessage) => {
        LOGGER.error("[Fail]: ", errorMessage);
    },
    () => {
        // LOGGER.reset();
        LOGGER.info(
            "Console cleared.===================================================="
        );
        const arr = createChildren([2, 3, 2, 3, 1, 2]);
        LOGGER.info("createChildren: ", arr.length || 0);
        createHTMLElementsFromArray(arr);
    }
);
