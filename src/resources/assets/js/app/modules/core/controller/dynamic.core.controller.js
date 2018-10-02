angular.module('core').controller('CoreDynamicCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var site = this;
          angular.extend(site, $controller('BaseCtrl', {$scope: $scope}));

          site.data = {};

          // Push the site data to the variable
          site.$onInit = function()
          {
              site.data = site.STATE;
          };

     }
]);
