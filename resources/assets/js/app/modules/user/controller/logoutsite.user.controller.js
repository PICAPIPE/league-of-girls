angular.module('user').controller('UserLogoutSiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$timeout',
     '$controller',
     function($scope, $rootScope, $state, $window,$timeout, $controller) {

          var logoutsite = this;
          angular.extend(logoutsite, $controller('BaseCtrl', {$scope: $scope}));

          logoutsite.seconds = 3;

          logoutsite.init    = function()
          {
               if    (logoutsite.seconds === 1)
                     {
                         $timeout(function(){
                            window.location.href = '/auth/logout-now';
                         },1000);
                     }
                else {

                          logoutsite.seconds--;

                          $timeout(function(){
                             logoutsite.init();
                          },1000);

                     }
          };

          logoutsite.init();

     }
]);
