// Define options
const options = [
    { value: 'non-existing-script.js', label: 'Non-existing script' },
    { value: 'scripts/custom/basic-promise-syntax1.js', label: 'basic-promise-syntax1' },
    { value: 'scripts/custom/basic-promise-syntax2.js', label: 'basic-promise-syntax2.js' },
    { value: 'scripts/custom/basic-promise-syntax3.js', label: 'basic-promise-syntax3.js' },
    { value: 'scripts/custom/basic-promise-syntax4.js', label: 'basic-promise-syntax4.js' },
    { value: 'scripts/custom/image-reload-script.js', label: 'image-reload-script.js' },
    { value: 'scripts/custom/add-and-remove-elements-on-click.js', label: 'add-and-remove-elements-on-click.js' },
    { value: 'scripts/custom/add-and-remove-scripts-on-click.js', label: 'add-and-remove-scripts-on-click.js' }

];

document.addEventListener('DOMContentLoaded', function () {
    // Create select element
    const select = document.createElement('select');
    select.id = 'mySelect';



    // Add options to the select element
    options.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.innerText = optionData.label;
        select.appendChild(option);
    });

    // Create a div to display selected value
    const displayDiv = document.createElement('div');
    displayDiv.id = 'display';
    displayDiv.innerText = 'Selected value will be displayed here';

    // Add event listener to select element
    select.addEventListener('change', function () {
        clearExtraComponents();
        const selectedScript = select.value;
        displayDiv.innerText = `Selected: ${selectedScript}`;
        loadScript(selectedScript).then(
            script => console.log(`${script.src} is loaded!`),
            error => console.log(`Error: ${error.message}`)
        ).then(script => console.log('Another handler...'));
    });

    // Append elements to the body
    document.body.appendChild(select);
    document.body.appendChild(displayDiv);

    // Function to load a script
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
        });
    }

    // Function to clear extra components
    function clearExtraComponents() {
        const elements = document.body.children;
        for (let i = elements.length - 1; i >= 0; i--) {
            const element = elements[i];
            if (element !== select && element !== displayDiv && element.tagName.toLowerCase() !== 'script') {
                document.body.removeChild(element);
            }
        }
    }
});
