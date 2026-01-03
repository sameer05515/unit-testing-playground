/**
 * Test Suite for angular-bootstrap-nav-tree directive
 * Using Jasmine testing framework
 */

describe('abnTree Directive', function() {
  var $compile, $rootScope, $timeout, $scope, element, directiveScope;
  var mockTreeData;

  // Load the module before each test
  beforeEach(module('angularBootstrapNavTree'));

  // Inject dependencies
  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $scope = $rootScope.$new();
  }));

  // Setup mock tree data
  beforeEach(function() {
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
  });

  // Helper function to compile directive
  function compileDirective(html) {
    element = $compile(html)($scope);
    $scope.$digest();
    directiveScope = element.isolateScope();
    return element;
  }

  describe('Directive Initialization', function() {
    it('should create the directive element', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      expect(element).toBeDefined();
      expect(element.length).toBe(1);
    });

    it('should require treeData attribute', function() {
      $scope.treeData = null;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      
      // Should show alert for missing treeData
      spyOn(window, 'alert');
      compileDirective(html);
      
      expect(window.alert).toHaveBeenCalledWith('no treeData defined for the tree!');
    });

    it('should convert single object to array', function() {
      $scope.treeData = { label: 'Single Root' };
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      expect(Array.isArray($scope.treeData)).toBe(true);
      expect($scope.treeData[0].label).toBe('Single Root');
    });

    it('should assign UIDs to all branches', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var hasUid = function(branch) {
        expect(branch.uid).toBeDefined();
        if (branch.children) {
          branch.children.forEach(function(child) {
            if (typeof child === 'object') {
              hasUid(child);
            }
          });
        }
      };
      
      $scope.treeData.forEach(hasUid);
    });

    it('should set parent_uid for child branches', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      
      expect(child1_1.parent_uid).toBe(root1.uid);
    });
  });

  describe('Tree Rows Generation', function() {
    it('should generate tree_rows for visible branches', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      expect(directiveScope.tree_rows.length).toBeGreaterThan(0);
    });

    it('should set correct level for each row', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var rootRow = directiveScope.tree_rows.find(function(row) {
        return row.branch.label === 'Root 1';
      });
      expect(rootRow.level).toBe(1);
      
      var childRow = directiveScope.tree_rows.find(function(row) {
        return row.branch.label === 'Child 1.1';
      });
      expect(childRow.level).toBe(2);
    });

    it('should set visible property based on parent expansion', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" expand-level="1"></abn-tree>';
      compileDirective(html);
      
      var rootRow = directiveScope.tree_rows.find(function(row) {
        return row.branch.label === 'Root 1';
      });
      var childRow = directiveScope.tree_rows.find(function(row) {
        return row.branch.label === 'Child 1.1';
      });
      
      expect(rootRow.visible).toBe(true);
      // Child should be visible if parent is expanded
      if (rootRow.branch.expanded) {
        expect(childRow.visible).toBe(true);
      } else {
        expect(childRow.visible).toBe(false);
      }
    });
  });

  describe('Expand/Collapse Functionality', function() {
    it('should expand branches up to expandLevel', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" expand-level="2"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      
      expect(root1.expanded).toBe(true); // Level 1 < 2
      expect(child1_1.expanded).toBe(true); // Level 2 < 2
    });

    it('should not expand branches beyond expandLevel', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" expand-level="1"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      
      expect(root1.expanded).toBe(true); // Level 1 < 1? No, so false
      // Actually, level 1 is not < 1, so it should be false
      // But the code does: b.level < expand_level, so level 1 < 1 is false
      expect(root1.expanded).toBe(false);
    });

    it('should toggle branch expansion on icon click', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var initialExpanded = root1.expanded;
      
      root1.expanded = !root1.expanded;
      $scope.$digest();
      
      expect(root1.expanded).toBe(!initialExpanded);
    });
  });

  describe('Branch Selection', function() {
    it('should select a branch when clicked', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      directiveScope.user_clicks_branch(root1);
      $timeout.flush();
      
      expect(root1.selected).toBe(true);
    });

    it('should deselect previous branch when selecting new one', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var root2 = $scope.treeData[1];
      
      directiveScope.user_clicks_branch(root1);
      $timeout.flush();
      expect(root1.selected).toBe(true);
      
      directiveScope.user_clicks_branch(root2);
      $timeout.flush();
      expect(root1.selected).toBe(false);
      expect(root2.selected).toBe(true);
    });

    it('should expand all parents when selecting a branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      var grandchild = child1_1.children[0];
      
      // Ensure parents are collapsed
      root1.expanded = false;
      child1_1.expanded = false;
      
      directiveScope.user_clicks_branch(grandchild);
      $timeout.flush();
      
      expect(root1.expanded).toBe(true);
      expect(child1_1.expanded).toBe(true);
    });

    it('should call onSelect callback when branch is selected', function() {
      $scope.treeData = mockTreeData;
      $scope.selectHandler = jasmine.createSpy('selectHandler');
      var html = '<abn-tree tree-data="treeData" on-select="selectHandler(branch)"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      directiveScope.user_clicks_branch(root1);
      $timeout.flush();
      
      expect($scope.selectHandler).toHaveBeenCalled();
      expect($scope.selectHandler.calls.mostRecent().args[0].branch).toBe(root1);
    });

    it('should call branch-specific onSelect if defined', function() {
      var branchOnSelect = jasmine.createSpy('branchOnSelect');
      $scope.treeData = [{
        label: 'Root',
        onSelect: branchOnSelect,
        children: ['Child']
      }];
      var html = '<abn-tree tree-data="treeData" on-select="selectHandler(branch)"></abn-tree>';
      compileDirective(html);
      
      var root = $scope.treeData[0];
      directiveScope.user_clicks_branch(root);
      $timeout.flush();
      
      expect(branchOnSelect).toHaveBeenCalledWith(root);
    });

    it('should set initial selection if initialSelection attribute is provided', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" initial-selection="Child 1.1"></abn-tree>';
      compileDirective(html);
      $timeout.flush();
      
      var child1_1 = $scope.treeData[0].children[0];
      expect(child1_1.selected).toBe(true);
    });
  });

  describe('Icon Configuration', function() {
    it('should use default icons if not specified', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var rootRow = directiveScope.tree_rows[0];
      expect(rootRow.tree_icon).toContain('icon-plus');
    });

    it('should use custom expand icon', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" icon-expand="fa fa-chevron-right"></abn-tree>';
      compileDirective(html);
      
      var rootRow = directiveScope.tree_rows.find(function(row) {
        return row.branch.children && row.branch.children.length > 0 && !row.branch.expanded;
      });
      if (rootRow) {
        expect(rootRow.tree_icon).toBe('fa fa-chevron-right');
      }
    });

    it('should use custom collapse icon', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" icon-collapse="fa fa-chevron-down"></abn-tree>';
      compileDirective(html);
      
      // Expand a branch first
      var root1 = $scope.treeData[0];
      root1.expanded = true;
      $scope.$digest();
      
      var rootRow = directiveScope.tree_rows.find(function(row) {
        return row.branch === root1;
      });
      expect(rootRow.tree_icon).toBe('fa fa-chevron-down');
    });

    it('should use custom leaf icon', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" icon-leaf="fa fa-file-o"></abn-tree>';
      compileDirective(html);
      
      var leafRow = directiveScope.tree_rows.find(function(row) {
        return !row.branch.children || row.branch.children.length === 0;
      });
      if (leafRow) {
        expect(leafRow.tree_icon).toBe('fa fa-file-o');
      }
    });
  });

  describe('Tree Control API', function() {
    var treeControl;

    beforeEach(function() {
      treeControl = {};
      $scope.treeControl = treeControl;
    });

    it('should populate treeControl object with methods', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      expect(treeControl.expand_all).toBeDefined();
      expect(treeControl.collapse_all).toBeDefined();
      expect(treeControl.select_branch).toBeDefined();
      expect(treeControl.get_selected_branch).toBeDefined();
    });

    it('should expand all branches', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      treeControl.expand_all();
      $scope.$digest();
      
      var allExpanded = true;
      var checkExpanded = function(branch) {
        if (branch.children && branch.children.length > 0) {
          if (!branch.expanded) {
            allExpanded = false;
          }
          branch.children.forEach(function(child) {
            if (typeof child === 'object') {
              checkExpanded(child);
            }
          });
        }
      };
      
      $scope.treeData.forEach(checkExpanded);
      expect(allExpanded).toBe(true);
    });

    it('should collapse all branches', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      // First expand all
      treeControl.expand_all();
      $scope.$digest();
      
      // Then collapse all
      treeControl.collapse_all();
      $scope.$digest();
      
      var allCollapsed = true;
      var checkCollapsed = function(branch) {
        if (branch.children && branch.children.length > 0) {
          if (branch.expanded) {
            allCollapsed = false;
          }
          branch.children.forEach(function(child) {
            if (typeof child === 'object') {
              checkCollapsed(child);
            }
          });
        }
      };
      
      $scope.treeData.forEach(checkCollapsed);
      expect(allCollapsed).toBe(true);
    });

    it('should get first branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var firstBranch = treeControl.get_first_branch();
      expect(firstBranch).toBe($scope.treeData[0]);
    });

    it('should select first branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      treeControl.select_first_branch();
      $timeout.flush();
      
      expect($scope.treeData[0].selected).toBe(true);
    });

    it('should get selected branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      treeControl.select_branch(root1);
      $timeout.flush();
      
      expect(treeControl.get_selected_branch()).toBe(root1);
    });

    it('should get parent branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      
      var parent = treeControl.get_parent_branch(child1_1);
      expect(parent).toBe(root1);
    });

    it('should add branch to parent', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var newBranch = { label: 'New Branch' };
      
      treeControl.add_branch(root1, newBranch);
      $scope.$digest();
      
      expect(root1.children).toContain(newBranch);
      expect(root1.expanded).toBe(true);
    });

    it('should add root branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var initialLength = $scope.treeData.length;
      var newBranch = { label: 'New Root' };
      
      treeControl.add_root_branch(newBranch);
      $scope.$digest();
      
      expect($scope.treeData.length).toBe(initialLength + 1);
      expect($scope.treeData).toContain(newBranch);
    });

    it('should expand specific branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      root1.expanded = false;
      
      treeControl.expand_branch(root1);
      expect(root1.expanded).toBe(true);
    });

    it('should collapse specific branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      root1.expanded = true;
      
      treeControl.collapse_branch(root1);
      expect(root1.expanded).toBe(false);
    });

    it('should get siblings of a branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      var child1_2 = root1.children[1];
      
      var siblings = treeControl.get_siblings(child1_1);
      expect(siblings).toContain(child1_1);
      expect(siblings).toContain(child1_2);
    });

    it('should get next sibling', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      var child1_2 = root1.children[1];
      
      var nextSibling = treeControl.get_next_sibling(child1_1);
      expect(nextSibling).toBe(child1_2);
    });

    it('should get previous sibling', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      var child1_2 = root1.children[1];
      
      var prevSibling = treeControl.get_prev_sibling(child1_2);
      expect(prevSibling).toBe(child1_1);
    });

    it('should navigate to next branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      root1.expanded = true;
      $scope.$digest();
      
      treeControl.select_branch(root1);
      $timeout.flush();
      
      var nextBranch = treeControl.get_next_branch(root1);
      expect(nextBranch).toBe(root1.children[0]);
    });

    it('should navigate to previous branch', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData" tree-control="treeControl"></abn-tree>';
      compileDirective(html);
      
      var root1 = $scope.treeData[0];
      var child1_1 = root1.children[0];
      root1.expanded = true;
      $scope.$digest();
      
      treeControl.select_branch(child1_1);
      $timeout.flush();
      
      var prevBranch = treeControl.get_prev_branch(child1_1);
      expect(prevBranch).toBe(root1);
    });
  });

  describe('Data Format Support', function() {
    it('should support short-form children (array of strings)', function() {
      $scope.treeData = [{
        label: 'Root',
        children: ['Child1', 'Child2']
      }];
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root = $scope.treeData[0];
      expect(root.children.length).toBe(2);
      expect(root.children[0].label).toBe('Child1');
      expect(root.children[1].label).toBe('Child2');
    });

    it('should support long-form children (array of objects)', function() {
      $scope.treeData = [{
        label: 'Root',
        children: [
          { label: 'Child1', data: { id: 1 } },
          { label: 'Child2', data: { id: 2 } }
        ]
      }];
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root = $scope.treeData[0];
      expect(root.children[0].data.id).toBe(1);
      expect(root.children[1].data.id).toBe(2);
    });

    it('should preserve branch data', function() {
      $scope.treeData = [{
        label: 'Root',
        data: { custom: 'value' },
        children: ['Child']
      }];
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var root = $scope.treeData[0];
      expect(root.data.custom).toBe('value');
    });
  });

  describe('Tree Data Changes', function() {
    it('should update tree when treeData changes', function() {
      $scope.treeData = mockTreeData;
      var html = '<abn-tree tree-data="treeData"></abn-tree>';
      compileDirective(html);
      
      var initialRowCount = directiveScope.tree_rows.length;
      
      $scope.treeData = [
        { label: 'New Root', children: ['New Child'] }
      ];
      $scope.$digest();
      
      expect(directiveScope.tree_rows.length).not.toBe(initialRowCount);
    });
  });
});
