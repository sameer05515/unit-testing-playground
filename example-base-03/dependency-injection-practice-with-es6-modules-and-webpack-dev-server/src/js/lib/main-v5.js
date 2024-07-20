// main.js
import LOGGER from "../utils/log/loggerUtility.js";
import globalConstants from "../utils/global/globalConstants.js";

(() => {
    //===================== Utility Functions ====================

    const isValidSelectedScript = (selectedScript) =>
        selectedScript &&
        typeof selectedScript === "object" &&
        !Array.isArray(selectedScript) &&
        typeof selectedScript.execute === "function";

    // Function to create an element with attributes
    const createElement = (tag, attributes = {}, innerHTML = '') => {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
        element.innerHTML = innerHTML;
        return element;
    };

    // Function to load a script
    const loadScript = (src) =>
        new Promise((resolve, reject) => {
            const script = createElement('script', { src, type: 'module' });
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
        });

    // Function to clear extra components
    const clearExtraComponents = () => {
        [...document.body.children].forEach(child => {
            if (
                child === myMainDiv ||
                ["meri-tag-line-wali-id-DO-NOT-DELETE"].includes(child.id)
            ){
                console.log('skipping to delete preserved elements')
                return;
            }
            
            document.body.removeChild(child);
        });
        [...document.head.children].forEach(child => {
            if (!['script', 'style'].includes(child.tagName.toLowerCase()) ||
                ['mybase-script', 'utility-script', 'd3-script'].includes(child.id)) return;
            document.head.removeChild(child);
        });
    };

    //===================== Main Script ====================

    const myMainDiv = createElement('div', { id: 'mathru-ki-bijli-ka-hindola' });
    const myH1 = createElement('div', {}, `
        <h1>Check the console for output - Premendra Kumar</h1>
        <h1>Select Component Example</h1>
        <span style="display: block; white-space: pre;">
            In this component, we have created a combo; on change of this, we are executing functions defined in passed self-executing functions
        </span>
    `);
    const selectedPersonDiv = createElement('div');

    const select = createElement('select', { id: "mySelect" });
    const defaultOption = createElement('option', { disabled: true, selected: true }, "Select Option");
    select.appendChild(defaultOption);

    globalConstants.SCRIPTS_OPTIONS.forEach((optionData, index) => {
        const option = createElement('option', { value: index }, optionData.label);
        select.appendChild(option);
    });

    let selectedScript = null;

    const handleSelectOptionsChange = (event) => {
        clearExtraComponents();
        const selectedOption = event.target.options[event.target.selectedIndex];
        selectedScript = globalConstants.SCRIPTS_OPTIONS[selectedOption.value].value;
        LOGGER.info("[OPTION SELECTED]", selectedScript);

        loadScript(selectedScript)
            .then((script) => {
                selectedPersonDiv.innerHTML = `Selected: <strong>${selectedScript}</strong> Status: <span style="color: green;"><strong>${script.src} is loaded successfully!!</strong></span>`;
            })
            .catch((error) => {
                selectedPersonDiv.innerHTML = `Selected: <strong>${selectedScript}</strong> Status: <span style="color: red;"><strong>Error: ${error.message}</strong></span>`;
            });
    };

    select.addEventListener("change", handleSelectOptionsChange);

    myMainDiv.append(myH1, select, selectedPersonDiv);
    document.body.appendChild(myMainDiv);
})();
