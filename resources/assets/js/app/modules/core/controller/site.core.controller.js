angular.module('core').controller('SiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$http',
     '$timeout',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,$http,$timeout,UserService) {

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

          });

          // Request an user update

          $rootScope.$on('requestUserUpdate', function(event,args)
          {
              site.DB.call('CurrentUser','check',null,null).then(
                function(result){

                  // Successful getting the user data

                  UserService.setCurrentUser(result.data);
                  $timeout(function()
                  {
                      $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});
                  });

                });
          });

     }
]);
