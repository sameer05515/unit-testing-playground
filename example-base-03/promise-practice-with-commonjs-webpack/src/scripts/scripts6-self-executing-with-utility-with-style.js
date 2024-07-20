

const globalConstants= require('../modules/v1/globalConstants');

(function () {
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

  document.addEventListener("DOMContentLoaded", function () {
    // Create select element
    const select = document.createElement("select");
    select.id = "mySelect";

    // Apply styles to select element
    Object.keys(styles.select).forEach((styleKey) => {
      select.style[styleKey] = styles.select[styleKey];
    });

    // Add options to the select element
    globalConstants.SCRIPTS_OPTIONS.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.innerText = optionData.label;
      select.appendChild(option);
    });

    // Create a div to display selected value
    const displayDiv = document.createElement("div");
    displayDiv.id = "display";
    displayDiv.innerText = "Selected value will be displayed here";

    // Apply styles to displayDiv element
    Object.keys(styles.displayDiv).forEach((styleKey) => {
      displayDiv.style[styleKey] = styles.displayDiv[styleKey];
    });

    // Add event listener to select element
    select.addEventListener("change", function () {
      clearExtraComponents();
      const selectedScript = select.value;
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
  "scripts6-self-executing-with-utility-with-style.js script loaded successfully"
);
