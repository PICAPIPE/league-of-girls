angular.module('dashboard').controller('DashboardCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var dashboard = this;
          angular.extend(dashboard, $controller('BaseCtrl', {$scope: $scope}));

          dashboard.user = dashboard.USER.getCurrentUser();

          // Links

          dashboard.link = [];

          // Init

          dashboard.$onInit = function () {

          };

     }
]);
