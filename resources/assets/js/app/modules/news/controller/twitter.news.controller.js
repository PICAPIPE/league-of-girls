angular.module('news').controller('NewsTwitterCtrl',[
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

          // Get the style for the image

          ctrl.getStyle  = function(news,image)
          {
              var styleObject = {};

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

          // Init Method

          ctrl.$onInit = function()
          {

              ctrl.DB.call('Streams','show', ctrl.uuid).then(
                function(result)
                {
                      ctrl.data   = result.data.data;;
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
