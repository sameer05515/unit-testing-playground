import { createNumbersArray } from "./arrayUtility";
import { getRandomColor } from "./colorUtility";

const createElementsArray = (numberOfElements, addToBody = false, parentElementId = "") =>
    createNumbersArray(numberOfElements).map(() => ({
        elementType: "div",
        addToBody: addToBody,
        parentElementId,
        style: {
            margin: '5px',
            padding: '5px',
            minHeight: "100px",
            backgroundColor: getRandomColor()
        }
    }));

export { createElementsArray };