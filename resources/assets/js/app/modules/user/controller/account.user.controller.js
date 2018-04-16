angular.module('user').controller('UserAccountCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var account = this;
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          console.error(account);

     }
]);
