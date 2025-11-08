describe("MultiplicationApp directives", function () {
  beforeEach(module("MultiplicationApp"));
  beforeEach(module("templates"));

  describe("multiplicationTable", function () {
    var $compile, $rootScope;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    function compileTable(scopeValues) {
      var scope = $rootScope.$new();
      scope.x = scopeValues.x;
      scope.y = scopeValues.y;
      var element = $compile('<div multiplication-table x="x" y="y"></div>')(scope);
      scope.$digest();
      return {
        element: element,
        scope: scope,
        controller: element.isolateScope().ctrl,
      };
    }

    it("creates rows and columns matching x and y inputs", function () {
      var compiled = compileTable({ x: 5, y: 3 });
      var ctrl = compiled.controller;

      expect(ctrl.rows.length).toBe(3);
      ctrl.rows.forEach(function (row) {
        expect(row.length).toBe(5);
      });
    });

    it("rebuilds the table when x or y change", function () {
      var compiled = compileTable({ x: 4, y: 2 });
      var ctrl = compiled.controller;

      expect(ctrl.rows.length).toBe(2);
      expect(ctrl.rows[0].length).toBe(4);

      compiled.scope.x = 6;
      compiled.scope.$digest();

      expect(ctrl.rows.length).toBe(2);
      expect(ctrl.rows[0].length).toBe(6);

      compiled.scope.y = 4;
      compiled.scope.$digest();

      expect(ctrl.rows.length).toBe(4);
      ctrl.rows.forEach(function (row) {
        expect(row.length).toBe(6);
      });
    });
  });

  describe("multiplicationCell", function () {
    var $compile, $rootScope;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it("computes the product of x and y", function () {
      var scope = $rootScope.$new();
      scope.xVal = 7;
      scope.yVal = 8;

      var element = $compile('<div multiplication-cell x="xVal" y="yVal"></div>')(scope);
      scope.$digest();

      var controller = element.controller("multiplicationCell");
      expect(controller.x).toBe(7);
      expect(controller.y).toBe(8);
      expect(controller.value).toBe(56);
    });
  });
});
