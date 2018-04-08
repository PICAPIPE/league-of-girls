appConfig.registerModule('user');

angular.module('user').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.user'
            },
            {
              name:      'app.user.account',
              url:       '/my-account',
              views:     {
                  '!$default.content':{
                    component: 'myAccount'
                  }
              }
            },
            {
              name:      'app.user.login',
              url:       '/login',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/user/login.site.html',
                    'controller':  'UserLoginSiteCtrl as loginsite'
                  }
              }
            }
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
