import { createConsoleAndRegisterMyId } from '../../lib/utils.js';
import LOGGER from "../../utils/log/loggerUtility.js";


// const myLogic = (() => {

//     const depthArr = [1, 2, 5, 1];

//     function getRandomNonZeroNumber() {
//         return Math.floor(Math.random() * 3) + 1;
//     }

//     const createNumbersArray = (number) => {
//         const numbers = Array.from({ length: number }, (_, index) => index + 1);
//         return numbers;
//     }

//     const prepareElement = (num, depth = 0, prefix = '') => ({
//         id: `id_${prefix}_${num}`,
//         val: `${prefix ? prefix+'.' : ''}${num}`,
//         children: depth > 0 ? createNumbersArray(getRandomNonZeroNumber()).map(
//             (subNum) => prepareElement(subNum, --depth, num)
//         ) : []
//     });

//     const prepareArray = (depthArr = []) => {
//         if (depthArr && depthArr.length > 0) {
//             return createNumbersArray(depthArr.length).map(
//                 (num, index) => prepareElement(num, depthArr[index])
//             )
//         }
//     }



//     const execute = () => {
//         LOGGER.reset();
//         LOGGER.info(`I am execute groot!!`,);
//         LOGGER.info(JSON.stringify(prepareArray(depthArr), null, 2));
//     }
//     return {
//         execute
//     }
// })();


const myLogic = (() => {
    const depthArr = [1, 2, 2, 1];

    const getRandomNonZeroNumber = () => Math.floor(Math.random() * 3) + 1;

    const createNumbersArray = (number) => Array.from({ length: number }, (_, index) => index + 1);

    const prepareElement = (num, depth = 0, prefix = '') => ({
        id: `id_${prefix}_${num}`,
        val: `${prefix ? prefix + '.' : ''}${num}`,
        children: depth > 0 ? createNumbersArray(getRandomNonZeroNumber()).map(
            (subNum) => prepareElement(subNum, depth - 1, `${prefix}${prefix ? '.' : ''}${num}`)
        ) : []
    });

    const prepareArray = (depthArr = []) => depthArr.length ? createNumbersArray(depthArr.length).map(
        (num, index) => prepareElement(num, depthArr[index])
    ) : [];

    const execute = () => {
        LOGGER.reset();
        LOGGER.info('I am execute groot!!');
        const array = prepareArray(depthArr);
        LOGGER.info(JSON.stringify(array, null, 2));
        return array;
    };

    return { execute };
})();

// const renderLogic = (() => {
//     const createList = (element) => {
//         const li = document.createElement('li');
//         li.innerText = element.val;

//         if (element.children.length > 0) {
//             const ul = document.createElement('ul');
//             element.children.forEach(child => {
//                 ul.appendChild(createList(child));
//             });
//             li.appendChild(ul);
//         }

//         return li;
//     };

//     const createDivWithList = (array) => {
//         const div = document.createElement('div');
//         const ul = document.createElement('ul');

//         array.forEach(element => {
//             ul.appendChild(createList(element));
//         });

//         div.appendChild(ul);
//         return div;
//     };

//     const render = (array) => {
//         const outputDiv = createDivWithList(array);
//         document.body.appendChild(outputDiv);
//     };

//     return { render };
// })();

const renderLogic = (() => {
    let previousOutputDiv = null;

    const createList = (element) => {
        const li = document.createElement('li');
        li.innerText = element.val;
        li.style.margin = '5px 0';
        li.style.padding = '5px';
        li.style.border = '1px solid #ccc';
        li.style.borderRadius = '4px';

        if (element.children.length > 0) {
            const ul = document.createElement('ul');
            // ul.style.listStyleType = 'circle';
            ul.style.paddingLeft = '20px';
            ul.style.listStyleType='none';
            element.children.forEach(child => {
                ul.appendChild(createList(child));
            });
            li.appendChild(ul);
        }

        return li;
    };

    const createDivWithList = (array) => {
        const div = document.createElement('div');
        div.id = 'outputDiv'; // Set an ID for easy reference
        div.style.marginTop = '20px';

        const ul = document.createElement('ul');
        ul.style.padding = '10px';
        ul.style.border = '1px solid #000';
        ul.style.borderRadius = '5px';
        ul.style.backgroundColor = '#f9f9f9';
        ul.style.listStyleType='none';

        array.forEach(element => {
            ul.appendChild(createList(element));
        });

        div.appendChild(ul);
        return div;
    };

    const render = (array) => {
        const outputDiv = createDivWithList(array);

        if (previousOutputDiv) {
            document.body.replaceChild(outputDiv, previousOutputDiv);
        } else {
            document.body.appendChild(outputDiv);
        }

        previousOutputDiv = outputDiv;
    };

    return { render };
})();


createConsoleAndRegisterMyId(
    (successResponse) => {
        console.clear();
        //LOGGER = successResponse.LOGGER;
        //consoleDivId = successResponse.consoleDivId;

        LOGGER.info("[Success]: ", JSON.stringify(successResponse));

        //reshuffle();
    },
    (errorMessage) => {
        LOGGER.error("[Fail]: ", errorMessage);
    },
    (LOGGERR) => {
        // LOGGER.reset();
        LOGGER.info('Console cleared.====================================================');
        const array = myLogic.execute();
        renderLogic.render(array);
        // myLogic.execute();
    }
);