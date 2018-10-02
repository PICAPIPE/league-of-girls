angular.module('navigation').controller('NavigationMoreCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var morenavigation = this;
          angular.extend(morenavigation, $controller('BaseCtrl', {$scope: $scope}));

          morenavigation.links = [
            {
                label:                morenavigation.LANG.getString("Chat"),
                state:                'app.chat.overview',
                useFirstLetterAsIcon: true
            },
          ];

          morenavigation.load  = function(){



          };

          morenavigation.init  = function()
          {
                morenavigation.load();
          };

          // Load the other navigation items

          morenavigation.init();

     }
]);
