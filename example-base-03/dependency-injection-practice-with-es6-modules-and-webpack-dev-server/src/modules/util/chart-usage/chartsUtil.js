import * as d3 from 'd3';
import { styles } from './stylesUtil.js';

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

export { renderBarChart, renderPieChart, renderLineChart };
