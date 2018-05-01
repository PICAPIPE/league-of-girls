angular.module('user').controller('UserMyAccountEditCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$timeout',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $timeout, $controller,UserService) {

          var myaccountEdit = this;
          var date          = new Date();
          angular.extend(myaccountEdit, $controller('BaseCtrl', {$scope: $scope}));

          myaccountEdit.user           = Object.assign({},UserService.getCurrentUser());
          myaccountEdit.changeDetected = false;
          myaccountEdit.imagePath      = '/files/avatars/' + myaccountEdit.user.uuid + '?time='+ date.getTime();
          myaccountEdit.games          = [];

          myaccountEdit.acceptTypes    = 'image/*,application/pdf';

          myaccountEdit.watch = function(newValue, oldValue, scope)
          {
                if(angular.isDefined(newValue)  === true &&
                   newValue                     !== null &&
                   angular.isDefined(oldValue)  === true &&
                   oldValue                     !== null &&
                   myaccountEdit.changeDetected !== true)
                  {
                    myaccountEdit.changeDetected = !angular.equals(myaccountEdit.user, UserService.getCurrentUser());
                  }
          };

          // Save profile information

          myaccountEdit.save = function(event,data)
          {
              event.preventDefault();

              myaccountEdit.DB.call('CurrentUser','save',null,data).then(
                  function(result)
                  {

                        UserService.setCurrentUser(result.data.data);
                        $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});

                        myaccountEdit.ALERT.add({
                            'title':     myaccountEdit.LANG.getString('Profil aktualisiert'),
                            'message':   myaccountEdit.LANG.getString('Dein Profil wurde erfolgreich aktualisiert.'),
                            'autoClose': true
                        });

                        $state.go('app.user.myaccount');

                  },
                  function(errorResult)
                  {
                      myaccountEdit.ALERT.add({
                          'title':     myaccountEdit.LANG.getString('Fehler beim Speichern'),
                          'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                          'autoClose': true
                      });
                  }
              );

          };

          myaccountEdit.avatarUpdated = function(response)
          {

              myaccountEdit.imagePath      = '';

              myaccountEdit.ALERT.add({
                  'title':     myaccountEdit.LANG.getString('Avatar aktualisiert'),
                  'message':   myaccountEdit.LANG.getString('Du hast dein Profilbild erfolgreich aktualisiert.'),
                  'autoClose': true
              });

              date          = new Date();

              $timeout(function()
              {
                  myaccountEdit.imagePath      = '';
                  $scope.$apply();

                  $timeout(function()
                  {
                      myaccountEdit.imagePath      = '/files/avatars/' + myaccountEdit.user.uuid+'?time='+ date.getTime();
                      $scope.$apply();
                  },200);

              },0);
          };

          // Init the account information

          myaccountEdit.init           = function()
          {

              myaccountEdit.DB.call('Games','all').then(
                function(result)
                {
                    myaccountEdit.games = result.data.data;
                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Spiele'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Spiele aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

          };

          // Get the class for a game

          myaccountEdit.getClass        = function(gameId)
          {
              var i = 0;

              if(angular.isUndefined(myaccountEdit.user) === true)
                {
                   return;
                }

              for(i = 0; i < myaccountEdit.user.games.length; i++)
              {
                  if(gameId === myaccountEdit.user.games[i].game_id && myaccountEdit.user.games[i].active === true)
                    {
                       return 'active';
                    }
              }

              return '';

          };

          // Toogle game status

          myaccountEdit.toggleGame      = function(gameId)
          {
            var i         = 0;
            var f         = false;
            var found2Add = false;

            myaccountEdit.changeDetected = true;

            for(i = 0; i < myaccountEdit.user.games.length; i++)
            {

                if(gameId === myaccountEdit.user.games[i].game_id)
                  {
                     myaccountEdit.user.games[i].active = !myaccountEdit.user.games[i].active;
                     f                                  = true;
                     break;
                  }
            }

            if(f === false)
              {

                  myaccountEdit.DB.call('CurrentUser','addGame',null,{game:gameId}).then(
                      function(result)
                      {

                            for(i = 0; i < myaccountEdit.user.games.length; i++)
                            {
                                if(myaccountEdit.user.games[i] === result.data.data.game_id)
                                  {
                                     found2Add = true;
                                     break;
                                  }
                            }

                            if(found2Add === false)
                              {
                                  result.data.data.active                                   = true;
                                  myaccountEdit.user.games[myaccountEdit.user.games.length] = result.data.data;
                              }

                            $timeout(function()
                            {
                              $scope.$apply();
                              myaccountEdit.init();
                            });

                      },
                      function(errorResult)
                      {
                          myaccountEdit.ALERT.add({
                              'title':     myaccountEdit.LANG.getString('Fehler beim Hinzufügen des Spiels'),
                              'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                              'autoClose': true
                          });
                      }
                  );

              }

          };

          myaccountEdit.init();

          // Watchers

          $scope.$watch('myaccountEdit.user', myaccountEdit.watch, true);

     }
]);
