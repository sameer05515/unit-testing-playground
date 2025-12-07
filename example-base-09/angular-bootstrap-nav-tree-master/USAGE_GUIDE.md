# Angular Bootstrap Nav Tree - Usage Guide

## Overview

The `abn-tree` directive is a tree navigation component for AngularJS applications using Bootstrap CSS. It provides a hierarchical tree structure with expand/collapse functionality, branch selection, and a comprehensive API for programmatic control.

## Installation

1. Include the directive file in your HTML:
   ```html
   <script src="path/to/abn_tree_directive.js"></script>
   <link rel="stylesheet" href="path/to/abn_tree.css">
   ```

2. Add the module to your AngularJS application:
   ```javascript
   angular.module('myApp', ['angularBootstrapNavTree']);
   ```

## Basic Usage

### Minimal Example

```html
<abn-tree tree-data="myTreeData"></abn-tree>
```

```javascript
angular.module('myApp', ['angularBootstrapNavTree'])
  .controller('MyController', function($scope) {
    $scope.myTreeData = [
      {
        label: 'Documents',
        children: ['file1.txt', 'file2.txt']
      },
      {
        label: 'Images',
        children: ['photo1.jpg', 'photo2.jpg']
      }
    ];
  });
```

## Directive Attributes

### Required Attributes

- **`tree-data`** (two-way binding): The tree data structure. Can be an array of root branches or a single branch object.

### Optional Attributes

- **`tree-control`** (two-way binding): An object that will be populated with tree control methods for programmatic manipulation.
- **`on-select`** (expression): Callback function called when a branch is selected. Receives `branch` as parameter.
- **`initial-selection`** (string): Label of the branch to select initially.
- **`expand-level`** (number): Number of levels to expand by default (default: 3).
- **`icon-expand`** (string): CSS classes for expand icon (default: `'icon-plus glyphicon glyphicon-plus fa fa-plus'`).
- **`icon-collapse`** (string): CSS classes for collapse icon (default: `'icon-minus glyphicon glyphicon-minus fa fa-minus'`).
- **`icon-leaf`** (string): CSS classes for leaf node icon (default: `'icon-file glyphicon glyphicon-file fa fa-file'`).

## Data Structure

### Short Form (Simple)

Children can be an array of strings:

```javascript
$scope.treeData = [
  {
    label: 'Languages',
    children: ['JavaScript', 'Python', 'Java']
  }
];
```

### Long Form (Advanced)

Each branch is an object with properties:

```javascript
$scope.treeData = [
  {
    label: 'Animal',
    data: { id: 1, type: 'category' },
    children: [
      {
        label: 'Dog',
        data: { id: 2, description: "man's best friend" }
      },
      {
        label: 'Cat',
        data: { id: 3, description: "Felis catus" }
      }
    ]
  }
];
```

### Branch Properties

- **`label`** (required): Display text for the branch
- **`children`** (optional): Array of child branches (strings or objects)
- **`data`** (optional): Custom data object attached to the branch
- **`onSelect`** (optional): Branch-specific selection handler
- **`classes`** (optional): Array of CSS classes to apply to the branch
- **`noLeaf`** (optional): Set to `true` to prevent leaf styling even if no children

## Complete Example

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <link rel="stylesheet" href="bootstrap.min.css">
  <script src="angular.js"></script>
  <script src="abn_tree_directive.js"></script>
  <link rel="stylesheet" href="abn_tree.css">
</head>
<body ng-controller="MyController">
  <abn-tree 
    tree-data="myTreeData"
    tree-control="treeControl"
    on-select="handleSelection(branch)"
    expand-level="2"
    initial-selection="Dog"
    icon-expand="fa fa-chevron-right"
    icon-collapse="fa fa-chevron-down"
    icon-leaf="fa fa-file-o">
  </abn-tree>
  
  <div ng-if="selectedBranch">
    Selected: {{ selectedBranch.label }}
  </div>
  
  <button ng-click="treeControl.expand_all()">Expand All</button>
  <button ng-click="treeControl.collapse_all()">Collapse All</button>
</body>
</html>
```

```javascript
angular.module('myApp', ['angularBootstrapNavTree'])
  .controller('MyController', function($scope) {
    $scope.treeControl = {};
    
    $scope.myTreeData = [
      {
        label: 'Animal',
        children: [
          {
            label: 'Dog',
            data: { description: "man's best friend" }
          },
          {
            label: 'Cat',
            data: { description: "Felis catus" }
          }
        ]
      },
      {
        label: 'Vegetable',
        children: ['Carrot', 'Broccoli', 'Spinach']
      }
    ];
    
    $scope.handleSelection = function(branch) {
      $scope.selectedBranch = branch;
      console.log('Selected:', branch.label);
      if (branch.data) {
        console.log('Data:', branch.data);
      }
    };
  });
