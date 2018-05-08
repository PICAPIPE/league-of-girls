// Init the application configuration module for AngularJS application
var appConfig = (function() {

    var appModuleName               = 'app';
    var appModuleVendorDependencies = [
      'ui.router',
      'formly',
      'formlyBootstrap',
      'gettext',
      'angular-storage',
      'ngSanitize',
      'lr.upload'
    ];

    // Add a new vertical module
    var registerModule = function(moduleName, dependencies) {
        angular.module(moduleName, dependencies || []);
        angular.module(appModuleName).requires.push(moduleName);
    };

    return {
        appModuleName:                appModuleName,
        appModuleVendorDependencies:  appModuleVendorDependencies,
        registerModule:               registerModule
    };

})();

var ROLES_STANDARD = ['User'];

var DB_SERVICES    = [

    // Status

    {
       'name' : 'Status',
       'url'  : 'api/status',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url
               }
           }
       ]

    },

    // Users

    {
       'name' : 'Users',
       'url'  : 'api/users',
       'custom': [
           {
               type:       'post',
               name:       'request',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/:uuid/request'
               }
           }
       ]
    },

    // Current User

    {
       'name' : 'CurrentUser',
       'url'  : 'api/users',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'put',
               name:       'save',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'post',
               name:       'addGame',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/games'
               }
           },
           {
               type:       'post',
               name:       'addPlattform',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/plattforms'
               }
           },
           {
               type:       'post',
               name:       'addCommunication',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/communications'
               }
           },
           {
               type:       'post',
               name:       'addLink',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/links'
               }
           },
           {
               type:       'get',
               name:       'friendRequests',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/requests'
               }
           },
       ]

    },

    // Authentication

    {
       'name' : 'Auth',
       'url'  : 'api/auth',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'post',
               name:       'login',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/login'
               }
           },
           {
               type:       'post',
               name:       'register',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/register'
               }
           },
           {
               type:       'post',
               name:       'reset',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/reset'
               }
           }
       ]

    },

    // Friend requests

    {
       'name' : 'FriendRequests',
       'url'  : 'api/friends-requests',
       'except': ['all','get','show','store','destroy']
    },

    // Plattforms

    {
       'name' : 'Plattforms',
       'url'  : 'api/plattforms'
    },

    // Communications

    {
       'name' : 'Communications',
       'url'  : 'api/communications'
    },

    // Links

    {
       'name' : 'Links',
       'url'  : 'api/links'
    }

];

angular.module(appConfig.appModuleName, appConfig.appModuleVendorDependencies);

angular.module(appConfig.appModuleName).config([
   '$locationProvider',
   '$httpProvider',
    function($locationProvider,$httpProvider)
            {
                $locationProvider.hashPrefix('!');
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }
    ]
);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appConfig.appModuleName]);
});

// Init the application configuration module for AngularJS application
var appConfig = (function() {

    var appModuleName               = 'app';
    var appModuleVendorDependencies = [
      'ui.router',
      'formly',
      'formlyBootstrap',
      'gettext',
      'angular-storage',
      'ngSanitize',
      'lr.upload'
    ];

    // Add a new vertical module
    var registerModule = function(moduleName, dependencies) {
        angular.module(moduleName, dependencies || []);
        angular.module(appModuleName).requires.push(moduleName);
    };

    return {
        appModuleName:                appModuleName,
        appModuleVendorDependencies:  appModuleVendorDependencies,
        registerModule:               registerModule
    };

})();

function GetStandardRoles()
{
   return ROLES_STANDARD;
}

var ROLES_STANDARD = ['User'];

var DB_SERVICES    = [

    // Status

    {
       'name' : 'Status',
       'url'  : 'api/status',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url
               }
           }
       ]

    },

    // Users

    {
       'name' : 'Users',
       'url'  : 'api/users',
       'custom': [
           {
               type:       'post',
               name:       'request',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/:uuid/request'
               }
           }
       ]
    },

    // Current User

    {
       'name' : 'CurrentUser',
       'url'  : 'api/users',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'put',
               name:       'save',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'post',
               name:       'addGame',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/games'
               }
           },
           {
               type:       'post',
               name:       'addPlattform',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/plattforms'
               }
           },
           {
               type:       'post',
               name:       'addCommunication',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/communications'
               }
           },
           {
               type:       'post',
               name:       'addLink',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/links'
               }
           },
           {
               type:       'get',
               name:       'friendRequests',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/requests'
               }
           },
       ]

    },

    // Authentication

    {
       'name' : 'Auth',
       'url'  : 'api/auth',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'post',
               name:       'login',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/login'
               }
           },
           {
               type:       'post',
               name:       'register',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/register'
               }
           },
           {
               type:       'post',
               name:       'reset',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/reset'
               }
           }
       ]

    },

    // Friend requests

    {
       'name' : 'FriendRequests',
       'url'  : 'api/friends-requests',
       'except': ['all','get','show','store','destroy']
    },

    // Plattforms

    {
       'name' : 'Plattforms',
       'url'  : 'api/plattforms'
    },

    // Communications

    {
       'name' : 'Communications',
       'url'  : 'api/communications'
    },

    // Links

    {
       'name' : 'Links',
       'url'  : 'api/links'
    }

];

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
              }
            },
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);

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
              views:     {
                  '!$default.content':{
                      'templateUrl': 'views/core/start.html',
                      'controller':  'CoreStartCtrl as ctrl'
                  }
              }
            },
            {
              name:      'app.imprint',
              url:       '/imprint',
              views:     {
                  '!$default.content':{
                      'templateUrl': 'views/core/imprint.html',
                      'controller':  'CoreImprintCtrl as imprint'
                  }
              }
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

angular.module('core').run([
    '$state',
    '$timeout',
    '$stateParams',
    '$rootScope',
    '$urlRouter',
    '$window',
    '$transitions',
    'gettextCatalog',
    'DB',
    'UserService',
    function($state,$timeout,$stateParams,$rootScope,$urlRouter,$window,$transitions,gettextCatalog,DB,UserService){

        var checkAuthentication = function(trans)
        {

              var usersrv           = trans.injector().get('UserService');
              var user              = usersrv.getCurrentUser();
              var roles             = trans.to().roles !== undefined ? trans.to().roles : [];
              var redirectOnLoggged = trans.to().redirectOnLoggged !== undefined ? trans.to().redirectOnLoggged : false;

              var hasPermission     = false;

              if(roles.length > 0 || redirectOnLoggged === true)
                {

                    hasRole = usersrv.hasRole(roles);

                    if(user            === null          &&
                       trans.to().name !== 'login.login' &&
                       trans.to().name !== 'login.register' &&
                       roles.length      > 0)
                      {
                          // User is not authenticated
                          $state.go('login.login');
                          return trans.router.stateService.target('login.login');
                      }

                    if(redirectOnLoggged        === true &&
                       user                     !== null)
                      {
                            $state.go('app.dashboard.overview');
                            return false;
                      }

                    if(hasRole      === false &&
                       roles.length   >  0)
                      {
                          // User does not have the permission
                          return trans.router.stateService.target('app.error403');
                      }

              }

        };

      $transitions.onStart({ to: '**' }, function(trans) {

          var usersrv           = trans.injector().get('UserService');
          var user              = usersrv.getCurrentUser();

          if    (user === null)
                {
                    // Check current user data

                    DB.call('CurrentUser','check').then(
                      function(result)
                      {
                          UserService.setCurrentUser(result.data.data);
                          checkAuthentication(trans);
                      },
                      function(errorResult)
                      {
                          UserService.setCurrentUser(null);
                          checkAuthentication(trans);
                      }
                    );
                }
          else  {
                    checkAuthentication(trans);
                }

      });

    }
]);

angular.module('core').directive('compile',['$compile',
        function($compile){
            return function(scope,element,attrs){
                scope.$watch(
                    function(scope){
                        return scope.$eval(attrs.compile);
                    },
                    function(value){
                        element.html(value);
                        $compile(element.contents())(scope);
                    }
                );
            };
    }]);


angular.module('core').directive('contenteditable',  ['$sce', function($sce) {
      return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {

          if (!ngModel) return; // do nothing if no ng-model

          // Specify how UI should be updated
          ngModel.$render = function() {
            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            read(); // initialize
          };

          // Listen for change events to enable binding
          element.on('blur keydown change', function(e) {

            var stop = false;

            if(angular.isDefined(attrs.stripBr) === true && attrs.stripBr === 'true')
              {

                switch(e.keyCode)
                {
                   case 13:
                    e.preventDefault();
                    stop = true;
                    break;
                }

              }

            if(stop === true)
              {

                 return;
              }

             scope.$evalAsync(read);
          });

          // Write data to the model
          function read() {

            var html = element.html();
            var tmp  = document.createElement("DIV");

            if(angular.isDefined(attrs.stripBr) === true && attrs.stripBr === 'true')
              {
                tmp.innerHTML = html;
                html          = tmp.textContent || tmp.innerText || "";
              }

            ngModel.$setViewValue(html);

          }
        }
      };
    }]);

appConfig.registerModule('dashboard');

