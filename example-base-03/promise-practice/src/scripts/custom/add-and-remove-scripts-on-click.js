

(function () {
    console.log('Initialization code runs');

    const customComponentsIdList = [];

    // Create the add and remove buttons
    const addScriptButtonEl = document.createElement("button");
    addScriptButtonEl.textContent = "Add Script";
    document.body.appendChild(addScriptButtonEl);

    const removeElementButtonEl = document.createElement("button");
    removeElementButtonEl.textContent = "Remove Last Script";
    document.body.appendChild(removeElementButtonEl);

    // Style the remove button initially (hidden)
    removeElementButtonEl.style.display = 'none';

    // Function to add a new script
    function addScript() {
        const scriptId = `script-${customComponentsIdList.length + 1}`;
        const script = document.createElement('script');
        script.src = 'scripts/custom/image-reload-script.js'; // Replace with actual script URL
        script.id = scriptId;
        script.onload = () => console.log(`${script.src} is loaded!`);
        script.onerror = () => console.log(`Error: ${`Script load error for ${script.src}`}`)
        document.body.appendChild(script);
        customComponentsIdList.push(scriptId);
        console.log(`Script with ID ${scriptId} added.`);
        updateButtonVisibility();
    }

    // Function to remove the last added script
    function removeLastScript() {
        const lastScriptId = customComponentsIdList.pop(); // Remove the last script ID from the array
        if (lastScriptId) {
            const script = document.getElementById(lastScriptId);
            if (script) {
                script.parentElement.removeChild(script);
                console.log(`Script with ID ${lastScriptId} has been removed.`);
            } else {
                console.log(`Script with ID ${lastScriptId} does not exist in the DOM.`);
            }
        } else {
            console.log('No scripts in customComponentsIdList to remove.');
        }
        updateButtonVisibility();
    }

    // Function to update the button visibility based on the array length
    function updateButtonVisibility() {
        if (customComponentsIdList.length > 0) {
            removeElementButtonEl.style.display = 'inline-block';
        } else {
            removeElementButtonEl.style.display = 'none';
        }
    }

    // Add click event listeners to the buttons
    addScriptButtonEl.addEventListener('click', addScript);
    removeElementButtonEl.addEventListener('click', removeLastScript);

    // Initial update of the button visibility
    updateButtonVisibility();
})();

