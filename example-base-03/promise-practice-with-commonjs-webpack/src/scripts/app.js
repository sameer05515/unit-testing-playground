// app.js
const { greet } = require('../modules/basic/module1');
const { calculateSquare, calculateSum } = require('../modules/basic/module2');
const globalConstants = require('../modules/v1/globalConstants');

(() => {

    const styles = {
        select: {
            width: "200px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
        },
        displayDiv: {
            padding: "10px",
            fontSize: "18px",
            color: "#333",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginTop: "10px",
        },
    };

    let count = 0;
    const MAX = 3;
    let mySelectComp = null;
    let displayDiv= null;

    // Function to load a script
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(script);
            script.onerror = () =>
                reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
        });
    }

    // Function to clear extra components
    function clearExtraComponents() {
        const bodyElements = document.body.children;
        for (let i = bodyElements.length - 1; i >= 0; i--) {
            const element = bodyElements[i];
            if (element === mySelectComp || element === displayDiv || element.id === "my-header-h1-i-hate-vandana") {
                continue;
            } else {
                document.body.removeChild(element);
            }
        }

        const headElements = document.head.children;
        for (let i = headElements.length - 1; i >= 0; i--) {
            const element = headElements[i];
            if (
                (element.tagName.toLowerCase() !== "script" &&
                    element.tagName.toLowerCase() !== "style") ||
                (element.tagName.toLowerCase() === "script" &&
                    (element.id === "mybase-script" || element.id === "utility-script"))
            ) {
                continue;
            } else {
                document.head.removeChild(element);
            }
        }
    }


    const createInitialComponents1 = () => {
        const btn = document.createElement('button');
        btn.innerText = 'Reload';
        btn.onclick = () => {
            greet(`Premedra Kumar clicked at ${new Date()}`);
            count = calculateSum(count);
            console.log('SQUARE: ' + calculateSquare(count));
            if (count > MAX) {
                count = 0;
                console.log('Resetting count');
            }

        }
        document.body.appendChild(btn);
    }

    const createInitialComponents2 = () => {
        // Create select element
        mySelectComp = document.createElement("select");
        mySelectComp.id = "mySelect";

        // Apply styles to select element
        Object.keys(styles.select).forEach((styleKey) => {
            mySelectComp.style[styleKey] = styles.select[styleKey];
        });

        // Add options to the mySelectComp element
        globalConstants.SCRIPTS_OPTIONS.forEach((optionData) => {
            const option = document.createElement("option");
            option.value = optionData.value;
            option.innerText = optionData.label;
            mySelectComp.appendChild(option);
        });

        // Create a div to display selected value
        displayDiv = document.createElement("div");
        displayDiv.id = "display";
        displayDiv.innerText = "Selected value will be displayed here";

        // Apply styles to displayDiv element
        Object.keys(styles.displayDiv).forEach((styleKey) => {
            displayDiv.style[styleKey] = styles.displayDiv[styleKey];
        });

        // Add event listener to mySelectComp element
        mySelectComp.addEventListener("change", function () {
            clearExtraComponents();
            const selectedScript = mySelectComp.value;
            loadScript(selectedScript).then(
                (script) => {
                    displayDiv.innerText = `Selected: ${selectedScript},\nStatus: ${script.src} is loaded successfully!!`;
                },
                (error) => {
                    displayDiv.innerText = `Selected: ${selectedScript},\nStatus: Error: ${error.message}`;
                }
            );
        });

        // Append elements to the body
        document.body.appendChild(mySelectComp);
        document.body.appendChild(displayDiv);
    }

    // createInitialComponents1();

    //createInitialComponents2();

    document.addEventListener("DOMContentLoaded", createInitialComponents2);
})();


console.log(
    "app.js script loaded successfully"
);