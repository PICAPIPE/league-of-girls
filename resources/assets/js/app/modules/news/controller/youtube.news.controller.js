angular.module('news').controller('NewsYoutubeCtrl',[
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

          // Save the link to the specific entry into the clipboard.
          ctrl.share = function()
          {
              var value = '';
              var el = document.createElement('textarea');
              try {
                value = $state.href('app.news.detail', {uuid:window.btoa(JSON.stringify({type:ctrl.data.type, uuid:ctrl.data.uuid}))}, {absolute: true});
                } 
            catch(err)
                {
                console.log(err);  
                } 
                
             el.value = value;
             document.body.appendChild(el);
             el.select();
             document.execCommand('copy');
             document.body.removeChild(el);
             
             ctrl.ALERT.add({
                'title':     ctrl.LANG.getString('Link in der Zwischenablage!'),
                'message':   ctrl.LANG.getString('Link zu diesem Beitrag ist in deiner Zwischenablage gespeichert.'),
                'autoClose': true
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

          // Init method

          ctrl.$onInit = function()
          {

              ctrl.DB.call('Streams','show', ctrl.uuid).then(
                function(result)
                {
                      ctrl.data   = result.data.data;
                      ctrl.stream = '<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315" src="'+ result.data.data.url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';
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
