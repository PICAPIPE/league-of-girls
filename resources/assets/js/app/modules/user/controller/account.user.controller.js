angular.module('user').controller('UserAccountCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var account = this;
          var date    = new Date();
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          account.user           = UserService.getCurrentUser();
          account.imagePath      = '/files/avatars/' + account.user.uuid + '?time='+ date.getTime();

          account.games          = [];

          // Init the account information

          account.init           = function()
          {

              account.DB.call('Games','all').then(
                function(result)
                {
                    account.games = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Spiele'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Spiele aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

          };

          // Get the class for a game

          account.getClass        = function(gameId)
          {
              var i = 0;

              if(angular.isDefined(account.user) === false)
                {
                   return '';
                }

              for(i = 0; i < account.user.games.length; i++)
              {
                  if(gameId === account.user.games[i].game_id && account.user.games[i].active === true)
                    {
                       return 'active';
                    }
              }

              return '';

          };

          account.init();

     }
]);
