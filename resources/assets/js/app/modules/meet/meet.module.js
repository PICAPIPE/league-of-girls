appConfig.registerModule('meet');

angular.module('meet').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.meet'
            },
            {
              name:      'app.meet.overview',
              url:       '/meet',
              views:     {
                  '!$default.content':{
                    component: 'meetOverview'
                  }
              }
            }
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
