// main.js
import { initialConsoleComponentCreatorUtility } from "../utils/initial-console-component/initialConsoleComponentCreatorUtility.js";
import LOGGER from "../utils/log/loggerUtility.js";
import {
    Rectangle,
    RectangleAnonymous,
    RectangleFromAnotherName,
} from "../lessons/classes/01-shapes.js";
import elementAdderUtility from "../utils/element-add/elementAdderUtility.js";

//===================== utility functions ====================
const isValidSelectedScript=(selectedScript)=>{
    return selectedScript &&
    typeof selectedScript === "object" &&
    !Array.isArray(selectedScript) &&
    selectedScript.execute &&
    typeof selectedScript.execute === "function";
}

// 1. create a main div
// 2. add 1 h1, having title like "Class testing"
// 3. add 1 select
// 4. Select should have options of {functionName:"Name of function to be executed on click", functionReference: "reference of earlier mentioned function"}
const myMainDiv = document.createElement("div");
const myH1 = document.createElement("div");

const selectedPersonDiv = document.createElement("div");

myH1.innerHTML = `<h1>
    Select Component Example
</h1>
<span style="display: block; white-space: pre;">
    In this componnt, we have created a combo, on change of this, we are executing functions defined in passed self-executing finctions

</span>`;

const select = document.createElement("select");
select.id = "mySelect";

const functioOptions = [
    {
        value: (() => {
            const execute = (LOGGERR) =>
                LOGGERR.info("[From Execute with Love][with injected LOGGER]: I am your first function");
            return { execute };
        })(),
        label: "My First function",
    },
    {
        value: (() => {
            const execute = (LOGGERR) =>
                LOGGERR.info("[From Execute with Love][with injected LOGGER]: I am your second function");
            return { execute };
        })(),
        label: "My Second function",
    },
    {
        value: (() => {
            const execute = (LOGGERR) =>
                LOGGERR.error(
                    "[From Execute with Love][with injected LOGGER]: I am your Third function"
                );
            return { execute };
        })(),
        label: "My Third function",
    },
    {
        value: {
            execute: (LOGGERR) =>
                LOGGERR.error(
                    "[From Execute with Love][with injected LOGGER]: I am your Fourth function"
                )
        },
        label: "My Fourth function from object",
    },
];

// Create a default disabled option
const defaultOption = document.createElement("option");
defaultOption.disabled = true;
defaultOption.selected = true;
defaultOption.innerText = "Select Option";
select.appendChild(defaultOption);

// Add options to the select element
functioOptions.forEach((optionData, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = optionData.label;
    select.appendChild(option);
});

let selectedScript = null;

const handleSelectOptionsChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];

    selectedPersonDiv.innerHTML = `Selected: <strong>${selectedOption.text}</strong> (${selectedOption.value})`;
    const selectedFunctionIndex = selectedOption.value;
    selectedScript = functioOptions[selectedFunctionIndex].value;
    console.clear();
    LOGGER.info("[OPTION SELECTED]", selectedScript, typeof selectedScript);
    if(isValidSelectedScript){
        selectedScript.execute(LOGGER);
    }
    
};

select.addEventListener("change", handleSelectOptionsChange);

myMainDiv.appendChild(myH1);
myMainDiv.appendChild(select);
myMainDiv.appendChild(selectedPersonDiv);
document.body.appendChild(myMainDiv);

const logMessage = () => {
    LOGGER.reset();
    LOGGER.success("Premendra Kumar");
    LOGGER.info(JSON.stringify(new Rectangle(20, 30)));
    if (
        isValidSelectedScript(selectedScript)
    ) {
        LOGGER.info(
            `[typeof selectedScript]: ${typeof selectedScript}, [typeof selectedScript.execute]: ${typeof selectedScript.execute} `
        );
        selectedScript.execute(LOGGER);
    }
};

// ======================================

initialConsoleComponentCreatorUtility.createInitialComponents(
    (myContainerDivId) => {
        LOGGER.registerLoggingConfig(null, myContainerDivId);
        LOGGER.success(`[Success]: myContainerDivId: ${myContainerDivId}`);
        LOGGER.info(
            "I am from v2. We will learn javascript classes in this version"
        );
    },
    (errorMessage) => console.log(`[Fail]: ${errorMessage}`),
    true,
    logMessage
);
