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
          gamesnavigation.game       = '';
          gamesnavigation.gameAbort  = false;

          gamesnavigation.links      = [];


          // Get the css class for an element

          gamesnavigation.getClass   = function(id)
          {
              return id === store.get(gamesnavigation.storageKey) ? 'active':'';
          };

          // Click event for choosing an element

          gamesnavigation.choose     = function(e,id)
          {
              if (angular.isDefined(e) === true && e !== null)
                    {
                    e.preventDefault();
                    }
              
              gamesnavigation.gameAbort = true;
              gamesnavigation.game      = gamesnavigation.chooseFromArray(id);
              store.set(gamesnavigation.storageKey,id);
              $rootScope.$broadcast('chooseGame',{id:id});
          };

          gamesnavigation.chooseFromArray = function(id)
          {
              var i = 0;
              for (i = 0; i < gamesnavigation.links.length; i++)
                    {
                    if (gamesnavigation.links[i].id === id)
                          {
                          return gamesnavigation.links[i];
                          }
                    }
              return gamesnavigation.links[0];
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
                                  label: entries[i].short,
                                  id:    entries[i].uuid,
                                  active:(storageValue === entries[i].uuid)
                              };
                          }

                      gamesnavigation.game      = gamesnavigation.chooseFromArray(storageValue);
                      gamesnavigation.gameAbort = false;

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

          // Watchers 

          $scope.$watch('gamesnavigation.game', function (newValue,oldValue){
            var value = '';
            if (angular.isObject(newValue) === true)
                 {
                 value = newValue.id;
                 }
            else {
                 value = newValue;
                 }
            if (angular.isDefined(value) === false || value === '')
                 {
                 return;
                 }
            if (gamesnavigation.gameAbort === true)
                 {
                 gamesnavigation.gameAbort = false;
                 return;
                 }
            gamesnavigation.choose (null, value);
          },true);

     }
]);
