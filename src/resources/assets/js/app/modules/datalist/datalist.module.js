appConfig.registerModule('datalist');

angular.module('datalist').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {


    }
]);

angular.module('datalist').run([
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

        

    }
]);
