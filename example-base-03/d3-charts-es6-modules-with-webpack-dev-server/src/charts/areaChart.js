import * as d3 from 'd3';

function generateAreaChart(data) {
  const width = 500;
  const height = 300;
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 0]);

  const area = d3.area()
    .x(d => x(d.name))
    .y0(height)
    .y1(d => y(d.value));

  svg.append("path")
    .datum(data)
    .attr("fill", "steelblue")
    .attr("d", area);

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  return svg.node();
}

export default  generateAreaChart;
