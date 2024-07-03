// mainLogic.js

const { createReloadButton } = require('./buttonsUtil');
const { renderBarChart, renderPieChart, renderLineChart } = require('./chartsUtil');
const { generateAttendanceData, employees } = require('./dataUtil');

/**
 * Initializes elements and loads the script.
 * @param {string[]} ids - Array of container IDs to create.
 * @param {string} scriptUrl - URL of the script to load.
 */
const createInitialElements = (ids = [], scriptUrl) => {
    const myContainerDiv = document.createElement("div");
    myContainerDiv.id = 'myContainerDiv-101';
    document.body.appendChild(myContainerDiv);

    const flexContainerDiv = document.createElement("div");
    flexContainerDiv.style.display = "flex";
    flexContainerDiv.style.flexDirection = "row"; // Change to 'column' if needed
    flexContainerDiv.style.gap = "10px"; // Optional: Adds space between flex items

    createReloadButton(() => {
        render();
    }, myContainerDiv);

    ids.forEach((id) => {
        const chartDiv = document.createElement("div");
        chartDiv.id = id;
        flexContainerDiv.appendChild(chartDiv);
    });

    myContainerDiv.appendChild(flexContainerDiv);

    /**
     * Loads a script dynamically.
     * @param {string} src - The source URL of the script.
     * @returns {Promise<HTMLScriptElement>} - A promise that resolves when the script is loaded.
     */
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.append(script);
        });
    };

    if (scriptUrl) {
        loadScript(scriptUrl).then(
            () => render(),
            (error) => console.error(`Error: ${error.message}`)
        );
    }
};

/**
 * Render function to call chart rendering methods
 */
const render = () => {
    console.clear();
    console.log('Starting to re-render...');

    ["bar-chart-container", "pie-chart-container", "line-chart-container"].forEach(id => {
        document.getElementById(id).replaceChildren();
    });

    // Generate attendance data
    const attendanceData = generateAttendanceData(employees);

    renderBarChart(attendanceData, "#bar-chart-container");
    renderPieChart(attendanceData, "#pie-chart-container");
    renderLineChart(attendanceData, "#line-chart-container");
};

createInitialElements(
    ["bar-chart-container", "pie-chart-container", "line-chart-container"],
    //"../node_modules/d3/dist/d3.min.js"
);

module.exports = { render };
