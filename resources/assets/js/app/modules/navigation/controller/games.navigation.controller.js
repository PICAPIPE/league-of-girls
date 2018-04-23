angular.module('navigation').controller('NavigationGamesCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller,store) {

          var gamesnavigation = this;
          angular.extend(gamesnavigation, $controller('BaseCtrl', {$scope: $scope}));

          gamesnavigation.storageKey = 'log_choosen_game';

          gamesnavigation.links      = [];

          // Get the css class for an element

          gamesnavigation.getClass   = function(id)
          {
              return id === store.get(gamesnavigation.storageKey) ? 'active':'';
          };

          // Click event for choosing an element

          gamesnavigation.choose     = function(e,id)
          {
              e.preventDefault();
              store.set(gamesnavigation.storageKey,id);
              $rootScope.$broadcast('chooseGame',{id:id});
          };

          // Load the navigation items

          gamesnavigation.load  = function(){

                var storageValue = store.get(gamesnavigation.storageKey);

                if(angular.isDefined(storageValue) === false || storageValue === null)
                {
                   storageValue = 'ALL';
                }

                gamesnavigation.DB.call('Games','all').then(
                  function(result){

                      var entries = result.data.data;
                      var i       = 0;

                      store.set(gamesnavigation.storageKey,storageValue);

                      gamesnavigation.links = [];

                      gamesnavigation.links[gamesnavigation.links.length] = {
                          label: '*',
                          id:    'ALL',
                          active:(storageValue === 'ALL')
                      };

                      for(i = 0; i < entries.length; i++)
                         {
                              gamesnavigation.links[gamesnavigation.links.length] = {
                                  label: entries[i].name,
                                  id:    entries[i].uuid,
                                  active:(storageValue === entries[i].uuid)
                              };
                          }

                  },
                  function(errorResult){
                      gamesnavigation.links = [];
                  }
                );



          };

          // Init the navigation

          gamesnavigation.init  = function()
          {
              gamesnavigation.load();
          };

          // Load the games

          gamesnavigation.init();

     }
]);
