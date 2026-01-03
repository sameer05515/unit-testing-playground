# Test Suite for abn-tree Directive

## Overview

This directory contains comprehensive unit tests for the `abn-tree` AngularJS directive using the Jasmine testing framework.

## Test Files

- **`abn_tree_directive.spec.js`**: Complete test suite covering all directive functionality
- **`test-runner.html`**: HTML file to run tests in a browser

## Running Tests

### Option 1: Browser Runner

1. Open `test-runner.html` in a web browser
2. Tests will run automatically and display results

### Option 2: Using Karma (Recommended for CI/CD)

Install Karma and dependencies:

```bash
npm install --save-dev karma karma-jasmine karma-chrome-launcher karma-angularjs
```

Create `karma.conf.js`:

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/abn_tree_directive.js',
      'test/abn_tree_directive.spec.js'
    ],
    browsers: ['Chrome'],
    singleRun: true
  });
};
```

Run tests:

```bash
npx karma start
```

## Test Coverage

The test suite covers:

### 1. Directive Initialization
- Element creation
- Required attributes validation
- Data format conversion (single object to array)
- UID assignment
- Parent-child relationship tracking

### 2. Tree Rows Generation
- Row generation for visible branches
- Level assignment
- Visibility based on parent expansion

### 3. Expand/Collapse Functionality
- Default expansion levels
- Branch expansion toggling
- Icon state changes

### 4. Branch Selection
- Branch selection on click
- Previous branch deselection
- Parent expansion on selection
- Selection callbacks (global and branch-specific)
- Initial selection

### 5. Icon Configuration
- Default icons
- Custom expand/collapse icons
- Custom leaf icons

### 6. Tree Control API
- All API methods population
- Expand/collapse operations
- Selection operations
- Navigation methods
- Branch manipulation (add, remove)

### 7. Data Format Support
- Short-form children (array of strings)
- Long-form children (array of objects)
- Data preservation

### 8. Tree Data Changes
- Dynamic tree updates
- Watch functionality

## Test Structure

Each test suite is organized by functionality:

```javascript
describe('Feature Name', function() {
  beforeEach(function() {
    // Setup
  });
  
  it('should do something specific', function() {
    // Test implementation
  });
});
```

## Mock Data

Tests use a consistent mock tree structure:

```javascript
mockTreeData = [
  {
    label: 'Root 1',
    children: [
      {
        label: 'Child 1.1',
        children: ['Grandchild 1.1.1', 'Grandchild 1.1.2']
      },
      {
        label: 'Child 1.2',
        data: { id: 123 }
      }
    ]
  },
  {
    label: 'Root 2',
    children: ['Child 2.1', 'Child 2.2']
  }
];
```

## Dependencies

Tests require:
- AngularJS 1.2+
- Angular Mocks (for testing utilities)
- Jasmine 3.x
- Bootstrap CSS (for directive styling, not required for tests)

## Writing New Tests

To add new tests:

1. Identify the feature to test
2. Add a new `describe` block or add to existing one
3. Use the helper function `compileDirective()` to create directive instances
4. Use `$timeout.flush()` when testing async operations
5. Use `$scope.$digest()` to trigger digest cycles

Example:

```javascript
it('should handle new feature', function() {
  $scope.treeData = mockTreeData;
  var html = '<abn-tree tree-data="treeData"></abn-tree>';
  compileDirective(html);
  
  // Your test assertions
  expect(something).toBe(expected);
});
```

## Debugging Tests

1. Open browser developer tools
2. Set breakpoints in test file
3. Use `console.log()` for debugging
4. Check Jasmine output for detailed error messages

## Continuous Integration

For CI/CD pipelines, use Karma with headless browsers:

```bash
# Install headless Chrome
npm install --save-dev karma-chrome-headless

# Update karma.conf.js to use ChromeHeadless
browsers: ['ChromeHeadless']
```
