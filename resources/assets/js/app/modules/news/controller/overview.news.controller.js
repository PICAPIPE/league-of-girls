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

          // Get the correct css class for the news

          ctrl.getCssClass = function(news)
          {
              var className = '';
              switch (news.type)
                    {
                    case 'twitch':
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
                            break;
                    default:url = '';
                            break;
                    }

              if (url === '')
                    {
                    return;
                    }

              window.open(url, '_blank');

          };

          ctrl.loadNews  = function()
          {

          };

          // Init function

          ctrl.init      = function()
          {

              var params = {};
              var game   = store.get(ctrl.storageKey);

              if(game !== 'ALL')
                {
                  params['game'] = game;
                }

              ctrl.DB.call('Streams','get', params).then(
                function(result)
                {
                    ctrl.data = result.data.data;
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

           ctrl.$onInit = function()
           {
             ctrl.init();
           };

           // Watchers

           $rootScope.$on('chooseGame',function(event,args){
               ctrl.loadNews();
           });

     }
]);
