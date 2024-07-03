(function () {
  // console.log("scripts5-self-executing-with-utility.js is starting to load.");
  // Initialization code here
  // Define options
  const options = globalConstants.SCRIPTS_OPTIONS;

  document.addEventListener("DOMContentLoaded", function () {
    // Create select element
    const select = document.createElement("select");
    select.id = "mySelect";

    // Add options to the select element
    options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.innerText = optionData.label;
      select.appendChild(option);
    });

    // Create a div to display selected value
    const displayDiv = document.createElement("div");
    displayDiv.id = "display";
    displayDiv.innerText = "Selected value will be displayed here";

    // Add event listener to select element
    select.addEventListener("change", function () {
      clearExtraComponents();
      const selectedScript = select.value;
      // displayDiv.innerText = `Selected: ${selectedScript}`;
      loadScript(selectedScript).then(
        (script) => {
          // console.log(`${script.src} is loaded!`);
          displayDiv.innerText = `Selected: ${selectedScript},\nStatus: ${script.src} is loaded successfully!!`;
        },
        (error) => {
          // console.log(`Error: ${error.message}`);
          displayDiv.innerText = `Selected: ${selectedScript},\n Status: Error: ${error.message}`;
        }
      );
      //.then((script) => console.log("Another handler..."));
    });

    // Append elements to the body
    document.body.appendChild(select);
    document.body.appendChild(displayDiv);

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
        if (element === select || element === displayDiv) {
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
  });
})();

console.log(
  "scripts5-self-executing-with-utility.js script loaded successfully"
);
