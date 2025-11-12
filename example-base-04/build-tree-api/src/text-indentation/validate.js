const ErrorCodes = require('./error-codes');

const getIndentationLevel = (line) => line.search(/\S/);

const areAllLevelsEqual = (levels) => {
  const uniqueLevels = Array.from(new Set(levels));
  return uniqueLevels.length === 1;
};

const normalizeLines = (lines) => lines.map((line) => line.replace(/\s+$/, ''));

const gcd = (a, b) => {
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  if (absB === 0) {
    return absA;
  }
  return gcd(absB, absA % absB);
};

const computeIndentUnit = (levels) => {
  const positives = levels.filter((level) => level > 0);
  if (positives.length === 0) {
    return 0;
  }
  return positives.reduce((acc, level) => gcd(acc, level));
};

const validate = (input) => {
  if (!Array.isArray(input)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_INPUT.code,
      message: ErrorCodes.INVALID_INPUT.message,
      data: []
    };
  }

  const hasNonString = input.some((line) => typeof line !== 'string');
  if (hasNonString) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_INPUT.code,
      message: ErrorCodes.INVALID_INPUT.message,
      data: []
    };
  }

  const lines = normalizeLines(input).filter((line) => line.length > 0);

  if (lines.length === 0) {
    return {
      isValid: true,
      errorCode: ErrorCodes.SUCCESS.code,
      message: ErrorCodes.SUCCESS.message,
      data: []
    };
  }

  if (lines.length === 1) {
    return {
      isValid: true,
      errorCode: ErrorCodes.SUCCESS.code,
      message: ErrorCodes.SUCCESS.message,
      data: [{ name: lines[0].trim(), level: 0, children: [] }]
    };
  }

  const firstIndentation = getIndentationLevel(lines[0]);
  const levels = lines.map((line) => {
    const indentation = getIndentationLevel(line);
    return indentation - firstIndentation;
  });

  if (levels.some((level) => level < 0)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_INDENTATION.code,
      message: ErrorCodes.INVALID_INDENTATION.message,
      data: []
    };
  }

  if (areAllLevelsEqual(levels)) {
    return {
      isValid: true,
      errorCode: ErrorCodes.SUCCESS.code,
      message: ErrorCodes.SUCCESS.message,
      data: lines.map((line) => ({ name: line.trim(), level: 0, children: [] }))
    };
  }

  const indentUnit = computeIndentUnit(levels);
  if (indentUnit <= 0) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INCONSISTENT_INDENTATION.code,
      message: ErrorCodes.INCONSISTENT_INDENTATION.message,
      data: []
    };
  }

  const normalizedLevels = levels.map((level) => level / indentUnit);
  const hasInvalidLevel = normalizedLevels.some((level) => !Number.isInteger(level) || level < 0);
  if (hasInvalidLevel) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INCONSISTENT_INDENTATION.code,
      message: ErrorCodes.INCONSISTENT_INDENTATION.message,
      data: []
    };
  }

  const roots = [];
  const stack = [];

  for (let index = 0; index < lines.length; index += 1) {
    const level = normalizedLevels[index];
    if (level > 0 && !stack[level - 1]) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INCONSISTENT_INDENTATION.code,
        message: ErrorCodes.INCONSISTENT_INDENTATION.message,
        data: []
      };
    }

    const node = { name: lines[index].trim(), level, children: [] };

    if (level === 0) {
      roots.push(node);
    } else {
      stack[level - 1].children.push(node);
    }

    stack[level] = node;
    stack.length = level + 1;
  }

  return {
    isValid: true,
    errorCode: ErrorCodes.SUCCESS.code,
    message: ErrorCodes.SUCCESS.message,
    data: roots
  };
};

module.exports = validate;

