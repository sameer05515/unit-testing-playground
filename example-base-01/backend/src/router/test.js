const input = `
Root
 Child 1
  Grandchild 1
   Grandchild 2
 Child 2
  Grandchild 3
`;

const seperator = "\n\n--------------\n";

const getStringifiedObject = (data, beautify = false) =>
  JSON.stringify(data, null, beautify ? 2 : 0);

const getLinesAndIndentationLevel = (input) =>
  (input?.trim().split("\n") || []).map((line) => ({
    name: line.trim(),
    level: line.search(/\S/),
  }));

// parse input string into treeData, by identifying its indentation
const parseTreeDataV1 = (input) => {
  // 1. get lines and indentationLevel
  const lines = input.trim().split("\n");
  const stack = [];

  lines.forEach((line) => {
    const level = line.search(/\S/); // Indentation level
    const node = { name: line.trim(), children: [] };

    while (stack.length > level) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
    // console.log('Stack status', getStringifiedObject(stack, false), '\n\n--------------\n')
  });

  return stack.length > 0 ? stack : [];
};

// const differentWaysToGenerateTreeData = parseTreeDataV1(input);
// Step 1. Get lines from given input
console.clear();

console.log(new Date().toString(),"\nStep 1. Get lines from given input");
const linesArray=getLinesAndIndentationLevel(input);
console.log(
  "All lines",
  getStringifiedObject(linesArray),
  seperator
);

console.log('Step 2: get distinct levels from lines array');
// const distinctLevels=linesArray?.map(({level}))

// console.log('Result Data: ', getStringifiedObject(differentWaysToGenerateTreeData, true));
