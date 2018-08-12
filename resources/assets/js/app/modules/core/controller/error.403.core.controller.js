angular.module('core').controller('CoreError403Ctrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.headline = ctrl.LANG.getString('Keine Berechtigung');
          ctrl.text     = ctrl.LANG.getString('Auf die angeforderte Seite haben Sie keine Berechtigung. Bitte melden Sie sich an oder kontaktieren Sie den Support.');

     }
]);