angular.module('dashboard').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.dashboard'
            },
            {
              name:      'app.dashboard.overview',
              url:       '/dashboard',
              views:     {
                  '!$default.content':{
                    component: 'dashboard'
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

appConfig.registerModule('db');

angular.module('db').run([
    'DB',
    'UserService',
    function(DB,UserService){

              // Register the DB-Services

              var dbi = 0;

              for(dbi = 0; dbi < DB_SERVICES.length; dbi++)
                 {

                   if(angular.isUndefined(DB_SERVICES[dbi].name) === true ||
                      angular.isUndefined(DB_SERVICES[dbi].url)  === true)
                     {
                        continue;
                     }

                   console.info('Register DB-Service: [Name ="' + DB_SERVICES[dbi].name + '", Url="' + DB_SERVICES[dbi].url + '"]');

                   DB.register(DB_SERVICES[dbi].name,DB_SERVICES[dbi].url,{
                       'except':DB_SERVICES[dbi].except !== undefined ? DB_SERVICES[dbi].except : [],
                       'custom':DB_SERVICES[dbi].custom !== undefined ? DB_SERVICES[dbi].custom : []
                   });

                 }

        }
    ]);

appConfig.registerModule('games');

angular.module('games').run([
    'DB',
    function(DB){

            // Register DB - Services

            DB.register('Games','api/games');

        }
    ]);

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

appConfig.registerModule('navigation');

angular.module('navigation').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [

        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }
  ]);

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
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);

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
              name:      'app.user.account',
              url:       '/account/:uuid',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/user/account.user.profile.html',
                    'controller':  'UserAccountProfileCtrl as account'
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

angular.module('core').component('alerts', {
  templateUrl:  'views/alerts/alerts.html',
  controller:   'AlertCtrl as alerts'
});

angular.module('chat').component('chat', {
  templateUrl:  'views/chat/control.chat.html',
  controller:   'ChatCtrl as ctrl'
});

angular.module('chat').component('chatOverview', {
  templateUrl:  'views/chat/overview.chat.html',
  controller:   'ChatOverviewCtrl as ctrl'
});

angular.module('core').component('imprint.core', {
  templateUrl:  'views/core/imprint.html',
  controller:   'CoreImprintCtrl as imprint'
});

angular.module('core').component('layout', {
  templateUrl:  'views/core/layout.html',
  controller:   'CoreLayoutCtrl as layout'
});

angular.module('core').component('siteModal', {
  templateUrl:  'views/core/site.modal.html',
  controller:   'CoreSiteModalCtrl as modal'
});

angular.module('dashboard').component('dashboard', {
  templateUrl:  'views/dashboard/dashboard.html',
  controller:   'DashboardCtrl as dashboard'
});

angular.module('meet').component('meetOverview', {
  templateUrl:  'views/meet/overview.meet.html',
  controller:   'MeetOverviewCtrl as ctrl'
});

angular.module('navigation').component('gamesNavigation', {
  templateUrl:  'views/navigation/games.navigation.html',
  controller:   'NavigationGamesCtrl as gamesnavigation'
});

angular.module('navigation').component('mainNavigation', {
  templateUrl:  'views/navigation/main.navigation.html',
  controller:   'NavigationMainCtrl as mainnavigation'
});

angular.module('navigation').component('moreNavigation', {
  templateUrl:  'views/navigation/more.navigation.html',
  controller:   'NavigationMoreCtrl as morenavigation'
});

angular.module('news').component('newsOverview', {
  templateUrl:  'views/news/overview.news.html',
  controller:   'NewsOverviewCtrl as ctrl'
});

angular.module('user').component('account', {
  templateUrl:  'views/user/account.user.html',
  controller:   'UserAccountCtrl as account',
  bindings:     {
                    userId:   '@',
                    editable: '='
                }
});

angular.module('user').component('friendsRequestsModal', {
  templateUrl:  'views/user/friends.requests.modal.html',
  controller:   'FriendsRequestsModalCtrl as modal'
});

angular.module('user').component('loginLayout', {
  templateUrl:  'views/user/login.layout.html',
  controller:   'LoginLayoutCtrl as layout'
});

angular.module('user').directive('loginLayoutView', function() {
  return { template: '<login-layout></login-layout>'};
});

angular.module('user').component('loginModal', {
  templateUrl:  'views/user/login.layout.modal.html',
  controller:   'LoginModalCtrl as modal'
});

angular.module('user').component('userLogin', {
  templateUrl:  'views/user/login.user.html',
  controller:   'UserLoginCtrl as login'
});

angular.module('user').component('myAccount', {
  templateUrl:  'views/user/myaccount.user.html',
  controller:   'UserMyAccountCtrl as myaccount'
});

angular.module('user').component('userPanel', {
  templateUrl:  'views/user/panel.user.html',
  controller:   'UserPanelCtrl as userpanel'
});
 

angular.module('user').component('userRegister', {
  templateUrl:  'views/user/register.user.html',
  controller:   'UserRegisterCtrl as register'
});

angular.module('alerts').factory('AlertService', [
    '$rootScope',
    function($rootScope) {

        var service     = this;

        service.add     = function(data)
        {
            $rootScope.$broadcast('AlertAdd',{data:data});
        };

        return service;

    }
]);

angular.module('db').service('APIInterceptor',[
    '$rootScope',
    'UserService',
    function($rootScope,UserService)
    {
        var service = this;

        service.request = function(config)
        {

            var currentUser            = UserService.getCurrentUser();
            var currentUserAccessToken = currentUser ? currentUser.access_token : null;

            if(currentUserAccessToken)
              {
                  config.headers.authorization = 'Bearer ' + currentUserAccessToken;
              }

            return config;
        };

        service.responseError = function(response)
        {

            if(response.status === 500)
              {
                  console.warn('All further requests are aborted due to the circumstance that the server returns an 500.')
                  $rootScope.$broadcast('$abort');
              }

            if(response.status === 401)
              {

                  UserService.setCurrentUser(null);

                  $rootScope.$broadcast('$abort');
                  $rootScope.$broadcast('AuthorizationFailed');
              }

            if(response.status === 403)
              {
                    $rootScope.$broadcast('Forbidden');
              }

            return response;
        };
    }
]);

