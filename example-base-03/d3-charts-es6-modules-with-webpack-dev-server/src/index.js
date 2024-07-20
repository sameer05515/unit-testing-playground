import generateDummyData from './data/generateData';
import generateBarChart from './charts/barChart';
import generateLineChart from './charts/lineChart';
import generatePieChart from './charts/pieChart';
import generateScatterPlot from './charts/scatterPlot';
import generateAreaChart from './charts/areaChart';
import generateStackedBarChart from './charts/stackedBarChart';

const createInitialComponents2=()=>{
    const data = generateDummyData();
    console.log(data);
    
    document.body.appendChild(generateBarChart(data));
    document.body.appendChild(generateLineChart(data));
    document.body.appendChild(generatePieChart(data));
    document.body.appendChild(generateScatterPlot(data));
    document.body.appendChild(generateAreaChart(data));
    
    // Dummy data for stacked bar chart
    const stackedData = data.map(d => ({
      name: d.name,
      A: Math.floor(Math.random() * 50),
      B: Math.floor(Math.random() * 50),
      total: d.value,
    }));
    stackedData.columns = ['name', 'A', 'B', 'total'];
    document.body.appendChild(generateStackedBarChart(stackedData));
}




document.addEventListener("DOMContentLoaded", createInitialComponents2);
