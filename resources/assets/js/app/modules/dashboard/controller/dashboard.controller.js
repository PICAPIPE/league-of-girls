angular.module('dashboard').controller('DashboardCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var dashboard = this;
          angular.extend(dashboard, $controller('BaseCtrl', {$scope: $scope}));

          dashboard.user  = dashboard.USER.getCurrentUser();

          // Links

          dashboard.links = [
              {
                state:'app.user.myaccount',
                name: dashboard.LANG.getString('Mein Konto'),
              },
              {
                state:'app.imprint',
                name: dashboard.LANG.getString('Impressum'),
              },
              {
                state:'app.privacy',
                name: dashboard.LANG.getString('Datenschutz'),
              }
          ];

          // Init

          dashboard.$onInit = function () {

          };

     }
]);
