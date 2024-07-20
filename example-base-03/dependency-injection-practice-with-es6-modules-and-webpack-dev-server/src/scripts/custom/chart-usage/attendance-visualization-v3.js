import { createReloadButton } from '../../../modules/util/chart-usage/buttons.js';
import { generateAttendanceData, employees } from '../../../modules/util/chart-usage/dataUtil.js';
import { renderBarChart, renderPieChart, renderLineChart } from '../../../modules/util/chart-usage/chartsUtil.js';


const createInitialElements = (ids = [], scriptUrl) => {
    const myContainerDiv = document.createElement("div");
    myContainerDiv.id = 'myContainerDiv-101';
    document.body.appendChild(myContainerDiv);

    const flexContainerDiv = document.createElement("div");
    flexContainerDiv.style.display = "flex";
    flexContainerDiv.style.flexDirection = "row";
    flexContainerDiv.style.gap = "10px";

    createReloadButton(() => {
        render();
    }, myContainerDiv);

    ids.forEach((id) => {
        const chartDiv = document.createElement("div");
        chartDiv.id = id;
        flexContainerDiv.appendChild(chartDiv);
    });

    myContainerDiv.appendChild(flexContainerDiv);

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

const render = () => {
    console.clear();
    console.log('Starting to re-render...');

    ["bar-chart-container", "pie-chart-container", "line-chart-container"].forEach(id => {
        document.getElementById(id).replaceChildren();
    });

    const attendanceData = generateAttendanceData(employees);

    renderBarChart(attendanceData, "#bar-chart-container");
    renderPieChart(attendanceData, "#pie-chart-container");
    renderLineChart(attendanceData, "#line-chart-container");
};

const mainLogic = () => {
    createInitialElements(
        ["bar-chart-container", "pie-chart-container", "line-chart-container"]
    );
};

mainLogic();

// export { mainLogic };
