import * as d3 from 'd3';

function generatePieChart(data) {
  const width = 500;
  const height = 300;
  const radius = Math.min(width, height) / 2;
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const pie = d3.pie()
    .value(d => d.value);

  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const arcs = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => d3.schemeCategory10[d.index]);

  return svg.node();
}

export default  generatePieChart;
