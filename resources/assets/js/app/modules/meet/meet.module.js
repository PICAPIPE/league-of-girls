appConfig.registerModule('meet');

angular.module('meet').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'meet',
              component: 'layout'
            },
            {
              name:      'meet.overview',
              url:       '/meet',
              views:     {
                  'content':{
                    component: 'meetOverview'
                  }
              }
            },
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
