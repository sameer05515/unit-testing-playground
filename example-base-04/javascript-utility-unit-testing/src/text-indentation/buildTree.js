
const validate = require('./validate');
const parseLines = require('./parse-lines');

function buildTree(text) {
    const parsed = parseLines(text);

    if (!parsed.isValid) {
        return {
            data: parsed.data,
            isValid: false,
            errorCode: parsed.errorCode,
            message: parsed.message
        };
    }

    return validate(parsed.data);
}
module.exports = buildTree;