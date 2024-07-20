document.addEventListener('DOMContentLoaded', function() {
    // Create select element
    const select = document.createElement('select');
    select.id = 'mySelect';

    // Add options to the select element
    const options = ['Option 1', 'Option 2', 'Option 3'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.innerText = optionText;
        select.appendChild(option);
    });

    // Create a div to display selected value
    const displayDiv = document.createElement('div');
    displayDiv.id = 'display';
    displayDiv.innerText = 'Selected value will be displayed here';

    // Add event listener to select element
    select.addEventListener('change', function() {
        displayDiv.innerText = `Selected: ${select.value}`;
    });

    // Append elements to the body
    document.body.appendChild(select);
    document.body.appendChild(displayDiv);
});
