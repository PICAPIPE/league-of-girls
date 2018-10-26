angular.module('news').controller('NewsLikeCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     '$timeout',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller, store, $timeout,UserService) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.USER      = UserService.getCurrentUser();

          ctrl.data      = {};
          ctrl.showTotal = true;

          ctrl.options   = [
              {
                type: 'heart',
                text: '<img src="img/icons/standard/emoji_heart.svg"/>'
              },
              {
                type: 'woot',
                text: '<img src="img/icons/standard/emoji_woot.svg"/>'
              },            
              {
                type: 'sad',
                text: '<img src="img/icons/standard/emoji_cry.svg"/>'
              },
              {
                type: 'hate',
                text: '<img src="img/icons/standard/emoji_angry.svg"/>'
              }
          ];

          ctrl.$onInit = function()
          {
              ctrl.data = Object.assign({}, ctrl.news.likes);
          };

          // Like the Data
          ctrl.like = function($event,type)
          {
            var method = 'like';

            $event.preventDefault();

            if (angular.isUndefined(ctrl.USER) === true || ctrl.USER === null) 
                  {
                  return;
                  }

            // Check the type of interaction
            if (ctrl.news.myliketype !== null && ctrl.news.myliketype === type)
                  {
                  // If like type is the same - remove the like
                  method = 'removeLike';
                  }
            ctrl.DB.call('Streams', method, null, {uuid:ctrl.news.uuid,type:type}).then(
                function(result)
                {
                    ctrl.news = result.data.data;
                    ctrl.data = Object.assign({}, result.data.data.likes);
                },
                function(errorResult)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Fehler beim Liken'),
                        'message':   ctrl.LANG.getString('Es ist leider ein Fehler beim Liken aufgetreten. Bitte probiere es erneut oder kontaktiere den Support'),
                        'autoClose': true
                    });
                }
            );
          };

     }
]);
