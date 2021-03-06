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
          ctrl.clicked         = false;
          ctrl.streamsUUID     = [];
          ctrl.pageCurrent     = 1;
          ctrl.USER            = UserService.getCurrentUser();

          ctrl.filters         = 
          {
             channel:     [],
             featured:    false,
             readlater:   false
          };

          // Trigger a search
          ctrl.doSearch = function($event,searchTerm)
          {
             if (angular.isDefined($event) === true)
                   {
                   $event.preventDefault();
                   }

              ctrl.search = searchTerm;
              ctrl.clicked = true;
              $timeout(function(){
                  ctrl.clicked = false;
              },150);
          };


          // Get the correct css class for the news

          ctrl.getCssClass = function(news)
          {
              var className = ' ';

              if (ctrl.mode === 'list' || ctrl.mode === 'featured')
                   {
                   className = ' ';
                   }

              if (news.featured === true)
                   {
                   className += ' feature';
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

              if (ctrl.clicked === true)
                    {
                    $timeout(function(){
                          ctrl.clicked = false;
                    },150);
                    return;
                    }

               ctrl.openStreamByUuid(news.type, news.uuid);

          };

          // Create item by id

          ctrl.openStreamByUuid = function(type,uuid)
          {

              switch (type)
                    {
                    case 'twitch':

                            ctrl.createModal({
                                  'background' : 'rgba(75, 54, 124,0.95)',
                                  'content':     '<news-twitch uuid="'+uuid+'"></news-twitch>'
                            },function(){

                            });
                            break;
                    case 'youtube':

                            ctrl.createModal({
                                  'background' : 'rgba(255, 0, 0,0.95)',
                                  'content':     '<news-youtube uuid="'+uuid+'"></news-youtube>'
                            },function(){
                              if ($state.current.name === 'app.news.detail')
                                    {
                                    $state.go('app.news.overview');
                                    }
                            });
                            break;
                    case 'twitter':
                            ctrl.createModal({
                                  'background' : 'rgba(42, 159, 239,0.95)',
                                  'content':     '<news-twitter uuid="'+uuid+'"></news-twitter>'
                            },function(){
                               if ($state.current.name === 'app.news.detail')
                                    {
                                    $state.go('app.news.overview');
                                    }
                            });
                            break;
                    default:
                            ctrl.createModal({
                                  'background' : 'rgba(73, 73, 73,0.95)',
                                  'content':     '<news-link uuid="'+uuid+'"></news-link>'
                            },function(){
                              if ($state.current.name === 'app.news.detail')
                                    {
                                    $state.go('app.news.overview');
                                    }
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

            // Newslist is loaded in detail mode
            if ($state.current.name === 'app.news.detail')
                  {
                  return;
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

                if (news.image === '')
                   {
                   news.image = 'files/news/news-fallback.png';
                   }

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
              var value = {};
              ctrl.pageCurrent = 0;
              ctrl.loadMore(ctrl.pageCurrent);

              // Load single element
              if ($state.current.name === 'app.news.detail')
                    {
                    try {
                          console.warn($state.params.uuid);
                        value = JSON.parse(window.atob($state.params.uuid));
                        console.error(value);
                        ctrl.openStreamByUuid(value.type, value.uuid);
                        } 
                    catch(err)
                        {
                        console.log(err);
                        $state.go('app.news.overview');     
                        }                    
                    }
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

          $rootScope.$on('$modalIsClosing', function(){
            if ($state.current.name === 'app.news.detail')
                  {
                  $state.go('app.news.overview');
                  }
          });

     }
]);
