const test = require('node:test');
const assert = require('node:assert/strict');

const buildTree = require('../buildTree');
const ErrorCodes = require('../error-codes');

test('returns single root node for single-line input', () => {
    const result = buildTree('Root Node');

    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.errorCode, ErrorCodes.SUCCESS.code);
    assert.deepStrictEqual(result.data, [
        { name: 'Root Node', level: 0, children: [] }
    ]);
});

test('builds nested hierarchy for consistently indented input', () => {
    const input = [
        'Root',
        '    Child A',
        '        Grandchild A1',
        '    Child B',
        '        Grandchild B1',
        '        Grandchild B2'
    ].join('\n');

    const result = buildTree(input);

    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.errorCode, ErrorCodes.SUCCESS.code);
    assert.deepStrictEqual(result.data, [
        {
            name: 'Root',
            level: 0,
            children: [
                {
                    name: 'Child A',
                    level: 1,
                    children: [
                        { name: 'Grandchild A1', level: 2, children: [] }
                    ]
                },
                {
                    name: 'Child B',
                    level: 1,
                    children: [
                        { name: 'Grandchild B1', level: 2, children: [] },
                        { name: 'Grandchild B2', level: 2, children: [] }
                    ]
                }
            ]
        }
    ]);
});

test('flags indentation that decreases beneath the first line', () => {
    const input = [
        '    Root',
        '  Child'
    ].join('\n');

    const result = buildTree(input);

    assert.strictEqual(result.isValid, false);
    assert.strictEqual(result.errorCode, ErrorCodes.INVALID_INDENTATION.code);
});

test('flags inconsistent indentation steps', () => {
    const input = [
        'Root',
        '    Child',
        '   Misaligned'
    ].join('\n');

    const result = buildTree(input);

    assert.strictEqual(result.isValid, false);
    assert.strictEqual(result.errorCode, ErrorCodes.INCONSISTENT_INDENTATION.code);
});

test('returns invalid input for non-string values', () => {
    const result = buildTree(null);

    assert.strictEqual(result.isValid, false);
    assert.strictEqual(result.errorCode, ErrorCodes.INVALID_INPUT.code);
});

