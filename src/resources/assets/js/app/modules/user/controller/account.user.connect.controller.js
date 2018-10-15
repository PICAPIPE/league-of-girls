angular.module('user').controller('UserConnectCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,UserService,$timeout) {

          var connect = this;
          var date    = new Date();
          angular.extend(connect, $controller('BaseCtrl', {$scope: $scope}));

          connect.user            = UserService.getCurrentUser();
          connect.userRequestUuid = null;

          connect.$onInit = function () {

              connect.init();

          };

          // Init the account information

          connect.init           = function()
          {
              $rootScope.$broadcast('requestUserUpdate');
          };

          // Connect with user

          connect.connect        = function()
          {


              if(angular.isUndefined(connect.user) === true || connect.user === null)
                {
                return;
                }

              if(connect.user.uuid === connect.userId)
                {
                return;
                }

              connect.DB.call('Users','request',{uuid:connect.userId},null).then(
                  function(result)
                  {

                      if (result.data.refresh === true)
                          {
                            connect.ALERT.add({
                                'title':     connect.LANG.getString('Du bist nun verbunden!'),
                                'message':   connect.LANG.getString('Da bereits eine Freundschaftsanfrage existierte, bist du nun mit der/dem gewünschte/n Benutzer/in verbunden.'),
                                'autoClose': true
                            });

                            $rootScope.$broadcast('requestUserUpdate');
                          }
                      else
                          {
                            connect.ALERT.add({
                                'title':     connect.LANG.getString('Freundschaftsanfrage erfolgreich abgeschickt!'),
                                'message':   connect.LANG.getString('Deine Freundschaftsanfrage wurde erfolgreich abgeschickt.'),
                                'autoClose': true
                            });
                          }

                      connect.init();
                  },
                  function(errorResult)
                  {
                      connect.ALERT.add({
                          'title':     connect.LANG.getString('Fehler bei der Freundschaftsanfrage'),
                          'message':   errorResult.data.message,
                          'autoClose': true
                      });
                      connect.init();
                  }
              );
          };

          // Deconnect with user

          connect.deconnect      = function()
          {

              var uuid = null;
              var i    = 0;
              var f    = -1;

              if(angular.isUndefined(connect.user) === true || connect.user === null)
                {
                return;
                }

              if(connect.user.uuid === connect.userId)
                {
                return;
                }

              for(i = 0; i < connect.user.friends.length; i++)
                 {
                 if(connect.user.friends[i].from.uuid === connect.userId)
                   {
                   uuid = connect.user.friends[i].uuid;
                   f    = i;
                   break;
                   }
                 }

              if(uuid === null)
                {
                return;
                }

              connect.DB.call('FriendRequests','destroy',uuid).then(
                  function(result)
                  {
                      connect.init();

                      connect.ALERT.add({
                          'title':     connect.LANG.getString('Freundschaft wurde beendet!'),
                          'message':   connect.LANG.getString('Die Freundschaft zwischen euch beiden wurde beendet und sämtliche Nachrichten zwischen euch werden gelöscht.'),
                          'autoClose': true
                      });

                      connect.user.friends.splice(f,1);

                      $rootScope.$broadcast('requestUserUpdate');

                  },
                  function(errorResult)
                  {
                      connect.ALERT.add({
                          'title':     connect.LANG.getString('Freundschaft konnte nicht beendet werden!'),
                          'message':   connect.LANG.getString('Es ist ein Fehler beim Löschen der Freundschaft aufgetreten. Versuche es erneut oder kontaktiere den Support.'),
                          'autoClose': true
                      });
                  }
              );

          };

          // Remove friedship request

          connect.connectStop    = function()
          {
            connect.DB.call('FriendRequests','destroy',connect.userRequestUuid).then(
                function(result)
                {
                    var i = 0;
                    connect.init();

                    connect.ALERT.add({
                        'title':     connect.LANG.getString('Freundschaftanfrage zurückgezogen'),
                        'message':   connect.LANG.getString('Die Freundschaftsanfrage wurde beendet.'),
                        'autoClose': true
                    });

                    for (i = 0; i < connect.user.open_requests.length; i++)
                          {
                          if (connect.user.open_requests[i].user.uuid === connect.userRequestUuid)
                                {
                                connect.user.open_requests.splice(i,1);
                                break;
                                }
                          }

                    $rootScope.$broadcast('requestUserUpdate');

                },
                function(errorResult)
                {
                    connect.ALERT.add({
                        'title':     connect.LANG.getString('Freundschaftsanfrage konnte nicht beendet werden!'),
                        'message':   connect.LANG.getString('Es ist ein Fehler beim Löschen der Freundschaftsanfrage aufgetreten. Versuche es erneut oder kontaktiere den Support.'),
                        'autoClose': true
                    });
                }
            );
          };

          // Create mesasge

          connect.createMessage   = function()
          {
            connect.DB.call('Chats','get',{'type':'private','uuid':connect.userId}).then(
              function(result)
              {
                  if(angular.isDefined(result.data.chat) === true)
                    {
                    $state.go('app.chat.detail',{id:result.data.chat});
                    $rootScope.$broadcast('$modalClose');
                    return;
                    }
              },
              function(errorResult)
              {
                connect.ALERT.add({
                    'title':     connect.LANG.getString('Fehler beim Erstellen einer Nachricht.'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }
            );
          };

          // Check if the user is connected

          connect.isConnected    = function()
          {
              var i         = 0;
              var connected = false;

              if(angular.isUndefined(connect.user) === true || connect.user === null || connect.user.uuid === connect.userId || angular.isUndefined(connect.user.friends) === true)
                {
                return connected;
                }

              for(i = 0; i < connect.user.friends.length; i++)
                 {
                 if(connect.user.friends[i].from.uuid === connect.userId)
                   {
                   connected = true;
                   break;
                   }
                 }

              return connected;

          };

          // Checks if the user appears in the current requests list
          connect.isOpenRequest = function()
          {
              var found = false;
              var i     = 0;

              connect.userRequestUuid = null;

              if(angular.isUndefined(connect.user) === true || connect.user === null || connect.user.uuid === connect.userId || angular.isUndefined(connect.user.open_requests) === true)
                {
                return found;
                }

              for (i = 0; i < connect.user.open_requests.length; i++)
                    {
                    if (connect.user.open_requests[i].user.uuid === connect.userId)
                          {
                          found = true;
                          connect.userRequestUuid = connect.user.open_requests[i].uuid;
                          break;
                          }
                    }

              return found;
          };

          // Hear on user logged callback

          $rootScope.$on('userLogged', function(event,args) {
              connect.user = args.user;
              $timeout(function()
              {
                $scope.$apply();
              });
          });

     }
]);