angular.module('db').factory('DB',[
  '$q',
  '$http',
  '$rootScope',
  function($q,$http,$rootScope) {

    var DBDefault  = [
        {
          type:       'get',
          name:       'get',
          queryIndex: 2,
          keep:       true,
          getUrl: function(url)
          {
              return url
          }
        },
        {
          type:       'get',
          name:       'all',
          queryIndex: 2,
          keep:       true,
          getUrl: function(url)
          {
              return url + '/all';
          }
        },
        {
          type:      'get',
          name:      'show',
          queryIndex: 2,
          keep:       false,
          getUrl: function(url)
          {
              return url + '/:id';
          }
        },
        {
          type:      'post',
          name:      'store',
          queryIndex: 2,
          dataIndex:  3,
          getUrl: function(url)
          {
              return url;
          }
        },
        {
          type:       'put',
          name:       'update',
          dataIndex:  3,
          getUrl: function(url)
          {
              return url + '/:id';
          }
        },
        {
          type:  'delete',
          name:  'destroy',
          getUrl: function(url)
          {
              return url + '/:id';
          }
        }
    ];

    var DBResolveUrl  = function(url,params,callQueryIndex,keep)
    {
        var str    = url;

        var ele    = null;
        var eleInd = callQueryIndex !== undefined && callQueryIndex !== null && callQueryIndex !== -1 ? callQueryIndex : 2;

        var hasId  = false;
        var keys   = [];

        if(angular.isUndefined(keep) === true)
          {
             keep = false;
          }

        if(angular.isDefined(params[eleInd]) === true &&
           angular.isObject(params[eleInd])  === false)
          {
              str   = str.replace(':id',params[eleInd]);
              eleInd++;
          }

        if(angular.isObject(params[eleInd])  === true &&
           angular.isDefined(params[eleInd]) === true &&
           params[eleInd]                    !== null)
          {

              keys = Object.keys(params[eleInd]);

              for(ele in params[eleInd])
                 {
                    if(str.indexOf(':' + ele) > -1 && keys.indexOf(ele) > -1)
                      {
                          str = str.replace(':'+ele,params[eleInd][ele]);

                          if(keep === false)
                            {
                                delete params[eleInd][ele];
                            }

                      }
                 }
          }

        return str;
    };

    var DBEntriesIds        = [];
    var DBEntriesUrls       = [];
    var DBEntriesType       = [];
    var DBEntriesCalls      = [];
    var DBEntriesSettings   = [];
    var DBEntriesQueryIndex = [];
    var DBEntriesDataIndex  = [];
    var DBEntriesKeepParams = [];
    var DBEntriesBroadcasts = [];

    var DBRegister = function(name,url,settings)
    {

          var index         = 0;
          var indexCustom   = -1;
          var except        = [];
          var customs       = [];
          var unique        = null;

          if(angular.isUndefined(settings) === true)
            {
               settings = {};
            }

          // Excepts

          if(angular.isDefined(settings.except) === true)
            {
                except = settings.except;
            }

          // Custom methods

          if(angular.isDefined(settings.custom) === true)
            {
                customs = settings.custom;
            }

          for (index = 0; index < DBDefault.length; index++)
              {

                  unique = window.btoa(name + '_' + DBDefault[index].name);

                  if(except.indexOf(DBDefault[index].name) > -1)
                    {
                       continue;
                    }

                  if(DBEntriesIds.indexOf(unique) > -1)
                    {
                      continue;
                    }

                  DBEntriesIds[DBEntriesIds.length]                       = unique;
                  DBEntriesUrls[DBEntriesUrls.length]                     = DBDefault[index].getUrl(url,settings);
                  DBEntriesCalls[DBEntriesCalls.length]                   = DBDefault[index].fn;
                  DBEntriesSettings[DBEntriesSettings.length]             = settings;
                  DBEntriesType[DBEntriesType.length]                     = DBDefault[index].type;
                  DBEntriesDataIndex[DBEntriesQueryIndex.length]          = DBDefault[index].dataIndex  !== undefined ? DBDefault[index].dataIndex  : -1;
                  DBEntriesQueryIndex[DBEntriesQueryIndex.length]         = DBDefault[index].queryIndex !== undefined ? DBDefault[index].queryIndex : -1;
                  DBEntriesKeepParams[DBEntriesKeepParams.length]         = DBDefault[index].keep       !== undefined ? DBDefault[index].keep       : false;
                  DBEntriesBroadcasts[DBEntriesKeepParams.length]         = DBDefault[index].broadcasts !== undefined ? DBDefault[index].broadcasts : [];
              }

           // Customs

           for (index = 0; index < customs.length; index++)
               {
                   unique        = window.btoa(name + '_' + customs[index].name);
                   indexCustom   = DBEntriesIds.indexOf(unique);

                   if(except.indexOf(customs[index].name) > -1)
                     {
                        continue;
                     }

                   if(indexCustom === -1)
                     {
                        indexCustom = DBEntriesIds.length;
                     }

                   DBEntriesIds       [indexCustom]         = unique;
                   DBEntriesUrls      [indexCustom]         = customs[index].getUrl(url,settings);
                   DBEntriesCalls     [indexCustom]         = customs[index].fn;
                   DBEntriesSettings  [indexCustom]         = settings;
                   DBEntriesType      [indexCustom]         = customs[index].type;
                   DBEntriesDataIndex [indexCustom]         = customs[index].dataIndex  !== undefined ? customs[index].dataIndex  : -1;
                   DBEntriesQueryIndex[indexCustom]         = customs[index].queryIndex !== undefined ? customs[index].queryIndex : -1;
                   DBEntriesKeepParams[indexCustom]         = customs[index].keep       !== undefined ? customs[index].keep       : false;
                   DBEntriesBroadcasts[indexCustom]         = customs[index].broadcasts !== undefined ? customs[index].broadcasts : [];
               }

    };

    var DBBroadcast         = function(data,channels)
    {

          var i = 0;

          if(angular.isDefined(data)     === true &&
             angular.isDefined(channels) === true &&
             angular.isArray(channels)   === true)
            {

                  for(i = 0; i < channels.length; i++)
                  {
                     console.log('Broadcast to channel: ' + channels[i]);
                     $rootScope.$broadcast(channels[i],{data:data});
                  }

            }


    };

    var DB = function(name,method)
    {
        var deferred       = $q.defer();
        var unique         = window.btoa(name + '_' + method);

        var callIndex      = DBEntriesIds.indexOf(unique);
        var callFn         = null;
        var callType       = null;
        var callUrl        = null;
        var callParams     = {};
        var callArgInd     = 0;
        var callKeep       = false;
        var callBroadcasts =  [];

        if   (callIndex === -1)
             {
                  console.warn('DB method ('+method+') for '+name+' does not exists.');
                  deferred.reject({code:404});
             }
        else {

                  callFn         = DBEntriesCalls     [callIndex];
                  callUrl        = DBEntriesUrls      [callIndex];
                  callType       = DBEntriesType      [callIndex].toUpperCase();
                  callDataIndex  = DBEntriesDataIndex [callIndex];
                  callQueryIndex = DBEntriesQueryIndex[callIndex];
                  callKeep       = DBEntriesKeepParams[callIndex];
                  callBroadcasts = DBEntriesBroadcasts[callIndex];

                  if(angular.isUndefined(callBroadcasts) || callBroadcasts.length === 0)
                    {
                        callBroadcasts    = [name + '_' + method];
                        callBroadcasts[0] = callBroadcasts[0].toLowerCase();
                    }

                  switch (callType)
                  {

                      case 'PUT':
                      case 'POST':

                          callParams.method   = callType;
                          callParams.url      = DBResolveUrl(callUrl,arguments,callQueryIndex,callKeep);
                          callParams.params   = arguments[callQueryIndex] !== undefined && arguments[callQueryIndex] !== null ? arguments[callQueryIndex] : {};
                          callParams.data     = arguments[callDataIndex]  !== undefined && arguments[callDataIndex]  !== null ? arguments[callDataIndex]  : {};
                          break;

                      default:

                          callParams.method   = callType;
                          callParams.url      = DBResolveUrl(callUrl,arguments,callQueryIndex,callKeep);
                          callParams.params   = arguments[callQueryIndex] !== undefined && arguments[callQueryIndex] !== null ? arguments[callQueryIndex] : {};
                          break;
                  }

                  if    (callParams.url.indexOf(':') > -1)
                        {
                           console.warn('DB url for ' + method + ' in repo ' + name + ' contains illegal url characters or could not be resolved (' + callParams.url + ')');
                           deferred.reject({code:400});
                        }
                  else  {

                            // Make the api call

                            $http(callParams).then(
                              // Success
                              function(response){

                                  DBBroadcast(response.data,callBroadcasts);

                                  if(response.status !== 200)
                                        {
                                            deferred.reject({code:200,statusCode:response.status,data:response.data,headers:response.headers});
                                        }
                                  else  {
                                            deferred.resolve({code:200,statusCode:response.status,data:response.data,headers:response.headers});
                                        }

                              },
                              // Error
                              function(response){

                                  DBBroadcast(response.data,callBroadcasts);
                                  deferred.reject({code:400,statusCode:response.status,data:response.data,headers:response.headers});
                              }
                            );

                         }

             }

        return deferred.promise;

    };

    return {
        call:     DB,
        register: DBRegister
    };

  }
]);

angular.module('user').factory('UserService', [
    function(store) {

        var service     = this;
        var currentUser = null;

        // Set the current user

        service.setCurrentUser = function(user)
        {
            currentUser = user;

            if(angular.isDefined(store) === true)
              {
                  store.set('user', user);
              }

            return currentUser;
        };

        // Get the current data

        service.getCurrentUser = function()
        {
            if(!currentUser &&
               angular.isDefined(store) === true)
              {
                  currentUser = store.get('user');
              }

            return currentUser;

        };

        // Check if the user has a role

        service.hasRole   = function(roles)
        {

            var user  = service.getCurrentUser();
            var found = false;
            var rolei = 0;

            if(user                            === null ||
               angular.isUndefined(user.roles) === false)
              {
                 return false;
              }

            for (rolei = 0; rolei < roles.length; rolei++)
                {

                    if(angular.isUndefined(user.roles) === true)
                      {
                         break;
                      }

                    if(user.roles.indexOf(roles[rolei]) > -1)
                      {
                         found = true;
                         break;
                      }
                }

            return found;

        };

        return service;

    }
]);

angular.module('alerts').controller('AlertCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var alerts = this;

          // Variables

          alerts.listItemOpen = [];
          alerts.list         = [];

          alerts.types        = [
            'default',
            'success',
            'error',
            'warning',
            'info'
          ];

          // Method to dismiss an alert

          alerts.dismiss = function(index,event)
          {

              var elementi    = 0;
              var everyClosed = true;

              if(angular.isDefined(event) === true)
                {
                    event.preventDefault();
                }

              alerts.listItemOpen[index] = false;

              $timeout(function(){

                  // Check if every alert is closed

                  for (elementi = 0; elementi < alerts.listItemOpen.length; elementi++)
                      {
                           if(alerts.listItemOpen[elementi] === true)
                             {
                                everyClosed = false;
                                break;
                             }
                      }

                  if(everyClosed === true)
                    {
                        // Reset

                        $timeout(function()
                        {
                          alerts.listItemOpen = [];
                          alerts.list         = [];
                        },1000)

                    }

                  $scope.$apply();

              });

          };

          // Add method to call an alert

          alerts.add    = function(alert)
          {

              var index       = alerts.listItemOpen.length;

              alerts.listItemOpen[index] = false;
              alerts.list        [index] = alert;

              $timeout(function()
              {

                  $scope.$apply();

                  $timeout(function()
                  {

                      alerts.listItemOpen[index] = true;
                      $scope.$apply();

                  },500);

              });

          };

          // Returns the the current the class of an alert

          alerts.getClass = function(element,index)
          {

              var classAdd = '';

              if(alerts.listItemOpen[index] === true)
                {
                   classAdd = ' open';
                }

              return 'alerts-' + element.type + classAdd;

          };

          // Calculates the z-index and the top position of the alert

          alerts.getStyle = function(index)
          {

              var top       = 0;
              var elementi  = 0;

              var elements = document.getElementsByClassName("alerts-element");

              // Calculate the top position

              for(elementi = 0; elementi < index + 1; elementi++)
                 {

                    if(elementi < index && alerts.listItemOpen[elementi] === false)
                       {
                           continue;
                       }

                    if(alerts.listItemOpen[elementi] === true && elementi === index)
                      {
                         break;
                      }

                    top += elements[elementi].clientHeight;

                 }


              if(alerts.listItemOpen[index] === false)
                {
                    top = top * -1;
                }

              return {
                 'z-index': (99999 - index),
                 'top'    : top + 'px'
              };
          };

          // Returns the css classes of a footer btn. Attr cssClass = array

          alerts.getClassesForBtn = function(btn)
          {

              var classes = [
                  'alerts-btn'
              ];

              if(angular.isDefined(btn.cssClass) === true)
                {
                    classes = classes.concat(btn.cssClass);
                }

              return classes.join(' ');
          }

          // Init method with init of the button methods

          alerts.initBtn = function(btn,index)
          {

              btn.pid     = index;
              btn.methods = {};

              btn.methods.getPid  = function()
              {
                 return btn.pid;
              }

              btn.methods.dismiss = function()
              {
                  alerts.dismiss(this.getPid());
              };

          };

          // Callback function for the button

          alerts.callBtn = function(e,alertElement,btn)
          {

              e.preventDefault();

              if(angular.isUndefined(btn.callback) === true)
                {
                    btn.methods.dismiss();
                }

              if(angular.isDefined(btn.callback) === true)
                {
                    btn.callback(e,alertElement,btn,alertElement.params);
                }

          };

          // Alert init method will be called every time an element is added to alerts list

          alerts.init = function(element,index)
          {

                var ts = element.autoCloseTime !== undefined && isNaN(element.autoCloseTime) === false ? element.autoCloseTime : 2000;

                // Set data

                element.index = index;

                // Auto close the alert

                if(angular.isDefined(element.autoClose) === true && element.autoClose === true)
                  {
                      $timeout(function(){
                          alerts.dismiss(index);
                      },ts)
                  }

          };

          // Watchers

          $rootScope.$on('AlertAdd',function(event,args){

              var type          = args.data.type          !== undefined && alerts.types.indexOf(args.data.type) > -1 ? args.data.type : 'default';
              var title         = args.data.title         !== undefined ? args.data.title    : '';
              var message       = args.data.message       !== undefined ? args.data.message  : '';
              var callback      = args.data.callback      !== undefined ? args.data.callback : '';
              var params        = args.data.params        !== undefined ? args.data.params   : {};
              var buttons       = args.data.buttons       !== undefined ? args.data.buttons  : [];
              var autoCloseTime = args.data.autoCloseTime !== undefined ? args.data.autoCloseTime : 5000;
              var autoClose     = args.data.autoClose     !== undefined ? args.data.autoClose : false;

              alerts.add({
                  type:          type,
                  title:         title,
                  message:       message,
                  callback:      callback,
                  params:        params,
                  buttons:       buttons,
                  autoClose:     autoClose,
                  autoCloseTime: autoCloseTime
              });

          });

     }
]);

