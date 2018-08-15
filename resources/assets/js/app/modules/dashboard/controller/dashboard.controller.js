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

          // Links Administration

          dashboard.linksAdminstration = [
            {
              state:'app.user.myaccount',
              name: dashboard.LANG.getString('Mein Konto'),
              roles: []
            },
            {
              state:'app.pages.overview',
              name: dashboard.LANG.getString('Seitenverwaltung'),
              roles: ['Admin']
            },
            {
              state:'app.settings.overview',
              name: dashboard.LANG.getString('Einstellungen'),
              roles: ['Admin']
            }
          ];

     }
]);
