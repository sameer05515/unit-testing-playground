import * as d3 from 'd3';

function generateScatterPlot(data) {
  const width = 500;
  const height = 300;
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

  svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("cx", d => x(d.value))
      .attr("cy", d => y(d.value))
      .attr("r", 5)
      .attr("fill", "steelblue");

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  return svg.node();
}

export default  generateScatterPlot;
