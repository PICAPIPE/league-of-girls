angular.module('news').controller('NewsLinkCtrl',[
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

          ctrl.data = {};
          ctrl.USER = UserService.getCurrentUser();

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

          // Get the style for the image

          ctrl.getStyle  = function(news,image)
          {
              var styleObject = {};

              if (news.image === '')
                   {
                   news.image = 'img/news/news-fallback.png';
                   }

              if (image === true)
                   {
                   styleObject['background']          = 'url(' + news.image + ')';
                   styleObject['background-size']     = 'cover';
                   styleObject['background-position'] = 'center center';
                   styleObject['right']               = '10px';
                   styleObject['z-index']             = '999999';
                   }
              else {
                   styleObject['right']               = '20px';
                   styleObject['z-index']             = '999998';
                   }

              styleObject['width']               = '200px';
              styleObject['height']              = '200px';

              if (window.outerWidth > 768)
                   {
                   styleObject['position'] = 'absolute';
                   }

              return styleObject;
          };

          // Open Link

          ctrl.open = function(news)
          {
              if (news.url == '')
                   {
                   return;
                   }
              window.open(news.url,'_blank');
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

          // Init function

          ctrl.$onInit = function()
          {

              ctrl.DB.call('Streams','show', ctrl.uuid).then(
                function(result)
                {
                      ctrl.data = result.data.data;
                      ctrl.chat   = '<chat mode="streams" uuid="' + result.data.data.chat.uuid + '" id="general" profile="false"></chat>';
                },
                function(errorResult)
                {
                      ctrl.data   = {};
                      ctrl.chat   = '';
                }
              );
          };

     }
]);
