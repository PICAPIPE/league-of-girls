angular.module('user').controller('UserPanelCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var userpanel = this;
          angular.extend(userpanel, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          userpanel.username = null;

          // Init function

          userpanel.init = function()
          {

                

          };

          // Init

          userpanel.init();

     }
]);
