appConfig.registerModule('news');

angular.module('news').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'news',
              component: 'layout'
            },
            {
              name:      'news.overview',
              url:       '/news',
              views:     {
                  'content':{
                    component: 'newsOverview'
                  }
              }
            },
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
