appConfig.registerModule('alerts');

angular.module('alerts').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {


    }
]);

angular.module('alerts').run([
    '$state',
    '$timeout',
    '$stateParams',
    '$rootScope',
    '$urlRouter',
    '$window',
    '$transitions',
    'gettextCatalog',
    'DB',
    function($state,$timeout,$stateParams,$rootScope,$urlRouter,$window,$transitions,gettextCatalog,DB){

        // Window function overwrite of the alert method - will call system alert method

        window.alert = function(msg,headline)
        {
            $rootScope.$broadcast('AlertAdd',{data:{
               'title':   headline !== undefined ? headline : gettextCatalog.getString('System'),
               'message': msg
            }});
        };

    }
]);
