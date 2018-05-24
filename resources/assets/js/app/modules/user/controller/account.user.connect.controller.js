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

          connect.user    = UserService.getCurrentUser();

          connect.$onInit = function () {

              connect.init();

          };

          // Init the account information

          connect.init           = function()
          {
              connect.user    = UserService.getCurrentUser();
          };

          // Connect with user

          connect.connect        = function()
          {
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
                          'title':     connect.LANG.getString('Fehler bei de Freundschaftsanfrage'),
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

          // Check if the user is connected

          connect.isConnected    = function()
          {
              var i         = 0;
              var connected = false;

              if(connect.user.uuid === connect.userId)
                {
                return null;
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

     }
]);
