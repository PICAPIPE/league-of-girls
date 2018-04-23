angular.module('chat').controller('ChatCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var chat = this;
          angular.extend(chat, $controller('BaseCtrl', {$scope: $scope}));

          chat.channel   = null;

          chat.fields    = [
            {

            }
          ];

          chat.fieldData = {};

          chat.send      = function(event)
          {

          };

          chat.read      = function()
          {

          };

          chat.init      = function()
          {

          };

          chat.init();

     }
]);
