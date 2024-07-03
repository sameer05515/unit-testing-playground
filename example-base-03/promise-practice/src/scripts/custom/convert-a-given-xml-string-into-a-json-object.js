function xmlToJson(xml) {
    // Create the return object
    let obj = {};

    if (xml.nodeType === 1) { // Element
        // Do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                let attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // Text
        obj = xml.nodeValue;
    }

    // Do children
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            let item = xml.childNodes.item(i);
            let nodeName = item.nodeName;
            if (typeof(obj[nodeName]) === "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) === "undefined") {
                    let old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
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



const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

const jsonResult = xmlToJson(xmlDoc.documentElement);
console.log(JSON.stringify(jsonResult, null, 2));

const divElement= document.createElement("div");

divElement.innerHTML=`<code>${xmlString}</code> <br/> <code>${JSON.stringify(jsonResult, null, 2)}</code>`

document.body.appendChild(divElement);