angular.module('chat').controller('ChatCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var chat = this;
          angular.extend(chat, $controller('BaseCtrl', {$scope: $scope}));

          chat.channel   = null;

          chat.fields    = [
            {

            }
          ];

          chat.fieldData = {};

          chat.send      = function(event)
          {

          };

          chat.read      = function()
          {

          };

          chat.init      = function()
          {

          };

          chat.init();

     }
]);

angular.module('chat').controller('ChatOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('core').controller('BaseCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     'gettextCatalog',
     'DB',
     'AlertService',
     function($scope, $rootScope, $state, $window, gettextCatalog,DB,AlertService) {

          var ctrl = this;

          ctrl.DB      = DB;
          ctrl.LANG    = gettextCatalog;
          ctrl.ALERT   = AlertService;

          ctrl.loading = false;

          // Open modal

          ctrl.createModal = function(settings,callback)
          {

              // Open the modal

              $rootScope.$broadcast('$modalCreate',{
                settings:settings,
                callback:callback !== undefined ? callback : null
              });

          };

          ctrl.closeModal = function(callback)
          {

              // Open the modal

              $rootScope.$broadcast('$modalClose');

          };

     }
]);

angular.module('core').controller('CoreImprintCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var imprint = this;
          angular.extend(imprint, $controller('BaseCtrl', {$scope: $scope}));

          imprint.headline = 'Impressum';

     }
]);

angular.module('core').controller('CoreLayoutCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var layout = this;
          angular.extend(layout, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('core').controller('SiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$http',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,$http,UserService) {

          var site = this;
          angular.extend(site, $controller('BaseCtrl', {$scope: $scope}));

          // Listen to Request abortion

          $rootScope.$on('$abort', function (event, next, current) {

              $http.pendingRequests.forEach(function(request)
              {
                  if(request.cancel)
                    {
                        request.cancel.resolve();
                    }
              });

          });

     }
]);

angular.module('core').controller('CoreSiteModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     '$http',
     '$sce',
     function($scope, $rootScope, $state, $window, $controller,$timeout,$http,$sce) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          modal.content = '';
          modal.classes = [];
          modal.styles  = {};

          modal.getStyle = function()
          {



              return modal.styles;

          };

          modal.getClass = function()
          {
              return modal.classes.join(' ');
          };

          modal.close = function(e)
          {
              e.preventDefault();

              modal.classes = [];

              $timeout(function()
              {

                  modal.content = '';

              },300);

          };

          // Listen to Request abortion

          $rootScope.$on('$modalCreate', function (event,args) {

              if(modal.content !== '')
                {
                     modal.classes = [];
                }

              $timeout(function()
              {

                  modal.content                       = args.settings.content;
                  modal.classes[modal.classes.length] = 'open';

                  modal.styles                        = {
                      background:   args.settings.background !== undefined ? args.settings.background : '#f4f4f4',
                      height:       document.getElementsByTagName('body')[0].offsetHeight + 'px',
                      'min-height': '100vh'
                  };

                  $scope.$apply();

              },300);

          });

          $rootScope.$on('$modalClose', function (event,args)
          {
                modal.close(event);
          });

     }
]);

angular.module('core').filter('compile',['$sce',
    function($sce){
         return function(input) {
                return $sce.trustAsHtml(input);
          };
    }
]);

