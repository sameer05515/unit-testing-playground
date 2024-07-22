const assert = require('assert');
const validate = require('./validate'); // Ensure the path to your validate.js file is correct

const testCases = [
    // Valid scenarios
    {
        input: `
            Root
             Child 1
              Grandchild 1
               Grandchild 2
             Child 2
              Grandchild 3
        `,
        expected: {
            isValid: true,
            errorCode: 'SUCCESS',
            message: 'Success',
            data: [
                { name: 'Root', level: 0, children: [
                    { name: 'Child 1', level: 1, children: [
                        { name: 'Grandchild 1', level: 2, children: [] },
                        { name: 'Grandchild 2', level: 2, children: [] }
                    ]},
                    { name: 'Child 2', level: 1, children: [
                        { name: 'Grandchild 3', level: 2, children: [] }
                    ]}
                ]}
            ]
        }
    },
    {
        input: `
            Root
             Child 1
              Grandchild 1
              Grandchild 2
               Super Grandchild 1
             Child 2
              Grandchild 3
        `,
        expected: {
            isValid: true,
            errorCode: 'SUCCESS',
            message: 'Success',
            data: [
                { name: 'Root', level: 0, children: [
                    { name: 'Child 1', level: 1, children: [
                        { name: 'Grandchild 1', level: 2, children: [] },
                        { name: 'Grandchild 2', level: 2, children: [
                            { name: 'Super Grandchild 1', level: 3, children: [] }
                        ]}
                    ]},
                    { name: 'Child 2', level: 1, children: [
                        { name: 'Grandchild 3', level: 2, children: [] }
                    ]}
                ]}
            ]
        }
    },
    {
        input: `
            Root
        `,
        expected: {
            isValid: true,
            errorCode: 'SUCCESS',
            message: 'Success',
            data: [{ name: 'Root', level: 0, children: [] }]
        }
    },
  
    // Invalid scenarios
    {
        input: `
            Root
             Child 1
              Grandchild 1
               Grandchild 2
                Grandchild 3
        `,
        expected: {
            isValid: false,
            errorCode: 'INCONSISTENT_INDENTATION',
            message: 'Indentation is inconsistent.',
            data: []
        }
    },
    {
        input: `
            Root
             Child 1
              Grandchild 1
             Child 2
              Grandchild 2
        `,
        expected: {
            isValid: false,
            errorCode: 'INCONSISTENT_INDENTATION',
            message: 'Indentation is inconsistent.',
            data: []
        }
    },
    {
        input: `
            Root
             Child 1
              Grandchild 1
               Grandchild 2
        `,
        expected: {
            isValid: false,
            errorCode: 'INCONSISTENT_INDENTATION',
            message: 'Indentation is inconsistent.',
            data: []
        }
    },
    {
        input: `
            Radha
            Shyam
        `,
        expected: {
            isValid: false,
            errorCode: 'INCONSISTENT_INDENTATION',
            message: 'Indentation is inconsistent.',
            data: []
        }
    },
    {
        input: `
            Root
             Child 1
              Grandchild 1
               Grandchild 2
              Grandchild 3
        `,
        expected: {
            isValid: false,
            errorCode: 'INCONSISTENT_INDENTATION',
            message: 'Indentation is inconsistent.',
            data: []
        }
    },
    {
        input: `
            Root
             Child 1
              Grandchild 1
               Grandchild 2
               Grandchild 3
        `,
        expected: {
            isValid: false,
            errorCode: 'INCONSISTENT_INDENTATION',
            message: 'Indentation is inconsistent.',
            data: []
        }
    },
    {
        input: "",
        expected: {
            isValid: false,
            errorCode: 'EMPTY_INPUT',
            message: 'Input is empty.',
            data: []
        }
    },
    {
        input: null,
        expected: {
            isValid: false,
            errorCode: 'EMPTY_INPUT',
            message: 'Input is empty.',
            data: []
        }
    },
    {
        input: {},
        expected: {
            isValid: false,
            errorCode: 'EMPTY_INPUT',
            message: 'Input is empty.',
            data: []
        }
    },
];

// Run tests
testCases.forEach(({ input, expected }, index) => {
    const result = validate(input);
    try {
        assert.deepStrictEqual(result, expected);
        console.log(`Test case ${index + 1} passed.`);
    } catch (error) {
        console.error(`Test case ${index + 1} failed: ${error.message}`);
    }
});
