(()=> {
    // Style configuration JSON
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
            dotFill: "steelblue"
        }
    };

    // Employee data
    const employees = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "David" },
        { id: 5, name: "Eve" }
    ];

    // Method to generate dummy attendance data
    const generateAttendanceData = (employees) => {
        return employees.map(employee => ({
            id: employee.id,
            name: employee.name,
            daysPresent: Math.floor(Math.random() * 31)
        }));
    };

    // Generate attendance data
    const attendanceData = generateAttendanceData(employees);

    // Function to render charts
    const renderBarChart = (data, container) => {
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        const svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("display", styles.chart.display)
            .style("margin-right", styles.chart.marginRight);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.daysPresent)]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.daysPresent))
            .attr("height", d => y(0) - y(d.daysPresent))
            .attr("width", x.bandwidth())
            .style("fill", styles.bar.fill);
    };

    const renderPieChart = (data, container) => {
        const width = 500;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("display", styles.chart.display)
            .style("margin-right", styles.chart.marginRight)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.daysPresent);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const arcs = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.name));

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .style("font", styles.pie.font)
            .text(d => d.data.name);
    };

    const renderLineChart = (data, container) => {
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        const svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("display", styles.chart.display)
            .style("margin-right", styles.chart.marginRight);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.daysPresent)]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        const line = d3.line()
            .x(d => x(d.name) + x.bandwidth() / 2)
            .y(d => y(d.daysPresent));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", styles.line.stroke)
            .attr("stroke-width", styles.line.strokeWidth)
            .attr("d", line);

        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.name) + x.bandwidth() / 2)
            .attr("cy", d => y(d.daysPresent))
            .attr("r", styles.line.dotRadius)
            .attr("fill", styles.line.dotFill);
    };

    // Function to initialize elements and load script
    const createInitialElements = (ids = [], scriptUrl) => {
        ids.forEach(id => {
            const displayDiv = document.createElement('div');
            displayDiv.id = id;
            document.body.appendChild(displayDiv);
        });

        // Load d3.js script
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.head.append(script);
            });
        };

        loadScript(scriptUrl).then(
            () => render(),
            (error) => console.error(`Error: ${error.message}`)
        );
    };

    // Render function to call chart rendering methods
    const render = () => {
        renderBarChart(attendanceData, "#bar-chart-container");
        renderPieChart(attendanceData, "#pie-chart-container");
        renderLineChart(attendanceData, "#line-chart-container");
    };

    createInitialElements(['bar-chart-container', 'pie-chart-container', 'line-chart-container'], "https://d3js.org/d3.v7.min.js");
})();