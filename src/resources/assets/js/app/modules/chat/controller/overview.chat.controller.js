angular.module('chat').controller('ChatOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          if(angular.isDefined($state.params)    === true &&
             angular.isDefined($state.params.id) === true)
            {
            ctrl.uuid = $state.params.id;
            }

     }
]);
