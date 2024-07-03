function createDivFromXML(xmlString) {
    // Parse the XML string
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Create a div element
    const div = document.createElement("div");

    // Function to traverse XML nodes and create corresponding HTML elements
    function traverseXML(node, parentElement) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Create an HTML element for this XML element
            const element = document.createElement(node.tagName);

            // Copy attributes from the XML element to the HTML element
            for (const attr of node.attributes) {
                element.setAttribute(attr.name, attr.value);
            }

            // Recur for each child node
            for (const childNode of node.childNodes) {
                traverseXML(childNode, element);
            }

            // Append the created element to the parent element
            parentElement.appendChild(element);
        } else if (node.nodeType === Node.TEXT_NODE) {
            // For text nodes, create a text node and append it to the parent element
            const textNode = document.createTextNode(node.nodeValue);
            parentElement.appendChild(textNode);
        }
    }

    // Start traversal from the root node of the XML document
    traverseXML(xmlDoc.documentElement, div);

    return div;
}

// Example usage
// const xmlString = `
// <note>
//   <to>Tove</to>
//   <from>Jani</from>
//   <heading>Reminder</heading>
//   <body>Don't forget me this weekend!</body>
// </note>
// `;
const xmlString = `
<div style="background-color: #ffff00; border-width:1px; border-style: solid; border-color: #000000; width:200px; height: 200px">
I am a disco dancer
</div>
`

const divElement = createDivFromXML(xmlString);
document.body.appendChild(divElement); // Append the created div to the body
