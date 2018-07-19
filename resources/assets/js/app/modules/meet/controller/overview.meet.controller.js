angular.module('meet').controller('MeetOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     'store',
     function($scope, $rootScope, $state, $window, $controller,UserService,store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.currentGame     = null;
          ctrl.currentGameData = null;

          ctrl.users           = [];
          ctrl.usersUUID       = [];
          ctrl.user            = UserService.getCurrentUser();

          ctrl.hasGameInfo     = false;
          ctrl.storageKey      = 'log_choosen_game';

          ctrl.pageCurrent     = 1;
          ctrl.pageMax         = 1;
          ctrl.total           = 0;
          ctrl.data            = [];

          ctrl.plattforms      = [];
          ctrl.communications  = [];

          ctrl.filters         = {

              plattforms:     [],
              communications: [],
              connected:      [],
              skill:          []

          };

          ctrl.skillOptions    = [
              {
                 skill: 'beginner',
                 label: ctrl.LANG.getString('Anfänger')
              },
              {
                 skill: 'amateur',
                 label: ctrl.LANG.getString('Amateur')
              },
              {
                 skill: 'advanced',
                 label: ctrl.LANG.getString('Fortgeschriten')
              },
              {
                 skill: 'pro',
                 label: ctrl.LANG.getString('Profi')
              }
          ];

          // Watch method

          ctrl.watch          = function(newValue,oldValue)
          {
                if(angular.equals(newValue,oldValue) === false)
                  {
                      ctrl.pageCurrent = 1;
                      ctrl.users       = [];
                      ctrl.usersUUID   = [];

                      ctrl.loadUsers();
                  }

          };

          // Get class for an element

          ctrl.getActiveClass = function(active)
          {
              return active === true ? 'active' : '';
          };

          // Open user profile

          ctrl.openProfile      = function(userId)
          {
              ctrl.createModal({
                  'background' : 'rgba(0,0,0,0.5)',
                  'content':     '<account user-id="' + userId + '" editable="false"></account>'
              },function(){

              });
          };

          // Init method

          ctrl.init      = function()
          {

              ctrl.DB.call('Plattforms','all').then(
                function(result)
                {
                    ctrl.plattforms = result.data.data;
                },
                function(errorResult)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Fehler beim Laden der Plattformen'),
                        'message':   ctrl.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              ctrl.DB.call('Communications','all').then(
                function(result)
                {
                    ctrl.communications = result.data.data;
                },
                function(errorResult)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Fehler beim Laden der Kommunikationsmethoden'),
                        'message':   ctrl.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kommunikationsmethoden aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              ctrl.loadUsers();
          };

          // Get skill level

          ctrl.skillLevel = function(user)
          {

              var k    = 0;

              var game = user.games.filter(function(gameItem){
                  if(gameItem.game_id === ctrl.currentGameData.id)
                    {
                       return gameItem;
                    }
              })[0];

              if(angular.isUndefined(game) === true)
                {
                   return 'n/a';
                }

              for(k = 0; k < ctrl.skillOptions.length; k++)
              {

                  if(ctrl.skillOptions[k].skill === game.skill)
                  {
                      return ctrl.skillOptions[k].label;
                  }

              }

          };

          // Create a friendship / connection request

          ctrl.createFriendRequest = function(user)
          {
              ctrl.DB.call('Users','request',{uuid:user.uuid},null).then(
                  function(result)
                  {
                      if (result.data.refresh === true)
                          {
                            ctrl.ALERT.add({
                                'title':     ctrl.LANG.getString('Du bist nun verbunden!'),
                                'message':   ctrl.LANG.getString('Da bereits eine Freundschaftsanfrage existierte, bist du nun mit der/dem gewünschte/n Benutzer/in verbunden.'),
                                'autoClose': true
                            });

                            $rootScope.$broadcast('requestUserUpdate');

                          }
                      else
                          {
                            ctrl.ALERT.add({
                                'title':     ctrl.LANG.getString('Freundschaftsanfrage erfolgreich abgeschickt!'),
                                'message':   ctrl.LANG.getString('Deine Freundschaftsanfrage wurde erfolgreich abgeschickt.'),
                                'autoClose': true
                            });
                          }
                  },
                  function(errorResult)
                  {
                      ctrl.ALERT.add({
                          'title':     ctrl.LANG.getString('Fehler bei de Freundschaftsanfrage'),
                          'message':   errorResult.data.message,
                          'autoClose': true
                      });
                  }
              );
          };

          // Load users

          ctrl.loadUsers = function(page)
          {

              var params = {};
              var game   = null;

              game = store.get(ctrl.storageKey);

              if(game !== ctrl.currentGame)
                {
                    ctrl.pageCurrent = 1;
                    ctrl.users       = [];
                    ctrl.usersUUID   = [];
                    ctrl.currentGame = game;

                    if(game !== 'ALL')
                          {

                            ctrl.DB.call('Games','show',{id:game},null).then(
                              function(result){
                                  ctrl.currentGameData = result.data.data;
                              }
                            );

                          }
                    else  {
                            ctrl.currentGameData = null;
                          }

                }

              if(angular.isDefined(page) === true)
                {
                    ctrl.pageCurrent = page;
                }

              ctrl.currentGame = game;

              // Choose game

              if(game !== 'ALL')
                {
                  params['game'] = game;
                }

              params['page'] = ctrl.pageCurrent;

              // Setup the filters

              for(var filter in ctrl.filters)
              {
                if(angular.isDefined(ctrl.filters[filter]) === true)
                {
                    params[filter] = ctrl.filters[filter].join(',');
                }
              }

              // Load users

              ctrl.DB.call('Users','get',params).then(
                function(result){

                    var i      = 0;
                    var user   = null;

                    ctrl.pageMax = result.data.last_page;
                    ctrl.total   = result.data.total;

                    if(result.data.data.length === 0)
                      {
                        ctrl.ALERT.add({
                            'title':     ctrl.LANG.getString('Keine weiteren Daten gefunden!'),
                            'message':   ctrl.LANG.getString('Es gibt keine weiteren Daten zu diese Suche.'),
                            'autoClose': true
                        });
                      }

                    for(i = 0; i < result.data.data.length; i ++)
                    {
                        user   = result.data.data[i];

                        if(ctrl.usersUUID.indexOf(user.uuid) > -1)
                          {
                             continue;
                          }

                        ctrl.usersUUID[ctrl.usersUUID.length] = user.uuid;
                        ctrl.users[ctrl.users.length]         = user;

                    }

                },
                function(errorResult){
                    gamesnavigation.links = [];
                }
              );

          };

          // Event handler for loading more users

          ctrl.loadMore = function()
          {
              ctrl.pageCurrent++;
              ctrl.loadUsers(ctrl.pageCurrent);
          };


          // Helper class method

          ctrl.getClass = function(attr,pid,data)
          {

              var filter = ctrl.filters[attr];
              var cssName = '';

              if(angular.isDefined(filter) === true)
                {

                    switch(attr)
                    {

                       case 'connected':
                         cssName = filter[0] === true ? 'active' : '';
                         break;
                       default:
                         cssName = filter.indexOf(data.id) > -1 ? 'active' : '';
                         break;
                    }

                }

              return cssName;

          };

          // Update filter

          ctrl.setFilter = function(attr,id)
          {

              var filter = ctrl.filters[attr];

              if(attr === 'connected' &&  ctrl.user === null)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Bitte melden Sie sich an!'),
                        'message':   ctrl.LANG.getString('Um dies Funktion nutzen zu können, melde dich bitte an!'),
                        'autoClose': true
                    });
                    return;
                }

              if(angular.isDefined(filter) === true)
                {

                     if (filter.indexOf(id) > -1)
                          {
                              filter.splice(filter.indexOf(id),1);
                          }
                     else {
                              filter[filter.length] = id;
                          }

                }

          };

          ctrl.filterConnectedRender = function()
          {

                return ctrl.filters.connected[0] === true ? 'JA' : 'NEIN';

          };

          ctrl.init();

          // Watchers

          $rootScope.$on('chooseGame',function(event,args){
              ctrl.loadUsers();
          });

          $scope.$watch('ctrl.filters',           ctrl.watch,               true);

     }
]);
