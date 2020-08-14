appConfig.registerModule('dashboard');

angular.module('dashboard').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.dashboard'
            },
            {
              name:      'app.dashboard.overview',
              url:       '/dashboard',
              views:     {
                  '!$default.content':{
                    component: 'dashboard'
                  }
              },
              roles: window.GetStandardRoles()
            }
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
