// import * as d3 from "d3";
import * as d3 from '../../../../node_modules/d3/dist/d3.js'
// import { createReloadButton } from "./buttons.js";
// import { renderBarChart, renderPieChart, renderLineChart } from "./charts.js";
// import { generateAttendanceData, employees } from "./data.js";

const stylesUtil=(()=>{
    /**
 * Style configuration JSON
 * @typedef {Object} Styles
 * @property {Object} bar - Bar chart styles.
 * @property {string} bar.fill - Bar fill color.
 *
 * @property {Object} chart - General chart styles.
 * @property {string} chart.display - Chart display property.
 * @property {string} chart.marginRight - Chart right margin.
 *
 * @property {Object} pie - Pie chart styles.
 * @property {string} pie.font - Pie chart font.
 *
 * @property {Object} line - Line chart styles.
 * @property {string} line.stroke - Line stroke color.
 * @property {number} line.strokeWidth - Line stroke width.
 * @property {number} line.dotRadius - Dot radius in line chart.
 * @property {string} line.dotFill - Dot fill color in line chart.
 *
 * @property {Object} button - Button styles.
 * @property {string} button.color - Button text color.
 * @property {string} button.backgroundColor - Button background color.
 * @property {string} button.border - Button border style.
 * @property {string} button.padding - Button padding.
 * @property {string} button.fontSize - Button font size.
 * @property {string} button.cursor - Button cursor style.
 */
const styles = {
    bar: {
        fill: "steelblue",
    },
    chart: {
        display: "inline-block",
        marginRight: "20px",
    },
    pie: {
        font: "10px sans-serif",
    },
    line: {
        stroke: "steelblue",
        strokeWidth: 1.5,
        dotRadius: 3,
        dotFill: "steelblue",
    },
    button: {
        color: "#ffffff",
        backgroundColor: "steelblue",
        border: "none",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

return {styles};
})();

const dataUtil=(()=>{
/**
 * Employee data
 * @typedef {Object} Employee
 * @property {number} id - Employee ID.
 * @property {string} name - Employee name.
 */
const employees = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
];

/**
 * Method to generate dummy attendance data
 * @param {Employee[]} employees - Array of employee objects.
 * @returns {Object[]} - Array of attendance data objects.
 */
const generateAttendanceData = (employees) => {
    return employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        daysPresent: Math.floor(Math.random() * 31),
    }));
};

return { employees, generateAttendanceData };

})();


const buttons=(()=>{

    const {styles}=stylesUtil;

    /**
 * Creates a button with the inner text "Reload" and attaches a click event handler.
 * @param {Function} onClick - The function to call when the button is clicked.
 * @param {HTMLElement} container - The container to append the button to.
 */
const createReloadButton = (onClick, container) => {
    const button = document.createElement("button");
    button.innerText = "Reload";
    
    // Apply styles from the styles JSON
    Object.keys(styles.button).forEach((styleKey) => {
        button.style[styleKey] = styles.button[styleKey];
    });

    button.onclick = () => {
        onClick();
    };

    container.appendChild(button);
};

return { createReloadButton };

})();

const chartsUtil=(()=>{

const {styles}=stylesUtil;
const { generateAttendanceData } =dataUtil;

/**
 * Renders a bar chart.
 * @param {Object[]} data - The data to render.
 * @param {string} container - The container to render the chart in.
 */
const renderBarChart = (data, container) => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", styles.chart.display)
        .style("margin-right", styles.chart.marginRight);

    const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.daysPresent)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.daysPresent))
        .attr("height", (d) => y(0) - y(d.daysPresent))
        .attr("width", x.bandwidth())
        .style("fill", styles.bar.fill);
};

/**
 * Renders a pie chart.
 * @param {Object[]} data - The data to render.
 * @param {string} container - The container to render the chart in.
 */
const renderPieChart = (data, container) => {
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", styles.chart.display)
        .style("margin-right", styles.chart.marginRight)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.name))
        .range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.daysPresent);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.name));

    arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("font", styles.pie.font)
        .text((d) => d.data.name);
};

/**
 * Renders a line chart.
 * @param {Object[]} data - The data to render.
 * @param {string} container - The container to render the chart in.
 */
const renderLineChart = (data, container) => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", styles.chart.display)
        .style("margin-right", styles.chart.marginRight);

    const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.daysPresent)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    const line = d3
        .line()
        .x((d) => x(d.name) + x.bandwidth() / 2)
        .y((d) => y(d.daysPresent));

    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", styles.line.stroke)
        .attr("stroke-width", styles.line.strokeWidth)
        .attr("d", line);

    svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => x(d.name) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.daysPresent))
        .attr("r", styles.line.dotRadius)
        .attr("fill", styles.line.dotFill);
};

return { renderBarChart, renderPieChart, renderLineChart };


})();



const mainLogic = (() => {

    const {createReloadButton}=buttons;

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

        if(scriptUrl){
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
})();