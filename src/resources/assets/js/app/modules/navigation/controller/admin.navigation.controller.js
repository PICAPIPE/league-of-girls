angular.module('navigation').controller('NavigationAdminCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var adminnavigation = this;
          angular.extend(adminnavigation, $controller('BaseCtrl', {$scope: $scope}));

          adminnavigation.links = [
            {
                  state:'app.user.myaccount',
                  name: adminnavigation.LANG.getString('Mein Konto'),
                  roles: []
                },
                {
                  state:'app.pages.overview',
                  name: adminnavigation.LANG.getString('Seitenverwaltung'),
                  roles: ['Admin']
                },
                {
                  state:'app.settings.overview',
                  name: adminnavigation.LANG.getString('Einstellungen'),
                  roles: ['Admin']
                }
          ];

          adminnavigation.load  = function()
          {
             // Do stuff here
          };

          adminnavigation.init  = function()
          {
             adminnavigation.load();
          };

          // Load the other navigation items

          adminnavigation.init();

     }
]);
