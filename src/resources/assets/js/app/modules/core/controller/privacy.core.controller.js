angular.module('core').controller('CorePrivacyCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var privacy = this;
          angular.extend(privacy, $controller('BaseCtrl', {$scope: $scope}));

          privacy.headline = 'Datenschutz';

     }
]);
