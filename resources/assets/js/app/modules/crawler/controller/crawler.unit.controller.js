angular.module('crawler').controller('CrawlerUnitCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller, store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data = {};

          ctrl.$onInit = function()
          {
            ctrl.DB.call('Crawler','show',ctrl.uuid).then(
                function(result){

                    ctrl.data = result.data.data;
                },
                function(errorResult)
                {
                    ctrl.data = {};
                }
            );
          };

     }
]);
