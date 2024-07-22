// main.ts
import LOGGER from "./log/loggerUtility";
import globalConstants from "./global/globalConstants";

export const initialScript = () => {
  //===================== Utility Functions ====================

  type ScriptOption = {
    value: string;
    label: string;
  };

  const isValidSelectedScript = (selectedScript: any): boolean =>
    selectedScript &&
    typeof selectedScript === "object" &&
    !Array.isArray(selectedScript) &&
    typeof selectedScript.execute === "function";

  // Function to create an element with attributes
  const createElement = (
    tag: string,
    attributes: { [key: string]: string } = {},
    innerHTML: string = ""
  ): HTMLElement => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach((attr) =>
      element.setAttribute(attr, attributes[attr])
    );
    element.innerHTML = innerHTML;
    return element;
  };

  const createStyleElement = (css: string, id?: string): HTMLStyleElement => {
    const styleElement = createElement(
      "style",
      { id: id || "" },
      css
    ) as HTMLStyleElement;
    document.head.appendChild(styleElement);
    return styleElement;
  };

  // Function to load a script
  const loadScript = (src: string): Promise<HTMLScriptElement> =>
    new Promise((resolve, reject) => {
      const script = createElement("script", {
        src,
        type: "module",
      }) as HTMLScriptElement;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
      document.head.append(script);
    });

  // Function to clear extra components
  const clearExtraComponents = (): void => {
    const myMainDiv = document.getElementById("mathru-ki-bijli-ka-hindola");
    const chutiyonKiFauj = document.getElementById("chutiyon-ki-fauj");
    // Convert HTMLCollection to an array
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach((child) => {
      if (
        child === myMainDiv ||
        ["meri-tag-line-wali-id-DO-NOT-DELETE", "chutiyon-ki-fauj", "mybase-script"].includes(
          child.id
        )
      ) {
        console.log("Skipping to delete preserved elements");
        return;
      }
      document.body.removeChild(child);
    });
    // Convert HTMLCollection to an array
    const headChildren = Array.from(document.head.children);
    headChildren.forEach((child) => {
      if (
        !["script", "style"].includes(child.tagName.toLowerCase()) ||
        ["mybase-script", "utility-script", "d3-script", "my-custom-styles"].includes(child.id)
      )
        return;
      document.head.removeChild(child);
    });
  };

  //===================== Main Script ====================

  const cssContent = `
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

div {
  background: #ffffff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 16px;
  margin: 10px 0;
}

.greeting-id {
  color: #007bff;
}

.greeting-content {
  color: #28a745;
  white-space: pre-wrap;
}

.greeting-jqxhr {
  color: #dc3545;
  white-space: pre-wrap;
}

/* Button Styles */
#my-button-no-1 {
  background-color: #007bff; /* Primary blue */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 15px; /* Padding */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s, transform 0.2s; /* Animation for hover */
}

/* Button hover effect */
#my-button-no-1:hover {
  background-color: #0056b3; /* Darker blue on hover */
  transform: scale(1.05); /* Slightly enlarge on hover */
}

/* Button active effect */
#my-button-no-1:active {
  background-color: #004085; /* Even darker blue on click */
  transform: scale(0.95); /* Slightly shrink on click */
}

`;

  createStyleElement(cssContent, "my-custom-styles");

  const chutiyonKiFauj = createElement(
    "div",
    { id: "chutiyon-ki-fauj" },
    `
        <div id="my-element">This will be replaced by jQuery</div>

      <button id="my-button-no-1">Click me</button>
      <p class="greeting-id">The ID is</p>
      <p class="greeting-content">The content is</p>
      <p class="greeting-jqxhr">The jqxhr is</p>
        `
  );

  const myMainDiv = createElement("div", { id: "mathru-ki-bijli-ka-hindola" });
  const myH1 = createElement(
    "div",
    {},
    `
        <h1>Check the console for output - Premendra Kumar</h1>
        <h1 style="color:red;">main-v0.0.1.js</h1>
        <h1>Select Component Example</h1>
        <span style="display: block; white-space: pre;">
            In this component, we have created a combo; on change of this, we are executing functions defined in passed self-executing functions
        </span>
    `
  );
  const selectedPersonDiv = createElement("div");

  const select = createElement("select", { id: "mySelect" });
  const defaultOption = createElement(
    "option",
    { disabled: "true", selected: "true" },
    "Select Option"
  );
  select.appendChild(defaultOption);

  globalConstants.SCRIPTS_OPTIONS.forEach(
    (optionData: ScriptOption, index: number) => {
      const option = createElement(
        "option",
        { value: index.toString() },
        optionData.label
      );
      select.appendChild(option);
    }
  );

  let selectedScript: string | null = null;

  const handleSelectOptionsChange = (event: Event): void => {
    clearExtraComponents();
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    selectedScript =
      globalConstants.SCRIPTS_OPTIONS[Number(selectedOption.value)].value;
    LOGGER.info("[OPTION SELECTED]", selectedScript);

    loadScript(selectedScript)
      .then((script) => {
        selectedPersonDiv.innerHTML = `Selected: <strong>${selectedScript}</strong> Status: <span style="color: green;"><strong>${script.src} is loaded successfully!!</strong></span>`;
      })
      .catch((error: Error) => {
        selectedPersonDiv.innerHTML = `Selected: <strong>${selectedScript}</strong> Status: <span style="color: red;"><strong>Error: ${error.message}</strong></span>`;
      });
  };

  select.addEventListener("change", handleSelectOptionsChange);

  myMainDiv.append(chutiyonKiFauj, myH1, select, selectedPersonDiv);
  document.body.appendChild(myMainDiv);
};
