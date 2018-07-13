appConfig.registerModule('chat');

angular.module('chat').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.chat'
            },
            {
              name:      'app.chat.overview',
              url:       '/chat',
              views:     {
                  '!$default.content':{
                      component: 'chatOverview'
                  }
              },
              roles: window.GetStandardRoles()
            },
            {
              name:      'app.chat.detail',
              url:       '/chat/:id',
              views:     {
                  '!$default.content':{
                      component: 'chatOverview'
                  }
              },
              roles: window.GetStandardRoles()
            },
            {
              name:      'app.chat.user',
              url:       '/chat/users/:id',
              views:     {
                  '!$default.content':{
                      component: 'chatUser'
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
