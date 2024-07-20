// main.js
import LOGGER from "../utils/log/loggerUtility.js";
import globalConstants from "../utils/global/globalConstants.js";

(() => {
    //===================== utility functions ====================
    const isValidSelectedScript = (selectedScript) => {
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
    myMainDiv.id = 'mathru-ki-bijli-ka-hindola';
    const myH1 = document.createElement("div");

    const selectedPersonDiv = document.createElement("div");

    myH1.innerHTML = `
<h1>Check the console for output- Premendra Kumar</h1>
<h1>
    Select Component Example
</h1>
<span style="display: block; white-space: pre;">
    In this componnt, we have created a combo, on change of this, we are executing functions defined in passed self-executing finctions

</span>`;

    const select = document.createElement("select");
    select.id = "mySelect";

    const functioOptions = globalConstants.SCRIPTS_OPTIONS;

    // console.log('functioOptions: ', JSON.stringify(functioOptions, null, 2));

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
        clearExtraComponents();
        const selectedOption = event.target.options[event.target.selectedIndex];


        const selectedFunctionIndex = selectedOption.value;
        selectedScript = functioOptions[selectedFunctionIndex].value;
        // selectedPersonDiv.innerHTML = `Selected: <strong>${selectedOption.text}</strong> (${selectedScript})`;
        // console.clear();
        LOGGER.info("[OPTION SELECTED]", selectedScript);

        loadScript(selectedScript).then(
            (script) => {
                // console.log(`${script.src} is loaded!`);
                //   displayDiv.innerText = `Selected: ${selectedScript},\nStatus: ${script.src} is loaded successfully!!`;
                selectedPersonDiv.innerHTML = `Selected: <strong>${selectedScript}</strong> Status: <span style="color: green;"><strong>${script.src} is loaded successfully!!</strong></span>`;
            },
            (error) => {
                // console.log(`Error: ${error.message}`);
                //   displayDiv.innerText = `Selected: ${selectedScript},\n Status: Error: ${error.message}`;
                selectedPersonDiv.innerHTML = `Selected: <strong>${selectedScript}</strong> Status: <span style="color: red;"><strong>Error: ${error.message}</strong></span>`;
            }
        );
        // if(isValidSelectedScript){
        //     selectedScript.execute(LOGGER);
        // }

    };

    select.addEventListener("change", handleSelectOptionsChange);

    myMainDiv.appendChild(myH1);
    myMainDiv.appendChild(select);
    myMainDiv.appendChild(selectedPersonDiv);
    document.body.appendChild(myMainDiv);

    // Function to load a script
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement("script");
            script.src = src;
            script.type = 'module';
            script.onload = () => resolve(script);
            script.onerror = () =>
                reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
        });
    }

    // Function to clear extra components
    function clearExtraComponents() {
        const bodyElements = document.body.children;
        for (let i = bodyElements.length - 1; i >= 0; i--) {
            const element = bodyElements[i];
            if (element === myMainDiv) {
                continue;
            } else {
                document.body.removeChild(element);
            }
        }

        const headElements = document.head.children;
        for (let i = headElements.length - 1; i >= 0; i--) {
            const element = headElements[i];
            if (
                (element.tagName.toLowerCase() !== "script" &&
                    element.tagName.toLowerCase() !== "style") ||
                (element.tagName.toLowerCase() === "script" &&
                    (element.id === "mybase-script" || element.id === "utility-script"))
            ) {
                continue;
            } else {
                document.head.removeChild(element);
            }
        }
    }

    // const logMessage = () => {
    //     LOGGER.reset();
    //     LOGGER.success("Premendra Kumar");
    //     LOGGER.info(JSON.stringify(new Rectangle(20, 30)));
    //     if (
    //         isValidSelectedScript(selectedScript)
    //     ) {
    //         LOGGER.info(
    //             `[typeof selectedScript]: ${typeof selectedScript}, [typeof selectedScript.execute]: ${typeof selectedScript.execute} `
    //         );
    //         selectedScript.execute(LOGGER);
    //     }
    // };

    // // ======================================

    // initialConsoleComponentCreatorUtility.createInitialComponents(
    //     (myContainerDivId) => {
    //         LOGGER.registerLoggingConfig(null, myContainerDivId);
    //         LOGGER.success(`[Success]: myContainerDivId: ${myContainerDivId}`);
    //         LOGGER.info(
    //             "I am from v2. We will learn javascript classes in this version"
    //         );
    //     },
    //     (errorMessage) => console.log(`[Fail]: ${errorMessage}`),
    //     true,
    //     logMessage
    // );
})()
