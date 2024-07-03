



// globalHelperUtility.js
const globalHelperUtility = (() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const generateRandomString = ({ length, prefix } = { length: 10, prefix: "" }) => {
        let result = prefix ? `${prefix.toUpperCase()}_` : "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const converHtmlElementToJson = (element) => {
        const json = {
            tagName: element?.tagName || "",
            attributes: {},
            innerText: element?.innerText || "",
            styles: {},
        };
        if (!element) return json;

        for (let attr of element.attributes) {
            json.attributes[attr.name] = attr.value;
        }
        for (let style of element.style) {
            json.styles[style] = element.style[style];
        }

        return json;
    };

    return {
        generateRandomString,
        converHtmlElementToJson,
    };
})();

module.exports = globalHelperUtility;