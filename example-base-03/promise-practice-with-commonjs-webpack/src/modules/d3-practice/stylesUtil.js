// stylesUtil.js

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

module.exports = { styles };
