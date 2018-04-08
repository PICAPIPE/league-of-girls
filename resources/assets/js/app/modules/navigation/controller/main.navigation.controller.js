angular.module('navigation').controller('NavigationMainCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var mainnavigation = this;
          angular.extend(mainnavigation, $controller('BaseCtrl', {$scope: $scope}));

          mainnavigation.links = [
            {
                label:                mainnavigation.LANG.getString("Chat"),
                state:                'chat.overview',
                useFirstLetterAsIcon: true
            },
            {
                label:                mainnavigation.LANG.getString("News"),
                state:                'news.overview',
                useFirstLetterAsIcon: true
            },
            {
                label:                mainnavigation.LANG.getString("Meet"),
                state:                'meet.overview',
                useFirstLetterAsIcon: true
            }
          ];
 
     }
]);
