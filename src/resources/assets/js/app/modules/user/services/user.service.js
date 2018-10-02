angular.module('user').factory('UserService', [
    function(store) {

        var service     = this;
        var currentUser = null;

        // Set the current user

        service.setCurrentUser = function(user)
        {
            currentUser = user;

            if(angular.isDefined(store) === true)
              {
                  store.set('user', user);
              }

            return currentUser;
        };

        // Get the current data

        service.getCurrentUser = function()
        {
            if(!currentUser &&
               angular.isDefined(store) === true)
              {
                  currentUser = store.get('user');
              }

            return currentUser;

        };

        // Check if the user has a role

        service.hasRole   = function(roles)
        {

            var user  = service.getCurrentUser();
            var found = false;
            var rolei = 0;

            if(user                            === null ||
               angular.isUndefined(user.roles) === true)
              {
                 return false;
              }

            if (angular.isUndefined(roles) === true ||
                roles.length               === 0)
                  {
                  return true;
                  }

            for (rolei = 0; rolei < roles.length; rolei++)
                {

                    if(angular.isUndefined(user.roles) === true)
                      {
                         break;
                      }

                    if(user.roles.indexOf(roles[rolei]) > -1)
                      {
                         found = true;
                         break;
                      }
                }

            return found;

        };

        // Check if the user has permission

        service.hasPermission   = function(permissions)
        {

            var user        = service.getCurrentUser();
            var found       = false;
            var permissioni = 0;

            if(user                                  === null ||
               angular.isUndefined(user.permissions) === true)
              {
                 return false;
              }

            if (angular.isUndefined(permissions) === false &&
                permissions.length               === 0)
                  {
                  return true;
                  }

            for (permissioni = 0; permissioni < permissions.length; permissioni++)
                {

                    if(angular.isUndefined(user.permissions) === true)
                      {
                         if (window.LARAVEL.debug === true)
                              {
                              console.warn('User does not have any permissions');
                              }
                         break;
                      }

                    if(user.permissions.indexOf(permissions[permissioni]) > -1)
                      {
                         found = true;
                         break;
                      }
                }

            return found;

        };

        return service;

    }
]);
