angular.module('core').controller('CoreImprintCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var imprint = this;
          angular.extend(imprint, $controller('BaseCtrl', {$scope: $scope}));

          imprint.headline = 'Impressum';

     }
]);
