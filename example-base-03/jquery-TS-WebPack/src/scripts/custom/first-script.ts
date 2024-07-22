// Function to create a styled element
const createElementWithStyles = (tag: string, attributes: { [key: string]: string } = {}, innerHTML: string = '', styles: { [key: string]: string } = {}): HTMLElement => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    element.innerHTML = innerHTML;

    // Apply styles from the JSON object
    Object.keys(styles).forEach(styleKey => {
        (element.style as any)[styleKey] = styles[styleKey];
    });

    return element;
};

// Function to create a div with id 'tables' and a table with numbers from 1 to 10
const createTableDiv = (): void => {
    
    // Define styles for the div
    const divStyles = {
        border: '1px solid #000',
        padding: '10px',
        margin: '10px',
        width: '200px',
    };

    // Define styles for the table
    const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    // Define styles for table cells
    const cellStyles = {
        border: '1px solid #000',
        padding: '5px',
        textAlign: 'center',
    };

    // Create the div with id 'tables'
    const tableDiv = createElementWithStyles('div', { id: 'tables' }, '', divStyles);

    // Create the table element
    const table = createElementWithStyles('table', {}, '', tableStyles);

    // Populate the table with numbers from 1 to 10
    for (let i = 1; i <= 10; i++) {
        const row = createElementWithStyles('tr');
        const cell = createElementWithStyles('td', {}, i.toString(), cellStyles);
        row.appendChild(cell);
        table.appendChild(row);
    }

    // Append the table to the div
    tableDiv.appendChild(table);

    // Append the div to the body (or any other element as needed)
    document.body.appendChild(tableDiv);
};

// Call the function to create the div and table
createTableDiv();
