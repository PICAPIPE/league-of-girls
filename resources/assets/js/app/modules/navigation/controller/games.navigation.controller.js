angular.module('navigation').controller('NavigationGamesCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var gamesnavigation = this;
          angular.extend(gamesnavigation, $controller('BaseCtrl', {$scope: $scope}));

          gamesnavigation.links = [

          ];

          gamesnavigation.load  = function(){

            gamesnavigation.DB.call('Status','check').then(
              function(result){

              },
              function(errorResult){
                  console.log(errorResult);
              }
            );

                gamesnavigation.DB.call('Games','all').then(
                  function(result){

                  },
                  function(errorResult){
                      console.error('NOPE');
                  }
                );

          };

          gamesnavigation.init  = function()
          {
              gamesnavigation.load();
          };

          // Load the games

          gamesnavigation.init();

     }
]);
