angular.module('pages').controller('PagesListCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.user  = ctrl.USER.getCurrentUser();

          // Links

          ctrl.links = [];

          // Init

          ctrl.$onInit = function () {

            ctrl.DB.call('Pages','published').then(
                function(result){

                    var i = 0;

                    for (i = 0; i < result.data.data.length; i++)
                           {
                           if (result.data.data[i].published === true)
                                 {
                                 ctrl.links.push({
                                      alias: result.data.data[i].alias,
                                      name:  result.data.data[i].name
                                 });
                                 }
                           }

                },
                function(errorResult)
                {
                    if (window.LARAVEL.debug === true)
                          {
                          console.error(errorResult);
                          }
                }
            );

          };

     }
]);
