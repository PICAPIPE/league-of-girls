angular.module('user').service('UserService', [
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

        return service;

    }
]);
