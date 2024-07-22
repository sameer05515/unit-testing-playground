const ErrorCodes = {
    SUCCESS: {
        code: 0,
        message: "Indentation is consistent."
    },
    INCONSISTENT_INDENTATION: {
        code: 1,
        message: "Indentation is inconsistent."
    },
    EMPTY_INPUT: {
        code: 2,
        message: "Input text is empty or contains no valid lines."
    }
};

function validateIndentationConsistency(text) {
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    if (lines.length === 0) {
        return {
            data: null,
            isValid: false,
            errorCode: ErrorCodes.EMPTY_INPUT.code,
            message: ErrorCodes.EMPTY_INPUT.message
        };
    }

    const indentationLevel = (line) => line.match(/^\s*/)[0].length;
    const firstIndentation = indentationLevel(lines[0]);

    const isValid = lines.every(line => indentationLevel(line) === firstIndentation);

    return {
        data: text,
        isValid: isValid,
        errorCode: isValid ? ErrorCodes.SUCCESS.code : ErrorCodes.INCONSISTENT_INDENTATION.code,
        message: isValid ? ErrorCodes.SUCCESS.message : ErrorCodes.INCONSISTENT_INDENTATION.message
    };
}

// Example usage:
const indentedText = `
    This is some indented text.
        This line is further indented.
    Another line with the same indentation as the first.
        Another further indented line.
`;

const result = validateIndentationConsistency(indentedText);
console.log(result);
