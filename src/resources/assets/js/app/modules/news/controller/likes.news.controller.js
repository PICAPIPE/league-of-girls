angular.module('news').controller('NewsLikeCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller, store, $timeout) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data      = {};
          ctrl.showTotal = true;

          ctrl.options   = [
              {
                  type: 'like',
                  text: String.fromCodePoint(0x1F44D)
              },
              {
                type: 'heart',
                text: String.fromCodePoint(0x2764)
              },
              {
                type: 'hate',
                text: String.fromCodePoint(0x1F621)
              },
              {
                type: 'woot',
                text: String.fromCodePoint(0x1F633)
              },
              {
                type: 'sad',
                text: String.fromCodePoint(0x1F62D)
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
