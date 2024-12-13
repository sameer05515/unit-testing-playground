
type GenerateRandomStringOptions = {
    length?: number;
    prefix?: string;
};

type HtmlElementJson = {
    tagName: string;
    attributes: { [key: string]: string };
    innerText: string;
    styles: { [key: string]: string };
};

const globalHelperUtility = (() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const generateRandomString = (
        { length = 10, prefix = "" }: GenerateRandomStringOptions = {}
    ): string => {
        let result = prefix ? `${prefix.toUpperCase()}_` : "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const convertHtmlElementToJson = (element?: HTMLElement): HtmlElementJson => {
        const json: HtmlElementJson = {
            tagName: element?.tagName || "",
            attributes: {},
            innerText: element?.innerText || "",
            styles: {},
        };
        if (!element) {
            return json;
        }

        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes.item(i);
            if (attr) {
                json.attributes[attr.name] = attr.value;
            }
        }

        for (let i = 0; i < element.style.length; i++) {
            const styleName = element.style.item(i);
            if (styleName) {
                // json.styles[styleName] = element.style[styleName];
            }
        }

        return json;
    };

    return {
        generateRandomString,
        convertHtmlElementToJson,
    };
})();

export default globalHelperUtility;


/**
 * Utility for generating IDs.
 * @module idUtility
 */
export const idUtility = (() => {
    const { generateRandomString: generateString } = globalHelperUtility;

    const generateId = (options: GenerateRandomStringOptions) => generateString(options);

    return {
        generateId
    };
})();

/**
 * Utility for applying styles to elements.
 * @module styleUtility
 */
export const styleUtility = (() => {
    const applyStyles = (element: HTMLElement | null, styles: { [key: string]: string }) => {
        if (!element || !styles) {
            return;
        }
        for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property as any] = styles[property];
            }
        }
    };

    const getDefaultStyle = (elementType: string) => {
        const defaultStyles: { [key: string]: { [key: string]: string } } = {
            div: {
                border: '1px solid #000',
                padding: '10px',
                margin: '5px'
            },
            input: {
                padding: '5px',
                margin: '5px'
            },
            button: {
                padding: '10px 20px',
                margin: '5px',
                cursor: 'pointer'
            },
            span: {
                margin: '5px'
            },
            select: {
                padding: '5px',
                margin: '5px'
            },
            h1: {
                fontSize: '24px',
                margin: '10px 0'
            },
            h2: {
                fontSize: '20px',
                margin: '10px 0'
            },
            h3: {
                fontSize: '16px',
                margin: '10px 0'
            },
            p: {
                margin: '10px 0'
            },
            ul: {
                margin: '10px 0',
                padding: '0',
                listStyleType: 'none'
            },
            li: {
                margin: '5px 0'
            },
            img: {
                maxWidth: '100%',
                height: 'auto'
            },
            a: {
                color: '#007BFF',
                textDecoration: 'none',
                cursor: 'pointer'
            },
            header: {
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e5e5e5'
            },
            footer: {
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #e5e5e5'
            },
            section: {
                padding: '10px',
                margin: '10px 0'
            },
            article: {
                padding: '10px',
                margin: '10px 0'
            }
        };
        return defaultStyles[elementType.toLowerCase()] || {};
    };

    return {
        applyStyles,
        getDefaultStyle
    };
})();
