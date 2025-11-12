const test = require('node:test');
const assert = require('node:assert/strict');

const buildTree = require('../../src/text-indentation/buildTree');
const ErrorCodes = require('../../src/text-indentation/error-codes');

test('buildTree returns hierarchy for valid outline', () => {
  const input = [
    'Root',
    '    Child A',
    '        Grandchild A1',
    '    Child B'
  ].join('\n');

  const result = buildTree(input);

  assert.equal(result.isValid, true);
  assert.equal(result.errorCode, ErrorCodes.SUCCESS.code);
  assert.deepEqual(result.data, [
    {
      name: 'Root',
      level: 0,
      children: [
        {
          name: 'Child A',
          level: 1,
          children: [{ name: 'Grandchild A1', level: 2, children: [] }]
        },
        {
          name: 'Child B',
          level: 1,
          children: []
        }
      ]
    }
  ]);
});

test('buildTree flags inconsistent indentation', () => {
  const input = ['Root', '    Child', '      Grandchild'].join('\n');

  const result = buildTree(input);

  assert.equal(result.isValid, false);
  assert.equal(result.errorCode, ErrorCodes.INCONSISTENT_INDENTATION.code);
});

test('buildTree rejects non-string input', () => {
  const result = buildTree(null);

  assert.equal(result.isValid, false);
  assert.equal(result.errorCode, ErrorCodes.INVALID_INPUT.code);
  assert.deepEqual(result.data, []);
});

