

// cssStylesUtility.js
const cssStylesUtility = (() => {
    const styles = {
        div: {
            fontSize: "12px",
            padding: "10px",
            width: "1000px",
            height: "1000px",
            border: "1px solid",
            borderLeft: "5px solid blue",
        },
        input: { backgroundColor: "yellow" },
        button: { backgroundColor: "green" },
        span: { backgroundColor: "pink" },
    };
    return { styles };
})();

module.exports = cssStylesUtility;