appConfig.registerModule('pages');

angular.module('pages').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.pages'
            },
            {
              name:      'app.pages.overview',
              url:       '/pages',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/pages/pages.overview.html',
                    'controller':  'PagesOverviewCtrl as ctrl'
                  }
              },
              roles: window.GetStandardRoles()
            },
            {
              name:      'app.pages.create',
              url:       '/pages/create',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/pages/pages.edit.html',
                    'controller':  'UserMyAccountEditCtrl as myaccountEdit'
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
