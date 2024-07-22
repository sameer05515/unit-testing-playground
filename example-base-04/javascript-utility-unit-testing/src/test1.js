
const parseLines = (input) => {
    return input
        .trim()
        .split("\n")
        .filter((line) => line && line.trim().length > 0)
        .map((line) => ({
            name: line.trim(),
            // indentationLevel: line.search(/\S/),
            indentationLevel: line.match(/^\s*/)[0].length,
        }));
};

// Example usage:
const indentedText = `
This is some indented text.
    This line is further indented.

    
Another line with the same indentation as the first.
    Another further indented line.
`;

const result = parseLines(indentedText);
console.log(result);