```

## Tree Control API

When you provide a `tree-control` object, it gets populated with the following methods:

### Selection Methods

- **`select_branch(branch)`**: Select a specific branch
- **`get_selected_branch()`**: Get the currently selected branch
- **`select_first_branch()`**: Select the first root branch
- **`select_next_branch(branch?)`**: Select the next branch in tree order
- **`select_prev_branch(branch?)`**: Select the previous branch in tree order
- **`select_next_sibling(branch?)`**: Select the next sibling
- **`select_prev_sibling(branch?)`**: Select the previous sibling
- **`select_parent_branch(branch?)`**: Select the parent of the current branch

### Navigation Methods

- **`get_first_branch()`**: Get the first root branch
- **`get_next_branch(branch?)`**: Get the next branch without selecting it
- **`get_prev_branch(branch?)`**: Get the previous branch without selecting it
- **`get_next_sibling(branch?)`**: Get the next sibling
- **`get_prev_sibling(branch?)`**: Get the previous sibling
- **`get_parent_branch(branch)`**: Get the parent branch
- **`get_siblings(branch?)`**: Get all siblings of a branch
- **`get_children(branch)`**: Get children of a branch
- **`get_first_child(branch?)`**: Get the first child

### Expansion Methods

- **`expand_all()`**: Expand all branches
- **`collapse_all()`**: Collapse all branches
- **`expand_branch(branch?)`**: Expand a specific branch
- **`collapse_branch(branch?)`**: Collapse a specific branch

### Modification Methods

- **`add_branch(parent, newBranch)`**: Add a branch to a parent (or root if parent is null)
- **`add_root_branch(newBranch)`**: Add a new root branch

### Usage Example

```javascript
$scope.treeControl = {};

// Later in your code:
$scope.expandEverything = function() {
  $scope.treeControl.expand_all();
};

$scope.selectFirst = function() {
  $scope.treeControl.select_first_branch();
};

$scope.addNewItem = function() {
  var selected = $scope.treeControl.get_selected_branch();
  $scope.treeControl.add_branch(selected, {
    label: 'New Item',
    data: { id: Date.now() }
  });
};
```

## Branch-Specific Selection Handlers

You can define a custom `onSelect` handler for individual branches:

```javascript
$scope.treeData = [
  {
    label: 'Special Branch',
    onSelect: function(branch) {
      alert('Special branch selected: ' + branch.label);
    },
    children: ['Child 1', 'Child 2']
  }
];
```

If a branch has its own `onSelect`, it takes precedence over the tree-level `on-select` attribute.

## Styling

The directive uses Bootstrap classes and adds:
- `.abn-tree`: Main tree container
- `.abn-tree-row`: Each tree row
- `.level-{n}`: Level-specific classes (e.g., `.level-1`, `.level-2`)
- `.active`: Applied to selected branches
- `.leaf`: Applied to leaf nodes (branches without children)

You can add custom classes to branches:

```javascript
$scope.treeData = [{
  label: 'Special Item',
  classes: ['highlight', 'important'],
  children: ['Child']
}];
```

## Common Patterns

### Dynamic Tree Loading

```javascript
$scope.loadTreeData = function() {
  $scope.treeData = [];
  $scope.loading = true;
  
  $http.get('/api/tree').then(function(response) {
    $scope.treeData = response.data;
    $scope.loading = false;
    if ($scope.treeControl.expand_all) {
      $scope.treeControl.expand_all();
    }
  });
};
```

### Filtering Tree Data

```javascript
$scope.filterTree = function(searchTerm) {
  // Filter logic here
  $scope.filteredTreeData = filterFunction($scope.treeData, searchTerm);
};
```

### Adding Branches Dynamically

```javascript
$scope.addChild = function() {
  var selected = $scope.treeControl.get_selected_branch();
  if (selected) {
    $scope.treeControl.add_branch(selected, {
      label: 'New Child',
      data: { timestamp: new Date() }
    });
  }
};
```

## Browser Compatibility

- AngularJS 1.0+
- Bootstrap 2.3+ or Bootstrap 3+
- Modern browsers (Chrome, Firefox, Safari, Edge)

## Notes

- The directive automatically assigns unique IDs (`uid`) to all branches
- Parent-child relationships are tracked via `parent_uid`
- Branch state (expanded, selected) is maintained in the branch objects themselves
- The directive watches `treeData` for changes and updates the tree accordingly
- Use `$timeout` if you need to ensure tree operations complete before accessing results

## Troubleshooting

**Tree not displaying:**
- Ensure `treeData` is defined and is an array or object with a `label` property
- Check browser console for errors
- Verify AngularJS and Bootstrap are loaded

**Selection not working:**
- Ensure `on-select` callback is properly defined
- Check that branches have unique labels if using `initial-selection`

**Icons not showing:**
- Verify icon CSS classes are correct
- Ensure icon font (Glyphicons, Font Awesome) is loaded
- Check `icon-expand`, `icon-collapse`, and `icon-leaf` attributes
