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
          myaccountEdit.plattforms     = [];

          myaccountEdit.acceptTypes    = 'image/*,application/pdf';

          myaccountEdit.watch = function(newValue, oldValue, scope)
          {
                var i = 0;

                if(angular.isDefined(newValue)  === true &&
                   newValue                     !== null &&
                   angular.isDefined(oldValue)  === true &&
                   oldValue                     !== null &&
                   myaccountEdit.changeDetected !== true)
                  {
                    myaccountEdit.changeDetected = !angular.equals(myaccountEdit.user, UserService.getCurrentUser());
                  }

                if(angular.isUndefined(newValue.plattforms) === true)
                  {
                     return;
                  }

                for(i = 0; i < newValue.plattforms.length; i++)
                {
                    if(newValue.plattforms[i].value.length > 0)
                          {
                              newValue.plattforms[i].active = true;
                          }
                    else  {
                             newValue.plattforms[i].active = false;
                          }
                }

          };

          myaccountEdit.watchPlattforms       = function(newValue, oldValue, scope)
          {
                var i = 0;
                var j = 0;

                myaccountEdit.changeDetected = true;

                for(i = 0; i < newValue.length; i++)
                {

                    for(j = 0; j < myaccountEdit.user.plattforms.length; j++)
                    {

                        if(myaccountEdit.user.plattforms[j].plattform_id === newValue[i].id)
                        {
                              myaccountEdit.user.plattforms[j].value = newValue[i].value;
                              break;
                        }

                    }

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

          // Setup the value field

          myaccountEdit.setUpValue    = function()
          {
              var i = 0;
              var j = 0;

              for(j = 0; j < myaccountEdit.user.plattforms.length; j++)
              {
                  for(i = 0; i < myaccountEdit.plattforms.length; i++)
                  {
                      if(myaccountEdit.plattforms[i].id === myaccountEdit.user.plattforms[j].plattform_id)
                      {
                          myaccountEdit.plattforms[i].value = myaccountEdit.user.plattforms[j].value;
                          break;
                      }
                  }
              }
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

                    $timeout(function(){
                      $scope.$apply();
                    });

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

              myaccountEdit.DB.call('Plattforms','all').then(
                function(result)
                {

                    myaccountEdit.plattforms = result.data.data;

                    myaccountEdit.setUpValue();

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Platformen'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
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

          // Get the class for a plattform

          myaccountEdit.getPlattformClass        = function(plattformId)
          {
              var i = 0;

              if(angular.isUndefined(myaccountEdit.user) === true)
                {
                   return;
                }

              for(i = 0; i < myaccountEdit.user.plattforms.length; i++)
              {

                  if(plattformId === myaccountEdit.user.plattforms[i].plattform_id && myaccountEdit.user.plattforms[i].active === true)
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

          // Toogle game status

          myaccountEdit.togglePlattform      = function(plattformId,noSet)
          {
            var i         = 0;
            var iF        = -1;
            var f         = false;
            var found2Add = false;

            if(angular.isUndefined(noSet) === true)
            {
               noSet = false;
            }

            myaccountEdit.changeDetected = true;

            for(i = 0; i < myaccountEdit.user.plattforms.length; i++)
            {

                if(plattformId === myaccountEdit.user.plattforms[i].plattform_id)
                  {
                     if(noSet === false)
                     {
                     myaccountEdit.user.plattforms[i].active = !myaccountEdit.user.plattforms[i].active;
                     }
                     f                                  = true;
                     iF                                 = i;
                     break;
                  }
            }

            if(f === false)
              {

                  myaccountEdit.DB.call('CurrentUser','addPlattform',null,{plattform:plattformId}).then(
                      function(result)
                      {

                            for(i = 0; i < myaccountEdit.user.plattforms.length; i++)
                            {
                                if(myaccountEdit.user.plattforms[i] === result.data.data.plattform_id)
                                  {
                                     found2Add = true;
                                     break;
                                  }
                            }

                            if(found2Add === false)
                              {
                                  myaccountEdit.user.plattforms[myaccountEdit.user.plattforms.length] = result.data.data;
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
                              'title':     myaccountEdit.LANG.getString('Fehler beim Hinzufügen der Plattform'),
                              'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                              'autoClose': true
                          });
                      }
                  );

              }

          };

          myaccountEdit.init();

          // Watchers

          $scope.$watch('myaccountEdit.user',       myaccountEdit.watch,           true);
          $scope.$watch('myaccountEdit.plattforms', myaccountEdit.watchPlattforms, true);

     }
]);
