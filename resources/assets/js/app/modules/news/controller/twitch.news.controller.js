angular.module('news').controller('NewsTwitchCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller, store,UserService) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.stream = '';
          ctrl.data   = {};
          ctrl.USER   = UserService.getCurrentUser();

          // Set published state

          ctrl.setValue = function(uuid, attr,value)
          {
            var params   = {};
            params[attr] = value;

            ctrl.DB.call('Streams','update', ctrl.uuid, params).then(
              function(result)
              {
              ctrl.$onInit();
              },
              function(errorResult)
              {
              ctrl.$onInit();
              }
            );
          };

          // Delete an entry
          ctrl.delete = function(uuid)
          {


            ctrl.DB.call('Streams','destroy', ctrl.uuid).then(
              function(result)
              {
                $rootScope.$broadcast('reloadNews');
                $rootScope.$broadcast('$modalClose');
              },
              function(errorResult)
              {
                var message = ctrl.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                if (window.LARAVEL.debug === true)
                      {
                      console.error(errorResult);
                      }

                if(angular.isDefined(errorResult.data)         === true &&
                   angular.isDefined(errorResult.data.message) === true)
                  {
                  message = errorResult.data.message;
                  }

                ctrl.ALERT.add({
                    'title':     ctrl.LANG.getString('Fehler beim Speichern der Plattform aufgeteten.'),
                    'message':   message,
                    'autoClose': true
                });

              }
            );
          };

          // Edit the entry
          ctrl.edit = function(uuid)
          {
              $rootScope.$broadcast('editNews',{uuid:uuid});
          };

          // Init Method

          ctrl.$onInit = function()
          {

              ctrl.DB.call('Streams','show', ctrl.uuid).then(
                function(result)
                {
                      ctrl.data   = result.data.data;
                      ctrl.stream = '<div class="embed-responsive embed-responsive-16by9"><iframe src="https://player.twitch.tv/?channel=' + result.data.data.channel + '&muted=false" height="720" width="1280" frameborder="0" scrolling="no" allowfullscreen="false"></iframe></div>';
                      ctrl.chat   = '<chat mode="streams" uuid="' + result.data.data.chat.uuid + '" id="general" profile="false"></chat>';
                },
                function(errorResult)
                {
                      ctrl.data   = {};
                      ctrl.stream = ctrl.LANG.getString('Ladefehler');
                      ctrl.chat   = '';
                }
              );
          };

     }
]);
