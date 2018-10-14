angular.module('news').controller('NewsOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     '$timeout',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller, store,$timeout,UserService) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data            = [];
          ctrl.storageKey      = 'log_choosen_game';

          ctrl.search          = '';
          ctrl.searchEvent     = null;
          ctrl.streamsUUID     = [];
          ctrl.pageCurrent     = 1;
          ctrl.USER            = UserService.getCurrentUser();

          ctrl.filters         = 
          {
             channel:     [],
             featured:    false,
             readlater:   false
          };

          // Get the correct css class for the news

          ctrl.getCssClass = function(news)
          {
              var className = 'col-xs-12 col-md-6 col-lg-4 ';

              if (ctrl.mode === 'list' || ctrl.mode === 'featured')
                   {
                   className = 'col-xs-12 col-lg-12 ';
                   }

              switch (news.type)
                    {
                    case 'twitch':
                    case 'twitter':
                    case 'youtube':
                    case 'link':
                            className += ' ' + news.type;
                            break;
                    default:className += '';
                            break;
                    }

              if (news.published === false)
                    {
                    className += ' notPublished';
                    }

             if (ctrl.mode === 'featured')
                    {
                    className += ' featured';
                    }

              return className;
          };

          ctrl.channelOptions    = [
            {
               channel: 'twitch',
               label: ctrl.LANG.getString('Twitch')
            },
            {
               channel: 'youtube',
               label: ctrl.LANG.getString('Youtube')
            },
            {
               channel: 'link',
               label: ctrl.LANG.getString('Blog/Webseite')
            },
            {
               channel: 'twitter',
               label: ctrl.LANG.getString('Twitter')
            }
        ];

          // Open stream

          ctrl.openStream = function(news)
          {

              var url = '';

              switch (news.type)
                    {
                    case 'twitch':

                            ctrl.createModal({
                                  'background' : 'rgba(75, 54, 124,0.95)',
                                  'content':     '<news-twitch uuid="'+news.uuid+'"></news-twitch>'
                            },function(){

                            });
                            break;
                    case 'youtube':

                            ctrl.createModal({
                                  'background' : 'rgba(255, 0, 0,0.95)',
                                  'content':     '<news-youtube uuid="'+news.uuid+'"></news-youtube>'
                            },function(){

                            });
                            break;
                    case 'twitter':
                            ctrl.createModal({
                                  'background' : 'rgba(42, 159, 239,0.95)',
                                  'content':     '<news-twitter uuid="'+news.uuid+'"></news-twitter>'
                            },function(){

                            });
                            break;
                    default:
                            ctrl.createModal({
                                  'background' : 'rgba(237, 73, 73,0.95)',
                                  'content':     '<news-link uuid="'+news.uuid+'"></news-link>'
                            },function(){

                            });
                            break;
                    }

          };

          // Load news from the server

          ctrl.loadNews  = function(page)
          {
            var params = {};
            var game   = store.get(ctrl.storageKey);
            var method = 'get';

            if(game !== ctrl.currentGame)
              {
              ctrl.data        = [];
              ctrl.streamsUUID = [];
              page             = 1;
              }

            if(game !== 'ALL')
              {
                params['game'] = game;
              }

            if(angular.isDefined(page) === true)
              {
              ctrl.pageCurrent = page;
              }

            ctrl.currentGame = game;

            params['page'] = ctrl.pageCurrent;

            if (ctrl.filter !== undefined)
                  {
                  params['filter'] = ctrl.filter;
                  }

            if (ctrl.mode === 'featured')
                  {
                  method = 'featured';
                  }

            params['search'] = ctrl.search;

            // Setup the filters

            for(var filter in ctrl.filters)
            {
              if(angular.isDefined(ctrl.filters[filter]) === true)
              {
                  if (Array.isArray(ctrl.filters[filter]) === true)
                        {
                        params[filter] = ctrl.filters[filter].join(',');
                        }
                  else  {
                        params[filter] = ctrl.filters[filter];
                        }
              }
            }

            ctrl.DB.call('Streams',method, params).then(
              function(result)
              {
                  var i       = 0;
                  var news    = null;
                  var max     = result.data.data.length;

                  ctrl.pageMax = result.data.last_page;
                  ctrl.total   = result.data.total;

                  if (ctrl.mode === 'list')
                       {
                       max = 3;
                       }
                  else if(ctrl.mode === 'featured')
                       {
                       ctrl.data[ctrl.data.length] = result.data.data;
                       return;
                       }


                  for(i = 0; i < max; i ++)
                     {
                      news   = result.data.data[i];

                      if (angular.isUndefined(news))
                            {
                            continue;
                            }

                      if(ctrl.streamsUUID.indexOf(news.uuid) > -1)
                        {
                        continue;
                        }

                      ctrl.streamsUUID[ctrl.streamsUUID.length] = news.uuid;
                      ctrl.data[ctrl.data.length]               = news;
                      }
              },
              function(errorResult)
              {
                  ctrl.ALERT.add({
                      'title':     ctrl.LANG.getString('Fehler beim Laden der News'),
                      'message':   ctrl.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren News aufgetreten.'),
                      'autoClose': true
                  });
              }
            );
          };

          // get styles

          ctrl.getStyleForYoutube = function(news)
          {
                var styleObject = {};

                styleObject['background']          = 'url(' + news.image + ')';
                styleObject['background-size']     = 'cover';
                styleObject['background-position'] = 'center center';

                return styleObject;
          };

          // submit a news entry

          ctrl.submitNews = function(event, game)
          {

              if (ctrl.USER === null)
                   {
                   ctrl.ALERT.add({
                         'title':     ctrl.LANG.getString('Melde dich bitte zuerst an!'),
                         'message':   ctrl.LANG.getString('Um Nachrichten hinzufügen zu können, musst du dich erst anmelden!'),
                         'autoClose': true
                   });
                   return;
                   }

              ctrl.createModal({
                    'background' : 'rgba(255, 255, 255,0.9)',
                    'content':     '<news-submit uuid="'+game+'"></news-submit>',
                    'classes':     ['news-create']
              },function(){

              });
          };

          // Read later 

          ctrl.readlater = function(news,event)
          {
              console.error('READLATER');
              event.preventDefault();
              if (news.readlater === true)
                    {
                    // Remove from read later list
                    ctrl.DB.call('Streams','removefromreadlater', {uuid:news.uuid}).then(
                        function(result)
                        {
                        news.readlater = false;
                        }
                    );
                    }
              else  {
                    // Add to readlater list
                    ctrl.DB.call('Streams','readlater', {uuid:news.uuid}).then(
                        function(result)
                        {
                        news.readlater = true;
                        }
                    );
                    }
          };

          ctrl.getCssClassForReadlater = function(news)
          {
             return news.readlater === true ? '' : 'inactive';
          };

          // Set filter featured
          ctrl.setFeatured = function(status)
          {
             ctrl.filters.featured = status;
          };

          // Set filter readlater
          ctrl.setReadlater = function(status)
          {
             ctrl.filters.readlater = status;
          };

          // Init function

          ctrl.init      = function()
          {
              ctrl.pageCurrent = 0;
              ctrl.loadMore(ctrl.pageCurrent);
          };

          ctrl.loadMore = function()
          {
              ctrl.pageCurrent++;
              ctrl.loadNews(ctrl.pageCurrent);
          };

          ctrl.$onInit = function()
          {
              ctrl.init();
          };

          ctrl.watch = function()
          {
              if (ctrl.searchEvent !== null)
                    {
                    clearTimeout(ctrl.searchEvent);
                    }

              ctrl.searchEvent = setTimeout(function(){
                  ctrl.streamsUUID = [];
                  ctrl.data        = [];
                  ctrl.loadNews(1);
              },350);
          };

          // Watchers

          $rootScope.$on('chooseGame',function(event,args){

               // Other game identified
               if (store.get(ctrl.storageKey) !== args.id)
                     {
                     ctrl.data = [];
                     }

               ctrl.loadNews();
          });

          $scope.$watch('ctrl.search', function(oldValue,newValue){

             ctrl.watch();

          }, true);

          $scope.$watch('ctrl.filters',           ctrl.watch,               true);

          // Reload the news from outside

          $rootScope.$on('reloadNews',function(){
              ctrl.streamsUUID = [];
              ctrl.data        = [];
              ctrl.loadNews();
          });

          // On edit news broadcast event -> close and open modal
          $rootScope.$on('editNews', function(event,args){
              $rootScope.$broadcast('$modalClose');

              ctrl.createModal({
                    'background' : 'rgba(255, 255, 255,0.9)',
                    'content':     '<news-edit uuid="'+args.uuid+'"></news-edit>',
                    'classes':     ['news-create']
              },function(){
                  
              });

          });

          $rootScope.$on('userLogged', function(event,args) {
            ctrl.USER = args.user;
            $timeout(function()
            {
              $scope.$apply();
            });
        });

     }
]);
