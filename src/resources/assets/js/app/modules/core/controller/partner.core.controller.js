angular.module('core').controller('CorePartnerCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var partner = this;
          angular.extend(partner, $controller('BaseCtrl', {$scope: $scope}));

          partner.headline = 'Partner';

     }
]);
