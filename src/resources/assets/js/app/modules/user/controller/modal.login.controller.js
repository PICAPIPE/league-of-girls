angular.module('user').controller('LoginModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          modal.state = 0;

          // Change state

          modal.changeState = function($event,state)
          {
              $event.preventDefault();
              modal.state = state;
          };

          // Get class for the element

          modal.getClass    = function(stateToCheck)
          {
              return (modal.state === stateToCheck) ? 'active':'';
          };

     }
]);