angular.module('core').controller('CoreStartCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('dashboard').controller('DashboardCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var dashboard = this;
          angular.extend(dashboard, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('meet').controller('MeetOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     'store',
     function($scope, $rootScope, $state, $window, $controller,UserService,store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.currentGame     = null;
          ctrl.currentGameData = null;

          ctrl.users           = [];
          ctrl.usersUUID       = [];
          ctrl.user            = UserService.getCurrentUser();

          ctrl.hasGameInfo     = false;
          ctrl.storageKey      = 'log_choosen_game';

          ctrl.pageCurrent     = 1;
          ctrl.pageMax         = 1;
          ctrl.data            = [];

          ctrl.plattforms      = [];
          ctrl.communications  = [];

          ctrl.filters         = {

              plattforms:     [],
              communications: [],
              connected:      [],
              skill:          []

          };

          ctrl.skillOptions    = [
              {
                 skill: 'beginner',
                 label: ctrl.LANG.getString('Anfänger')
              },
              {
                 skill: 'amateur',
                 label: ctrl.LANG.getString('Amateur')
              },
              {
                 skill: 'advanced',
                 label: ctrl.LANG.getString('Fortgeschriten')
              },
              {
                 skill: 'pro',
                 label: ctrl.LANG.getString('Profi')
              }
          ];

          // Watch method

          ctrl.watch          = function(newValue,oldValue)
          {
                if(angular.equals(newValue,oldValue) === false)
                  {
                      ctrl.pageCurrent = 1;
                      ctrl.users       = [];
                      ctrl.usersUUID   = [];

                      ctrl.loadUsers();
                  }

          };

          // Get class for an element

          ctrl.getActiveClass = function(active)
          {
              return active === true ? 'active' : '';
          };

          // Open user profile

          ctrl.openProfile      = function(userId)
          {
              ctrl.createModal({
                  'background' : 'rgba(0,0,0,0.5)',
                  'content':     '<account user-id="' + userId + '" editable="false"></account>'
              },function(){

              });
          };

          // Init method

          ctrl.init      = function()
          {

              ctrl.DB.call('Plattforms','all').then(
                function(result)
                {
                    ctrl.plattforms = result.data.data;
                },
                function(errorResult)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Fehler beim Laden der Plattformen'),
                        'message':   ctrl.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              ctrl.DB.call('Communications','all').then(
                function(result)
                {
                    ctrl.communications = result.data.data;
                },
                function(errorResult)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Fehler beim Laden der Kommunikationsmethoden'),
                        'message':   ctrl.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kommunikationsmethoden aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              ctrl.loadUsers();
          };

          // Get skill level

          ctrl.skillLevel = function(user)
          {

              var k    = 0;

              var game = user.games.filter(function(gameItem){
                  if(gameItem.game_id === ctrl.currentGameData.id)
                    {
                       return gameItem;
                    }
              })[0];

              if(angular.isUndefined(game) === true)
                {
                   return 'n/a';
                }

              for(k = 0; k < ctrl.skillOptions.length; k++)
              {

                  if(ctrl.skillOptions[k].skill === game.skill)
                  {
                      return ctrl.skillOptions[k].label;
                  }

              }

          };

          // Create a friendship / connection request

          ctrl.createFriendRequest = function(user)
          {
              ctrl.DB.call('Users','request',{uuid:user.uuid},null).then(
                  function(result)
                  {
                      ctrl.ALERT.add({
                          'title':     ctrl.LANG.getString('Freundschaftsanfrage erfolgreich abgeschickt!'),
                          'message':   ctrl.LANG.getString('Deine Freundschaftsanfrage wurde erfolgreich abgeschickt.'),
                          'autoClose': true
                      });
                  },
                  function(errorResult)
                  {
                      ctrl.ALERT.add({
                          'title':     ctrl.LANG.getString('Fehler bei de Freundschaftsanfrage'),
                          'message':   errorResult.data.message,
                          'autoClose': true
                      });
                  }
              );
          };

          // Load users

          ctrl.loadUsers = function(page)
          {

              var params = {};
              var game   = null;

              game = store.get(ctrl.storageKey);

              if(game !== ctrl.currentGame)
                {
                    ctrl.pageCurrent = 1;
                    ctrl.users       = [];
                    ctrl.usersUUID   = [];
                    ctrl.currentGame = game;

                    if(game !== 'ALL')
                          {

                            ctrl.DB.call('Games','show',{id:game},null).then(
                              function(result){
                                  ctrl.currentGameData = result.data.data;
                              }
                            );

                          }
                    else  {
                            ctrl.currentGameData = null;
                          }

                }

              if(angular.isDefined(page) === true)
                {
                    ctrl.pageCurrent = page;
                }

              ctrl.currentGame = game;

              // Choose game

              if(game !== 'ALL')
                {
                  params['game'] = game;
                }

              params['page'] = ctrl.pageCurrent;

              // Setup the filters

              for(var filter in ctrl.filters)
              {
                if(angular.isDefined(ctrl.filters[filter]) === true)
                {
                    params[filter] = ctrl.filters[filter].join(',');
                }
              }

              // Load users

              ctrl.DB.call('Users','get',params).then(
                function(result){

                    var i      = 0;
                    var user   = null;

                    ctrl.pageMax = result.data.last_page;

                    if(result.data.data.length === 0)
                      {
                        ctrl.ALERT.add({
                            'title':     ctrl.LANG.getString('Keine weiteren Daten gefunden!'),
                            'message':   ctrl.LANG.getString('Es gibt keine weiteren Daten zu diese Suche.'),
                            'autoClose': true
                        });
                      }

                    for(i = 0; i < result.data.data.length; i ++)
                    {
                        user   = result.data.data[i];

                        if(ctrl.usersUUID.indexOf(user.uuid) > -1)
                          {
                             continue;
                          }

                        ctrl.usersUUID[ctrl.usersUUID.length] = user.uuid;
                        ctrl.users[ctrl.users.length]         = user;

                    }

                },
                function(errorResult){
                    gamesnavigation.links = [];
                }
              );

          };

          // Event handler for loading more users

          ctrl.loadMore = function()
          {
              ctrl.pageCurrent++;
              ctrl.loadUsers(ctrl.pageCurrent);
          };


          // Helper class method

          ctrl.getClass = function(attr,pid,data)
          {

              var filter = ctrl.filters[attr];
              var cssName = '';

              if(angular.isDefined(filter) === true)
                {

                    switch(attr)
                    {

                       case 'connected':
                         cssName = filter[0] === true ? 'active' : '';
                         break;
                       default:
                         cssName = filter.indexOf(data.id) > -1 ? 'active' : '';
                         break;
                    }

                }

              return cssName;

          };

          // Update filter

          ctrl.setFilter = function(attr,id)
          {

              var filter = ctrl.filters[attr];

              if(attr === 'connected' &&  ctrl.user === null)
                {
                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Bitte melden Sie sich an!'),
                        'message':   ctrl.LANG.getString('Um dies Funktion nutzen zu können, melde dich bitte an!'),
                        'autoClose': true
                    });
                    return;
                }

              if(angular.isDefined(filter) === true)
                {

                     if (filter.indexOf(id) > -1)
                          {
                              filter.splice(filter.indexOf(id),1);
                          }
                     else {
                              filter[filter.length] = id;
                          }

                }

          };

          ctrl.filterConnectedRender = function()
          {

                return ctrl.filters.connected[0] === true ? 'JA' : 'NEIN';

          };

          ctrl.init();

          // Watchers

          $rootScope.$on('chooseGame',function(event,args){
              ctrl.loadUsers();
          });

          $scope.$watch('ctrl.filters',           ctrl.watch,               true);

     }
]);

angular.module('navigation').controller('NavigationGamesCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller,store) {

          var gamesnavigation = this;
          angular.extend(gamesnavigation, $controller('BaseCtrl', {$scope: $scope}));

          gamesnavigation.storageKey = 'log_choosen_game';

          gamesnavigation.links      = [];

          // Get the css class for an element

          gamesnavigation.getClass   = function(id)
          {
              return id === store.get(gamesnavigation.storageKey) ? 'active':'';
          };

          // Click event for choosing an element

          gamesnavigation.choose     = function(e,id)
          {
              e.preventDefault();
              store.set(gamesnavigation.storageKey,id);
              $rootScope.$broadcast('chooseGame',{id:id});
          };

          // Load the navigation items

          gamesnavigation.load  = function(){

                var storageValue = store.get(gamesnavigation.storageKey);

                if(angular.isDefined(storageValue) === false || storageValue === null)
                {
                   storageValue = 'ALL';
                }

                gamesnavigation.DB.call('Games','all').then(
                  function(result){

                      var entries = result.data.data;
                      var i       = 0;

                      store.set(gamesnavigation.storageKey,storageValue);

                      gamesnavigation.links = [];

                      gamesnavigation.links[gamesnavigation.links.length] = {
                          label: '*',
                          id:    'ALL',
                          active:(storageValue === 'ALL')
                      };

                      for(i = 0; i < entries.length; i++)
                         {
                              gamesnavigation.links[gamesnavigation.links.length] = {
                                  label: entries[i].short,
                                  id:    entries[i].uuid,
                                  active:(storageValue === entries[i].uuid)
                              };
                          }

                  },
                  function(errorResult){
                      gamesnavigation.links = [];
                  }
                );



          };

          // Init the navigation

          gamesnavigation.init  = function()
          {
              gamesnavigation.load();
          };

          // Load the games

          gamesnavigation.init();

     }
]);

angular.module('navigation').controller('NavigationMainCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var mainnavigation = this;
          angular.extend(mainnavigation, $controller('BaseCtrl', {$scope: $scope}));

          mainnavigation.links = [
            {
                label:                mainnavigation.LANG.getString("Chat"),
                state:                'app.chat.overview',
                useFirstLetterAsIcon: true
            },
            {
                label:                mainnavigation.LANG.getString("News"),
                state:                'app.news.overview',
                useFirstLetterAsIcon: true
            },
            {
                label:                mainnavigation.LANG.getString("Meet"),
                state:                'app.meet.overview',
                useFirstLetterAsIcon: true
            }
          ];

     }
]);

angular.module('navigation').controller('NavigationMoreCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var morenavigation = this;
          angular.extend(morenavigation, $controller('BaseCtrl', {$scope: $scope}));

          morenavigation.links = [
            {
                label:                morenavigation.LANG.getString("Chat"),
                state:                'app.chat.overview',
                useFirstLetterAsIcon: true
            },
          ];

          morenavigation.load  = function(){



          };

          morenavigation.init  = function()
          {
                morenavigation.load();
          };

          // Load the other navigation items

          morenavigation.init();

     }
]);

angular.module('news').controller('NewsOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('user').controller('UserAccountCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,UserService,$timeout) {

          var account = this;
          var date    = new Date();
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          account.user           = UserService.getCurrentUser();
          account.imagePath      = '';

          account.games          = [];
          account.plattforms     = [];
          account.commnunications= [];
          account.link           = [];

          account.linksAmount    = 0;

          // Init the account information

          account.init           = function()
          {

              account.linksAmount = 0;

              if(account.user === null)
                {

                    $timeout(function(){
                      if(account.userId !== '-1' && account.userId !== undefined)
                        {
                            account.DB.call('Users','show',account.userId).then(
                                function(result)
                                {
                                    account.user = result.data.data;
                                    account.init();
                                },
                                function(errorResult)
                                {
                                    account.closeModal();
                                }
                            );
                        }
                    });

                    return;
                }

              account.DB.call('Games','all').then(
                function(result)
                {
                    account.games = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Spiele'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Spiele aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              account.DB.call('Plattforms','all').then(
                function(result)
                {
                    account.plattforms = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Plattformen'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              account.DB.call('Communications','all').then(
                function(result)
                {
                    account.commnunications = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Kommunikationsmethoden'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kommunikationsmethoden aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              account.DB.call('Links','all').then(
                function(result)
                {
                    account.links = result.data.data;
                },
                function(errorResult)
                {
                    account.ALERT.add({
                        'title':     account.LANG.getString('Fehler beim Laden der Linktypen'),
                        'message':   account.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Linktypen aufgetreten.'),
                        'autoClose': true
                    });
                }
              );

              account.imagePath      = '/files/avatars/' + (account.user !== null && account.user !== undefined && account.user.uuid !== undefined ? account.user.uuid : '') + '?time='+ date.getTime();

          };

          // Get the class for a game

          account.getClass        = function(gameId)
          {
              return account.getHelperClass('games','game_id',gameId);
          };

          // Get the class for a plattform

          account.getPlattformClass        = function(plattformId)
          {
              return account.getHelperClass('plattforms','plattform_id',plattformId);
          };

          // Get the class for a plattform

          account.getCommunicationClass        = function(communicationId)
          {
              return account.getHelperClass('communications','communication_id',communicationId);
          };

          // Get the class for a link

          account.getLinksClass        = function(linkId)
          {
              return account.getHelperClass('links','link_id',linkId);
          };

          // Helper method for css

          account.getHelperClass        = function(attr,pid,value)
          {
              var i = 0;

              if(angular.isDefined(account.user) === false || angular.isDefined(account.user[attr]) === false)
                {
                   return '';
                }

              for(i = 0; i < account.user[attr].length; i++)
              {
                  if(value === account.user[attr][i][pid] && account.user[attr][i].active === true)
                    {
                       return 'active';
                    }
              }

              return '';

          };

          // Check visibility

          account.checkVisiblilty     = function(attr,pid,id)
          {
                var visible = false;

                if(angular.isDefined(account.user) === false || angular.isDefined(account.user[attr]) === false)
                  {
                     return visible;
                  }

                for(i = 0; i < account.user[attr].length; i++)
                {
                    if(id === account.user[attr][i][pid] && account.user[attr][i].value.length > 0)
                      {
                         visible = true;
                         break;
                      }
                }

                return visible;
          };

          // Render link

          account.renderLink   = function(attr,pid,id,link)
          {

              var linkHtml  =  'n/a';
              var value =  '';

              for(i = 0; i < account.user[attr].length; i++)
              {
                  if(id === account.user[attr][i][pid] && account.user[attr][i].value.length > 0)
                    {

                       value = account.user[attr][i].value;

                       switch(link.type)
                       {

                          case 'youtube':

                              if(value.indexOf('https://www.youtube.com/channel/') === -1)
                              {
                                    value = 'https://www.youtube.com/channel/' + value;
                              }

                              linkHtml = '<a href="' + value + '" target="blank">{{"Youtube Channel" | translate}}</a>';

                              break;

                          // Standard link

                          default:

                            if(value.indexOf('http://') === -1 && value.indexOf('https://') === -1)
                              {
                                 value = 'http://' + value;
                              }

                            linkHtml = '<a href="' + value + '" target="blank">' + value + '</a>';

                            break;
                       }

                       break;
                    }
              }

              if(linkHtml != 'n/a')
                {
                   account.linksAmount++;
                }

              return linkHtml;

          };

          account.init();

     }
]);

angular.module('user').controller('UserAccountProfileCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,UserService,$timeout) {

          var account = this;
          var date    = new Date();
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          // Account link

          account.profile = '';

          account.init = function()
          {
              account.profile = '<account user-id="' + $state.current.uuid + '" editable="false"></account>';
          };

          account.init();

     }
]);

