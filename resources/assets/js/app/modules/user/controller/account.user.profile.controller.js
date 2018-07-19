angular.module('user').controller('UserAccountProfileCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,UserService,$timeout) {

          var account = this;
          var date    = new Date();
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          // Account link

          account.profile = '';

          account.init = function()
          {
              account.profile = '<account user-id="' + $state.current.uuid + '" editable="false"></account>';
          };

          account.init();

     }
]);
