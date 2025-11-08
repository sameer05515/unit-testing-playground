var ngModule = angular.module("MultiplicationApp", []);

ngModule.directive("multiplicationTable", [
  function () {
    return {
      templateUrl: "multiplication-table-tpl.html",
      controllerAs: "ctrl",
      transclude: true,
      bindToController: true,
      scope: {
        x: "=",
        y: "=",
      },
      controller: [
        "$scope",
        function ($scope) {
          var ctrl = this;

          function buildTable(x, y) {
            x = x || 0;
            y = y || 0;

            var table = (ctrl.rows = []);
            for (var i = 0; i < y; i++) {
              var array = (table[i] = []);
              for (var j = 0; j < x; j++) {
                array.push(1);
              }
            }
          }

          ctrl.$onInit = function () {
            buildTable(ctrl.x, ctrl.y);
          };

          $scope.$watchGroup(
            [
              function () {
                return ctrl.x;
              },
              function () {
                return ctrl.y;
              },
            ],
            function (newValues, oldValues) {
              if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1]) {
                buildTable(ctrl.x, ctrl.y);
              }
            },
          );
        },
      ],
    };
  },
]);

ngModule.directive("multiplicationCell", [
  function () {
    return {
      controllerAs: "multiplication",
      controller: [
        "$attrs",
        "$scope",
        function ($attrs, $scope) {
          this.x = $scope.$eval($attrs.x);
          this.y = $scope.$eval($attrs.y);
          this.value = this.x * this.y;
        },
      ],
    };
  },
]);
