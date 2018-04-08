appConfig.registerModule('core');

angular.module('core').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'gettext',
    '$httpProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext,$httpProvider) {

        var fallbackUrl = '/start';

        $locationProvider.html5Mode(true);

        var states = [
            {
              name:      'app',
              component: 'layout'
            },
            {
              name:      'app.start',
              url:       '/start',
              component: 'start.core'
            },
            {
              name:      'app.imprint',
              url:       '/imprint',
              component: 'imprint.core'
            }
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });

        $urlRouterProvider.when('', fallbackUrl);
        $urlRouterProvider.when('/', fallbackUrl);

        // HTTP interceptor

        $httpProvider.interceptors.push('APIInterceptor');


    }]);

angular.module('core').run(['$state','$timeout','$stateParams','$rootScope','$log','$urlRouter','$window','gettextCatalog','DB',
    function($state,$timeout,$stateParams,$rootScope,$log,$urlRouter,$window,gettextCatalog,DB){

              

        }
    ]);
