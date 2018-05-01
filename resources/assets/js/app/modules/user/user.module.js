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
              name:      'app.user.myaccount',
              url:       '/my-account',
              views:     {
                  '!$default.content':{
                    component: 'myAccount'
                  }
              },
              roles: window.GetStandardRoles()
            },
            {
              name:      'app.user.myaccount.edit',
              url:       '/my-account/edit',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/user/account.user.edit.html',
                    'controller':  'UserMyAccountEditCtrl as myaccountEdit'
                  }
              },
              roles: window.GetStandardRoles()
            },
            {
              name:      'login',
              component: 'loginLayout'
            },
            {
              name:      'login.login',
              url:       '/login',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/user/login.site.html',
                    'controller':  'UserLoginSiteCtrl as loginsite'
                  }
              },
              redirectOnLoggged: true
            },
            {
              name:      'login.register',
              url:       '/register',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/user/register.site.html',
                    'controller':  'UserRegisterSiteCtrl as registersite'
                  }
              },
              redirectOnLoggged: true
            },
            {
              name:      'login.logout',
              url:       '/logout',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/user/logout.site.html',
                    'controller':  'UserLogoutSiteCtrl as logoutsite'
                  }
              },
              roles: window.GetStandardRoles()
            },
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
