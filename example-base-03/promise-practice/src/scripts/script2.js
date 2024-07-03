document.addEventListener('DOMContentLoaded', function() {
    // Create select element
    const select = document.createElement('select');
    select.id = 'mySelect';

    // Define options
    const options = [
        { value: 'basic-promise-syntax1.js', label: 'basic-promise-syntax1' },
        { value: 'basic-promise-syntax2.js', label: 'basic-promise-syntax2.js' },
        { value: 'non-existing-script.js', label: 'Non-existing script' }
    ];

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
    select.addEventListener('change', function() {
        const selectedScript = select.value;
        displayDiv.innerText = `Selected: ${selectedScript}`;
        loadScript(selectedScript).then(
            script => alert(`${script.src} is loaded!`),
            error => alert(`Error: ${error.message}`)
        ).then(script => alert('Another handler...'));
    });

    // Append elements to the body
    document.body.appendChild(select);
    document.body.appendChild(displayDiv);

    // Function to load a script
    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
        });
    }
});