angular.module('user').controller('LoginLayoutCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var layout = this;
          angular.extend(layout, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('user').controller('UserLoginCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller, $timeout,UserService) {

          var login = this;
          angular.extend(login, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          login.isReset   = false;

          login.fieldData = {};

          login.fields    = [
             {
                "type": "input",
                "key":  "email",
                "templateOptions":
                {
                    "type":            "email",
                    "required":        true,
                    "label":           login.LANG.getString('E-Mail'),
                    "placeholder":     login.LANG.getString('E-Mail'),
                    "addonLeft": {
                      "class": "far fa-user"
                    }
                }
             },
             {
                "type": "input",
                "key":  "password",
                "templateOptions":
                {
                    "type":            "password",
                    "required":        true,
                    "label":           login.LANG.getString('Passwort'),
                    "placeholder":     login.LANG.getString('Passwort'),
                    "addonLeft" :{
                      "class": "fas fa-key"
                    }
                },
                "hideExpression": 'login.isReset'
             }
          ];

          login.fieldsReset    = [
             login.fields[0]
          ];

          login.errors =  [];

          // Submit form

          login.submit = function()
          {

              login.loading = true;
              login.errors  = [];

              if   (login.isReset === false)
                   {

                      // Standard login

                      login.DB.call('Auth','login',null,login.fieldData).then(
                          function(result)
                          {

                              // Login was successful

                              login.loading = false;

                              login.DB.call('CurrentUser','check',null,null).then(
                                function(result){

                                  // Successful getting the user data

                                  UserService.setCurrentUser(result.data);

                                  // Close modal and then redirect to dashboard

                                  $rootScope.$broadcast('$modalClose');
                                  $state.go('app.dashboard.overview');

                                  $timeout(function()
                                  {
                                      $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});
                                  });

                                },
                                function(errorResultGetUserData)
                                {

                                    // Error while getting the current user logged user data

                                    login.loading = false;
                                    login.errors  = [errorResultGetUserData.data !== undefined && errorResultGetUserData.data.message !== undefined ? errorResultGetUserData.data.errors : []];

                                    if(login.errors.length === 0 || angular.isUndefined(login.errors[0]) === true)
                                      {
                                            login.errors[login.errors.length] = login.LANG.getString('Unbekannter Fehler aufgetreten.');
                                      }

                                    $rootScope.$broadcast('userLogged',{success:false});

                                }
                              );

                          },
                          function(errorResult)
                          {
                              login.loading = false;
                              login.errors  = [errorResult.data.message];

                              if(login.errors.length === 0 || angular.isUndefined(login.errors[0]) === true)
                                {
                                      login.errors[login.errors.length] = login.LANG.getString('Unbekannter Fehler aufgetreten.');
                                }

                          }
                      );

                   }
              else {

                      // Reset password

                      login.DB.call('Auth','reset',null,login.fieldData).then(
                          function(result)
                          {
                              login.loading     = false;
                              login.fieldsReset = false;

                              // Success

                              $state.go('app.start');

                              login.closeModal();

                              login.ALERT.add({
                                  'title':     login.LANG.getString(''),
                                  'message':   login.LANG.getString('An die anggebene E-Mailadresse wurde ein Link zum Zurücksetzen des Kontos geschickt.'),
                                  'autoClose': true
                              });

                          },
                          function(errorResult)
                          {
                              login.loading = false;
                              login.errors  = [errorResult.data.message];
                          }
                      );
                   }


          };

          // Reset the users password

          login.resetPassword = function(e)
          {
              e.preventDefault();
              login.isReset = !login.isReset;
          };

          // Init function

          login.init = function()
          {

                login.isReset = false;
                login.loading = false;

          };

          // Init

          login.init();

     }
]);

angular.module('user').controller('UserLoginSiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var loginsite = this;
          angular.extend(loginsite, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('user').controller('UserLogoutSiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$timeout',
     '$controller',
     function($scope, $rootScope, $state, $window,$timeout, $controller) {

          var logoutsite = this;
          angular.extend(logoutsite, $controller('BaseCtrl', {$scope: $scope}));

          logoutsite.seconds = 3;

          logoutsite.init    = function()
          {
               if    (logoutsite.seconds === 1)
                     {
                         $timeout(function(){
                            window.location.href = '/auth/logout-now';
                         },1000);
                     }
                else {

                          logoutsite.seconds--;

                          $timeout(function(){
                             logoutsite.init();
                          },1000);

                     }
          };

          logoutsite.init();

     }
]);

angular.module('user').controller('FriendsRequestsModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          // List of requests

          modal.requests = [];
          modal.headline = '';

          modal.skillOptions    = [
              {
                 skill: 'beginner',
                 label: modal.LANG.getString('Anfänger')
              },
              {
                 skill: 'amateur',
                 label: modal.LANG.getString('Amateur')
              },
              {
                 skill: 'advanced',
                 label: modal.LANG.getString('Fortgeschriten')
              },
              {
                 skill: 'pro',
                 label: modal.LANG.getString('Profi')
              }
          ];

          // Init function

          modal.init = function()
          {
              modal.DB.call('CurrentUser','friendRequests').then(
                  function(result)
                  {

                      modal.requests = result.data.data;
                      modal.headline = modal.LANG.getPlural(modal.requests.length, '{{count}} offene Anfrage', '{{count}} offene Anfragen', {count:modal.requests.length});

                      $timeout(function(){
                        $scope.$apply();
                      });

                  },
                  function(errorResult)
                  {
                      modal.requests = [];
                  }
              );
          };

          // Get headline for a single request

          modal.getItemHeadline = function(request)
          {
              return modal.LANG.getString('Neue Freundschaftsanfrage von {{username}}',{username:request.from.username});
          };

          // Accept request

          modal.acceptRequest = function(event,request)
          {
              event.preventDefault();
              modal.setRequestStatus(request.uuid,true);
          };

          // Decline the request

          modal.declineRequest = function(event,request)
          {
              event.preventDefault();
              modal.setRequestStatus(request.uuid,false);
          };

          // Update the request status

          modal.setRequestStatus = function(uuid,status)
          {

            var obj = {};

            if(status === true)
              {
                  obj.accepted = true;
                  obj.declined = false;
                  obj.read     = true;
              }
            else
              {
                  obj.accepted = false;
                  obj.declined = true;
                  obj.read     = true;
              }

            modal.DB.call('FriendRequests','update',uuid,obj).then(
                function(result)
                {

                    modal.init();

                },
                function(errorResult)
                {
                    modal.ALERT.add({
                        'title':     modal.LANG.getString('Fehler beim Bearbeiten der Freundschaftsanfrage'),
                        'message':   modal.LANG.getString('Es ist ein Fehler beim Bearbeiten der Freundschaftsanfrage aufgetreten. Bitte probiere es erneut oder kontaktiere den Support.'),
                        'autoClose': true
                    });
                }
            );
          };

          // Get the game class

          modal.getClass = function(element)
          {

              if(angular.isDefined(element.icon) === true)
                {
                   return element.icon;
                }

              return element.gameIcon;
          };

          // Get the lang label for the skill

          modal.getGameSkill = function(game)
          {
              var i = 0;

              for(i = 0; i < modal.skillOptions.length; i++)
              {
                  if(game.skill === modal.skillOptions[i].skill)
                  {
                      return modal.skillOptions[i].label;
                  }
              }

              return '';

          };

          modal.init();

     }
]);

angular.module('user').controller('LoginModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          modal.state = 0;

          // Change state

          modal.changeState = function($event,state)
          {
              $event.preventDefault();
              modal.state = state;
          };

          // Get class for the element

          modal.getClass    = function(stateToCheck)
          {
              return (modal.state === stateToCheck) ? 'active':'';
          };

     }
]);

angular.module('user').controller('UserMyAccountCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var myaccount = this;
          angular.extend(myaccount, $controller('BaseCtrl', {$scope: $scope}));

          

     }
]);

