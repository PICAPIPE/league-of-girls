angular.module('user').controller('UserAccountCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var account = this;
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          console.error(account);

          account.user = UserService.getCurrentUser()

     }
]);
