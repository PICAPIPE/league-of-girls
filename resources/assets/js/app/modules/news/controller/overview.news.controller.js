angular.module('news').controller('NewsOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller, store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data            = [];
          ctrl.storageKey      = 'log_choosen_game';

          ctrl.streamsUUID     = [];
          ctrl.pageCurrent     = 1;

          // Get the correct css class for the news

          ctrl.getCssClass = function(news)
          {
              var className = '';
              switch (news.type)
                    {
                    case 'twitch':
                    case 'twitter':
                            className = news.type;
                            break;
                    default:className = '';
                            break;
                    }
              return className;
          };

          // Open stream

          ctrl.openStream = function(news)
          {

              var url = '';

              switch (news.type)
                    {
                    case 'twitch':
                            url = 'https://www.twitch.tv/' + news.channel;

                            if (news.live === true)
                                  {
                                  ctrl.createModal({
                                        'background' : 'rgba(75, 54, 124,0.8)',
                                        'content':     '<news-twitch uuid="'+news.uuid+'"></news-twitch>'
                                  },function(){

                                  });
                                  return;
                                  }

                            window.open(url, '_blank');
                            break;
                    case 'twitter':
                            url = news.url;
                            window.open(url, '_blank');
                            break;
                    default:url = '';
                            break;
                    }

          };

          // Load news from the server

          ctrl.loadNews  = function(page)
          {
            var params = {};
            var game   = store.get(ctrl.storageKey);

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

            ctrl.DB.call('Streams','get', params).then(
              function(result)
              {
                  var i      = 0;
                  var news   = null;

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
                      news   = result.data.data[i];

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

           // Watchers

           $rootScope.$on('chooseGame',function(event,args){

               // Other game identified
               if (store.get(ctrl.storageKey) !== args.id)
                     {
                     ctrl.data = [];
                     }

               ctrl.loadNews();
           });

     }
]);
