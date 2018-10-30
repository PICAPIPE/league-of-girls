angular.module('user').controller('UserLoginSiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var loginsite = this;
          angular.extend(loginsite, $controller('BaseCtrl', {$scope: $scope}));

     }
]);
