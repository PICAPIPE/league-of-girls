angular.module('user').controller('UserPanelCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var userpanel = this;
          angular.extend(userpanel, $controller('BaseCtrl', {$scope: $scope}));

          // Variables


          userpanel.user     = null;
          userpanel.username = null;

          // Init function

          userpanel.init = function()
          {

                // Get the user information
                userpanel.user = UserService.getCurrentUser();

          };

          // Init

          userpanel.init();

     }
]);
