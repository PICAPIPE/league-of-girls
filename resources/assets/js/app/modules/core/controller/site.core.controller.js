angular.module('core').controller('SiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$http',
     function($scope, $rootScope, $state, $window, $controller,$http) {

          var site = this;
          angular.extend(site, $controller('BaseCtrl', {$scope: $scope}));

          // Listen to Request abortion

          $rootScope.$on('$abort', function (event, next, current) {

              $http.pendingRequests.forEach(function(request)
              {
                  if(request.cancel)
                    {
                        request.cancel.resolve();
                    }
              });

              console.warn('Every further request was canceled');

          });

     }
]);
