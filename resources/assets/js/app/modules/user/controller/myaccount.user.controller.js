angular.module('user').controller('UserMyAccountCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var myaccount = this;
          angular.extend(myaccount, $controller('BaseCtrl', {$scope: $scope}));

          

     }
]);
