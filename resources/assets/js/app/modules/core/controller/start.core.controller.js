angular.module('core').controller('CoreStartCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller,store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.featured   = {};
          ctrl.storageKey = 'log_choosen_game';

          // Init function

          ctrl.$onInit = function()
          {
              var params = {};
              var game   = store.get(ctrl.storageKey);

              if (angular.isDefined(game) === true)
                   {
                   params['game'] = game;
                   }

              ctrl.DB.call('Streams','featured',params).then(
                function(result)
                {
                ctrl.featured = result.data.data;

                switch(ctrl.featured.type)
                      {
                      case 'twitch':
                        ctrl.featured.stream = '<div class="embed-responsive embed-responsive-16by9"><iframe src="https://player.twitch.tv/?channel=' + ctrl.featured.channel + '&muted=false&parent=league-of-girls.com" height="720" width="1280" frameborder="0" scrolling="no" allowfullscreen="false"></iframe></div>';
                        break;
                      case 'youtube':
                        ctrl.featured.stream = '<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315" src="'+ ctrl.featured.url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';
                        break;
                      default:
                        break;
                      }

                },
                function(errorResult)
                {
                ctrl.featured = {};
                }
              );
          };

          $rootScope.$on('chooseGame',function(event,args){

               // Other game identified
               if (store.get(ctrl.storageKey) !== args.id)
                     {
                     ctrl.featured = {};
                     }

               ctrl.$onInit();
          });

     }
]);
