appConfig.registerModule('news');

angular.module('news').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.news'
            },
            {
              name:      'app.news.overview',
              url:       '/news',
              views:     {
                  '!$default.content':{
                    component: 'newsOverview'
                  }
              }
            },
            {
              name:      'app.news.detail',
              url:       '/news/:uuid',
              views:     {
                  '!$default.content':{
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
