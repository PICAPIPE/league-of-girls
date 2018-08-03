angular.module('pages').controller('PagesOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data    = {};
          ctrl.options = {};

          // Init

          ctrl.$onInit = function () {
              ctrl.DB.call('Pages','get', {showUnpublished:true}).then(
                function(result)
                {
                    ctrl.data = result.data;
                },
                function(errorResult)
                {
                    ctrl.data = {};
                }
              );
          };

          // Create page

          ctrl.createPage = function()
          {
              ctrl.createModal({
                    'background' : 'rgba(75, 54, 124,0.8)',
                    'content':     '<page-create></page-create>'
              },function(){

              });
          };

     }
]);
