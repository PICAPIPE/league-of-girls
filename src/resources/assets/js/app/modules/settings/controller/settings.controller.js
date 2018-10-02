angular.module('settings').controller('SettingsOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          // Sites of settings
          ctrl.links = [];

          ctrl.$onInit = function()
          {
              var states    = $state.get();
              var statei    = 0;
              var stateList = [];

              // Create list of entries which are setting pages
              for (statei = 0; statei < states.length; statei++)
                     {
                     if (states[statei].showAtSettings === true)
                           {
                           stateList[stateList.length] = states[statei];
                           }
                     }

              ctrl.links = stateList;
          };

     }
]);
