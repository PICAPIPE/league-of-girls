angular.module('db').service('APIInterceptor',[
    '$rootScope',
    'UserService',
    function($rootScope,UserService)
    {
        var service = this;

        service.request = function(config)
        {

            /*
            var currentUser = UserService.getCurrentUser(),
                access_token = currentUser ? currentUser.access_token : null;
            if (access_token) {
                config.headers.authorization = access_token;
            }
            */

            return config;
        };

        service.responseError = function(response)
        {


            if(response.status === 500)
              {
                  console.warn('All further requests are aborted due to the circumstance that the server returns an 500.')
                  $rootScope.$broadcast('$abort');
              }

            if(response.status === 401)
              {

                  UserService.setCurrentUser(null);

                  $rootScope.$broadcast('$abort');
                  $rootScope.$broadcast('AuthorizationFailed');
              }

            if(response.status === 403)
              {
                    $rootScope.$broadcast('Forbidden');
              }

            return response;
        };
    }
]);
