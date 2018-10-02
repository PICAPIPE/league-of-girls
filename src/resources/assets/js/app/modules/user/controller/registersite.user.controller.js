angular.module('user').controller('UserRegisterSiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var registersite = this;
          angular.extend(registersite, $controller('BaseCtrl', {$scope: $scope}));

     }
]);
