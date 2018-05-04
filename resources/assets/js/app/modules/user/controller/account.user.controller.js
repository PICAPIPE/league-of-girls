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
          account.plattforms     = [];
          account.commnunications= [];
          account.link           = [];

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

              account.DB.call('Plattforms','all').then(
                function(result)
                {
                    account.plattforms = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Plattformen'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              account.DB.call('Communications','all').then(
                function(result)
                {
                    account.commnunications = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Kommunikationsmethoden'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kommunikationsmethoden aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              account.DB.call('Links','all').then(
                function(result)
                {
                    account.links = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Linktypen'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Linktypen aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

          };

          // Get the class for a game

          account.getClass        = function(gameId)
          {
              return account.getHelperClass('games','game_id',gameId);
          };

          // Get the class for a plattform

          account.getPlattformClass        = function(plattformId)
          {
              return account.getHelperClass('plattforms','plattform_id',plattformId);
          };

          // Get the class for a plattform

          account.getCommunicationClass        = function(communicationId)
          {
              return account.getHelperClass('communications','communication_id',communicationId);
          };

          // Get the class for a link

          account.getLinksClass        = function(linkId)
          {
              return account.getHelperClass('links','link_id',linkId);
          };

          // Helper method for css

          account.getHelperClass        = function(attr,pid,value)
          {
              var i = 0;

              if(angular.isDefined(account.user) === false)
                {
                   return '';
                }

              for(i = 0; i < account.user[attr].length; i++)
              {
                  if(value === account.user[attr][i][pid] && account.user[attr][i].active === true)
                    {
                       return 'active';
                    }
              }

              return '';

          };

          // Check visibility

          account.checkVisiblilty     = function(attr,pid,id)
          {
                var visible = false;

                for(i = 0; i < account.user[attr].length; i++)
                {
                    if(id === account.user[attr][i][pid] && account.user[attr][i].value.length > 0)
                      {
                         visible = true;
                         break;
                      }
                }

                return visible;
          };

          // Render link

          account.renderLink   = function(attr,pid,id,link)
          {

              var linkHtml  =  'n/a';
              var value =  '';

              for(i = 0; i < account.user[attr].length; i++)
              {
                  if(id === account.user[attr][i][pid] && account.user[attr][i].value.length > 0)
                    {

                       value = account.user[attr][i].value;

                       switch(link.type)
                       {

                          case 'youtube':

                              if(value.indexOf('https://www.youtube.com/channel/') === -1)
                              {
                                    value = 'https://www.youtube.com/channel/' + value;
                              }

                              linkHtml = '<a href="' + value + '" target="blank">{{"Youtube Channel" | translate}}</a>';

                              break;

                          // Standard link

                          default:

                            if(value.indexOf('http://') === -1 && value.indexOf('https://') === -1)
                              {
                                 value = 'http://' + value;
                              }

                            linkHtml = '<a href="' + value + '" target="blank">' + value + '</a>';

                            break;
                       }

                       break;
                    }
              }

              return linkHtml;

          };

          account.init();

     }
]);