angular.module('user').controller('UserMyAccountEditCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$timeout',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $timeout, $controller,UserService) {

          var myaccountEdit = this;
          var date          = new Date();
          angular.extend(myaccountEdit, $controller('BaseCtrl', {$scope: $scope}));

          myaccountEdit.user             = Object.assign({},UserService.getCurrentUser());
          myaccountEdit.changeDetected   = false;
          myaccountEdit.imagePath        = '/files/avatars/' + myaccountEdit.user.uuid + '?time='+ date.getTime();
          myaccountEdit.games            = [];
          myaccountEdit.plattforms       = [];
          myaccountEdit.communications   = [];
          myaccountEdit.links            = [];

          myaccountEdit.fields           = [
            {
                "type": "input",
                "key":  "firstname",
                "templateOptions":
                {
                    "type":            "text",
                    "required":        true,
                    "label":           myaccountEdit.LANG.getString('Vorname'),
                    "placeholder":     myaccountEdit.LANG.getString('Vorname'),
                    "addonLeft": {
                      "class": ""
                    }
                }
            },
            {
                "type": "input",
                "key":  "lastname",
                "templateOptions":
                {
                    "type":            "text",
                    "required":        true,
                    "label":           myaccountEdit.LANG.getString('Nachname'),
                    "placeholder":     myaccountEdit.LANG.getString('Nachname'),
                    "addonLeft": {
                      "class": ""
                    }
                }
            },
            {
               "type": "input",
               "key":  "email",
               "templateOptions":
               {
                   "type":            "email",
                   "required":        true,
                   "label":           myaccountEdit.LANG.getString('E-Mail'),
                   "placeholder":     myaccountEdit.LANG.getString('E-Mail'),
                   "addonLeft": {
                     "class": "far fa-user"
                   }
               }
            },
            {
               "type": "input",
               "key":  "password",
               "templateOptions":
               {
                   "type":            "password",
                   "required":        false,
                   "label":           myaccountEdit.LANG.getString('Passwort'),
                   "placeholder":     myaccountEdit.LANG.getString('Passwort'),
                   "addonLeft" :{
                     "class": "fas fa-key"
                   }
               }
            },
            {
               "type": "input",
               "key":  "password2",
               "templateOptions":
               {
                   "type":            "password",
                   "required":        false,
                   "label":           myaccountEdit.LANG.getString('Passwort wiederholen'),
                   "placeholder":     myaccountEdit.LANG.getString('Passwort wiederholen'),
                   "addonLeft" :{
                     "class": "fas fa-key"
                   }
               }
            }
          ];

          myaccountEdit.fieldsNewsletter = [
              {
                 "type": "checkbox",
                 "key":  "newsletter",
                 "templateOptions":
                 {
                     "required":        false,
                     "label":           myaccountEdit.LANG.getString('Newsletter abonieren')
                 }
              }
          ];

          myaccountEdit.skillOptions    = [
              {
                 skill: 'beginner',
                 label: myaccountEdit.LANG.getString('Anfänger')
              },
              {
                 skill: 'amateur',
                 label: myaccountEdit.LANG.getString('Amateur')
              },
              {
                 skill: 'advanced',
                 label: myaccountEdit.LANG.getString('Fortgeschriten')
              },
              {
                 skill: 'pro',
                 label: myaccountEdit.LANG.getString('Profi')
              }
          ];

          myaccountEdit.acceptTypes    = 'image/*,application/pdf';

          myaccountEdit.watchCheck     = function(newValue,attr)
          {

              var i = 0;

              if(angular.isUndefined(newValue[attr]) === true)
              {
                 return;
              }

              for(i = 0; i < newValue[attr].length; i++)
              {

                  if(angular.isUndefined(newValue[attr][i].value) === true)
                    {
                       continue;
                    }

                  if(newValue[attr][i].value.length > 0)
                        {
                            newValue[attr][i].active = true;
                        }
                  else  {
                           newValue[attr][i].active = false;
                        }
              }
          };

          // Watch the user attributes

          myaccountEdit.watch = function(newValue, oldValue, scope)
          {
                var i = 0;

                if(angular.isDefined(newValue)  === true &&
                   newValue                     !== null &&
                   angular.isDefined(oldValue)  === true &&
                   oldValue                     !== null &&
                   myaccountEdit.changeDetected !== true)
                  {
                    myaccountEdit.changeDetected = !angular.equals(myaccountEdit.user, UserService.getCurrentUser());
                  }

                if(angular.isUndefined(newValue.plattforms) === false)
                  {
                       myaccountEdit.watchCheck(newValue,'plattforms');
                  }

                if(angular.isUndefined(newValue.communications) === false)
                  {
                      myaccountEdit.watchCheck(newValue,'communications');
                  }

                if(angular.isUndefined(newValue.links) === false)
                  {
                      myaccountEdit.watchCheck(newValue,'links');
                  }

                if(angular.isUndefined(newValue.games) === false)
                  {
                        myaccountEdit.watchCheck(newValue,'games');
                  }

          };

          // Helper method to watch specfiic elements of the user

          myaccountEdit.watchAttribute        = function(newValue,attr,pid)
          {
                var i = 0;
                var j = 0;

                myaccountEdit.changeDetected = true;

                for(i = 0; i < newValue.length; i++)
                {

                    for(j = 0; j < myaccountEdit.user[attr].length; j++)
                    {

                        if(myaccountEdit.user[attr][j][pid] === newValue[i].id)
                        {
                              if(attr === 'games')
                                   {
                                     myaccountEdit.user[attr][j].skill = newValue[i].skill;
                                   }
                              else {
                                    myaccountEdit.user[attr][j].value = newValue[i].value;
                                   }
                              break;
                        }

                    }

                }
          };

          // Watcher for plattforms

          myaccountEdit.watchPlattforms       = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'plattforms','plattform_id');
          };

          // Watcher for communications

          myaccountEdit.watchCommunications   = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'communications','communication_id');
          };

          // Watcher for links

          myaccountEdit.watchLinks   = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'links','link_id');
          };

          // Watcher for games

          myaccountEdit.watchGames  = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'games','game_id');
          };

          // Save profile information

          myaccountEdit.save = function(event,data)
          {
              event.preventDefault();

              myaccountEdit.DB.call('CurrentUser','save',null,data).then(
                  function(result)
                  {

                        UserService.setCurrentUser(result.data.data);
                        $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});

                        myaccountEdit.ALERT.add({
                            'title':     myaccountEdit.LANG.getString('Profil aktualisiert'),
                            'message':   myaccountEdit.LANG.getString('Dein Profil wurde erfolgreich aktualisiert.'),
                            'autoClose': true
                        });

                        $state.go('app.user.myaccount');

                  },
                  function(errorResult)
                  {
                      myaccountEdit.ALERT.add({
                          'title':     myaccountEdit.LANG.getString('Fehler beim Speichern'),
                          'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                          'autoClose': true
                      });
                  }
              );

          };

          // Setup the value field

          myaccountEdit.setUpValue    = function(attr,pid)
          {
              var i = 0;
              var j = 0;
              var k = 0;

              for(j = 0; j < myaccountEdit.user[attr].length; j++)
              {
                  for(i = 0; i < myaccountEdit[attr].length; i++)
                  {
                      if(myaccountEdit[attr][i].id === myaccountEdit.user[attr][j][pid])
                      {

                          if(attr === 'games')
                               {

                                  myaccountEdit[attr][i].active = myaccountEdit.user[attr][j].active;

                                  for(k = 0; k < myaccountEdit.skillOptions.length; k++)
                                  {
                                      if(myaccountEdit.user[attr][j].skill ===  myaccountEdit.skillOptions[k].skill)
                                      {
                                          myaccountEdit[attr][i].skill = myaccountEdit.skillOptions[k];
                                      }
                                  }

                               }
                          else {
                                  myaccountEdit[attr][i].value = myaccountEdit.user[attr][j].value;
                               }
                          break;
                      }
                  }
              }
          };

          // Response if avatar got updated

          myaccountEdit.avatarUpdated = function(response)
          {

              myaccountEdit.imagePath      = '';

              myaccountEdit.ALERT.add({
                  'title':     myaccountEdit.LANG.getString('Avatar aktualisiert'),
                  'message':   myaccountEdit.LANG.getString('Du hast dein Profilbild erfolgreich aktualisiert.'),
                  'autoClose': true
              });

              date          = new Date();

              $timeout(function()
              {
                  myaccountEdit.imagePath      = '';
                  $scope.$apply();

                  $timeout(function()
                  {
                      myaccountEdit.imagePath      = '/files/avatars/' + myaccountEdit.user.uuid+'?time='+ date.getTime();
                      $scope.$apply();
                  },200);

              },0);
          };

          // Init the account information

          myaccountEdit.init           = function()
          {

              myaccountEdit.DB.call('Games','all').then(
                function(result)
                {
                    myaccountEdit.games = result.data.data;

                    $timeout(function(){
                      $scope.$apply();
                    });

                    myaccountEdit.setUpValue('games','game_id');

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Spiele'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Spiele aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

              myaccountEdit.DB.call('Plattforms','all').then(
                function(result)
                {

                    myaccountEdit.plattforms = result.data.data;

                    myaccountEdit.setUpValue('plattforms','plattform_id');

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Plattformen'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

              myaccountEdit.DB.call('Communications','all').then(
                function(result)
                {

                    myaccountEdit.communications = result.data.data;

                    myaccountEdit.setUpValue('communications','communication_id');

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Kommunikationsmethoden'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kommunikationsmethoden aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

              myaccountEdit.DB.call('Links','all').then(
                function(result)
                {

                    myaccountEdit.links = result.data.data;

                    myaccountEdit.setUpValue('links','link_id');

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Linktypen'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Linktypen aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

          };

          // Get the class for a game

          myaccountEdit.getClass        = function(gameId)
          {
              return myaccountEdit.getHelperClass('games','game_id',gameId);
          };

          // Get the class for a plattform

          myaccountEdit.getPlattformClass        = function(plattformId)
          {
              return myaccountEdit.getHelperClass('plattforms','plattform_id',plattformId);
          };

          // Get the class for a plattform

          myaccountEdit.getCommuniationClass        = function(communicationId)
          {
              return myaccountEdit.getHelperClass('communications','communication_id',communicationId);
          };

          // Get the class for a link

          myaccountEdit.getLinkClass        = function(linkId)
          {
              return myaccountEdit.getHelperClass('links','link_id',linkId);
          };

          // Helper method for css

          myaccountEdit.getHelperClass        = function(attr,pid,value)
          {
              var i = 0;

              if(angular.isDefined(myaccountEdit.user) === false)
                {
                   return '';
                }

              for(i = 0; i < myaccountEdit.user[attr].length; i++)
              {
                  if(value === myaccountEdit.user[attr][i][pid] && myaccountEdit.user[attr][i].active === true)
                    {
                       return 'active';
                    }
              }

              return '';

          };

          // Toogle game status

          myaccountEdit.toggleGame      = function(gameId,noSet)
          {
              myaccountEdit.toggleItemData('games','game_id','addGame','game',gameId,noSet);
          };

          // Toogle plattform status

          myaccountEdit.togglePlattform      = function(plattformId,noSet)
          {
              myaccountEdit.toggleItemData('plattforms','plattform_id','addPlattform','plattform',plattformId,noSet);
          };

          // Toogle communication status

          myaccountEdit.toggleCommunication      = function(communicationId,noSet)
          {
              myaccountEdit.toggleItemData('communications','communication_id','addCommunication','communication',communicationId,noSet);
          };

          // Toogle link status

          myaccountEdit.toggleLink      = function(linkId,noSet)
          {
              myaccountEdit.toggleItemData('links','link_id','addLink','link',linkId,noSet);
          };

          // Helper method to toggle item data

          myaccountEdit.toggleItemData = function(attr,pid,method,id,value,noSet)
          {
            var i         = 0;
            var iF        = -1;
            var f         = false;
            var found2Add = false;

            var obj       = Object.assign({},{});

            obj[id] = value;

            if(angular.isUndefined(noSet) === true)
            {
               noSet = false;
            }

            myaccountEdit.changeDetected = true;

            for(i = 0; i < myaccountEdit.user[attr].length; i++)
            {

                if(value === myaccountEdit.user[attr][i][pid])
                  {
                     if(noSet === false)
                     {
                     myaccountEdit.user[attr][i].active = !myaccountEdit.user[attr][i].active;
                     }
                     f                                  = true;
                     iF                                 = i;
                     break;
                  }
            }

            if(f === false)
              {

                  myaccountEdit.DB.call('CurrentUser',method ,null,obj).then(
                      function(result)
                      {

                            for(i = 0; i < myaccountEdit.user[attr].length; i++)
                            {
                                if(myaccountEdit.user[attr][i] === result.data.data[pid])
                                  {
                                     found2Add = true;
                                     break;
                                  }
                            }

                            if(found2Add === false)
                              {
                                  myaccountEdit.user[attr][myaccountEdit.user[attr].length] = result.data.data;

                                  if(attr === 'games')
                                    {
                                      myaccountEdit.setUpValue('games','game_id');
                                    }

                              }

                            $timeout(function()
                            {
                                $scope.$apply();
                            });

                      },
                      function(errorResult)
                      {
                          myaccountEdit.ALERT.add({
                              'title':     myaccountEdit.LANG.getString('Fehler beim Hinzufügen des Eintrages'),
                              'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                              'autoClose': true
                          });
                      }

                  );

              }
          };

          myaccountEdit.updateUser = function()
          {
            myaccountEdit.DB.call('CurrentUser','check',null,null).then(
              function(result){

                // Successful getting the user data
                UserService.setCurrentUser(result.data);

              }
            );

        };

          myaccountEdit.init();

          // Watchers

          $scope.$watch('myaccountEdit.user',           myaccountEdit.watch,               true);
          $scope.$watch('myaccountEdit.plattforms',     myaccountEdit.watchPlattforms,     true);
          $scope.$watch('myaccountEdit.communications', myaccountEdit.watchCommunications, true);
          $scope.$watch('myaccountEdit.links',          myaccountEdit.watchLinks,          true);
          $scope.$watch('myaccountEdit.games',          myaccountEdit.watchGames,          true);

     }
]);

angular.module('user').controller('UserPanelCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var userpanel = this;
          angular.extend(userpanel, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          userpanel.user     = null;
          userpanel.username = null;

          // Init function

          userpanel.init = function()
          {

                // Get the user information
                userpanel.user = UserService.getCurrentUser();

          };

          userpanel.openLogin = function(e)
          {

                userpanel.createModal({
                    'background' : 'rgba(0,0,0,0.5)',
                    'content':     '<login-modal>...</login-modal>'
                },function(){

                });

          };

          userpanel.openRequests = function(e)
          {
              userpanel.createModal({
                  'background' : 'rgba(34,181,115,0.8)',
                  'content':     '<friends-requests-modal>...</friends-requests-modal>'
              },function(){

              });
          };

          // Init

          userpanel.init();

          // Watchers

          $scope.$on('userLogged',function(event,args){

              if(angular.isDefined(args) === true &&
                 args.success            === true)
                {
                      UserService.setCurrentUser(args.user);
                }

              userpanel.init();

          });

     }
]);

angular.module('user').controller('UserRegisterCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     '$compile',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller, $timeout,$compile,UserService) {

          var register = this;
          angular.extend(register, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          register.fieldData = {};

          register.fields    = [
             {
                 "type": "input",
                 "key":  "username",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           register.LANG.getString('Benutzername'),
                     "placeholder":     register.LANG.getString('Benutzername'),
                     "addonLeft": {
                       "class": ""
                     }
                 }
             },
             {
                 "type": "input",
                 "key":  "firstname",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           register.LANG.getString('Vorname'),
                     "placeholder":     register.LANG.getString('Vorname'),
                     "addonLeft": {
                       "class": ""
                     }
                 }
             },
             {
                 "type": "input",
                 "key":  "lastname",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           register.LANG.getString('Nachname'),
                     "placeholder":     register.LANG.getString('Nachname'),
                     "addonLeft": {
                       "class": ""
                     }
                 }
             },
             {
                "type": "input",
                "key":  "email",
                "templateOptions":
                {
                    "type":            "email",
                    "required":        true,
                    "label":           register.LANG.getString('E-Mail'),
                    "placeholder":     register.LANG.getString('E-Mail'),
                    "addonLeft": {
                      "class": "far fa-user"
                    }
                }
             },
             {
                "type": "input",
                "key":  "password",
                "templateOptions":
                {
                    "type":            "password",
                    "required":        true,
                    "label":           register.LANG.getString('Passwort'),
                    "placeholder":     register.LANG.getString('Passwort'),
                    "addonLeft" :{
                      "class": "fas fa-key"
                    }
                }
             },
             {
                "type": "input",
                "key":  "password2",
                "templateOptions":
                {
                    "type":            "password",
                    "required":        true,
                    "label":           register.LANG.getString('Passwort wiederholen'),
                    "placeholder":     register.LANG.getString('Passwort wiederholen'),
                    "addonLeft" :{
                      "class": "fas fa-key"
                    }
                }
             },
             {
                "type": "checkbox",
                "key":  "terms",
                "templateOptions":
                {
                    "required":        true,
                    "label":           register.LANG.getString('Hiermit akzeptiere ich die {{agb}} und die {{rules}}', {agb : register.LANG.getString('Allgemeine Geschäftsbedingungen'), rules: register.LANG.getString('Verhaltensregeln')})
                }
             },
             {
                "type": "checkbox",
                "key":  "gdpr",
                "templateOptions":
                {
                    "required":        true,
                    "label":           register.LANG.getString('Hiermit akzeptiere ich die {{gdpr}}', {gdpr : register.LANG.getString('Datenschutz-Erklärungen')})
                }
             },
             {
                "type": "checkbox",
                "key":  "newsletter",
                "templateOptions":
                {
                    "required":        false,
                    "label":           register.LANG.getString('Ich möchte den Newsletter abonieren')
                }
             }
          ];

          register.errors =  [];

          // Submit form

          register.submit = function()
          {

              register.loading = true;
              register.errors  = [];

              // Reset password

              register.DB.call('Auth','register',null,register.fieldData).then(
                  function(result)
                  {
                      register.loading     = false;
                      register.fieldsReset = false;
                      register.errors      = [];

                      // Success - close modal and redirect

                      $rootScope.$broadcast('$modalClose');
                      $state.go('login.login');

                  },
                  function(errorResult)
                  {

                      // errors at the api/db

                      register.loading = false;
                      register.errors  = [errorResult.data.message];
                      register.errors  = register.errors.concat(errorResult.data.errors !== undefined ? errorResult.data.errors : []);

                      if(register.errors.length === 0  || angular.isUndefined(register.errors[0]) === true)
                        {
                              register.errors[register.errors.length] = register.LANG.getString('Unbekannter Fehler aufgetreten.');
                        }
                  }
              );


          };
          // Init function

          register.init = function()
          {
                register.loading = false;
          };

          // Init

          register.init();

     }
]);

angular.module('user').controller('UserRegisterSiteCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var registersite = this;
          angular.extend(registersite, $controller('BaseCtrl', {$scope: $scope}));

     }
]);
