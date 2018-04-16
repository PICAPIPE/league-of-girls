// Init the application configuration module for AngularJS application
var appConfig = (function() {

    var appModuleName               = 'app';
    var appModuleVendorDependencies = [
      'ui.router',
      'formly',
      'formlyBootstrap',
      'gettext',
      'angular-storage',
      'ngSanitize'
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
       'url'  : 'api/users'
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
           }
       ]

    },

    // Current User

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
      'ngSanitize'
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
       'url'  : 'api/users'
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
           }
       ]

    },

    // Current User

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

    }

];

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

                    if(user            === null &&
                       trans.to().name !== 'login.login')
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

                          console.log(errorResult)
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
                    userId: '='
                }
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
          type:  'put',
          name:  'update',
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
     function($scope, $rootScope, $state, $window, gettextCatalog,DB) {

          var ctrl = this;

          ctrl.DB      = DB;
          ctrl.LANG    = gettextCatalog;

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
                      background: args.settings.background !== undefined ? args.settings.background : '#f4f4f4'
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
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

     }
]);

angular.module('navigation').controller('NavigationGamesCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var gamesnavigation = this;
          angular.extend(gamesnavigation, $controller('BaseCtrl', {$scope: $scope}));

          gamesnavigation.links = [

          ];

          gamesnavigation.load  = function(){

            gamesnavigation.DB.call('Status','check').then(
              function(result){

              },
              function(errorResult){
                  console.log(errorResult);
              }
            );

                gamesnavigation.DB.call('Games','all').then(
                  function(result){

                  },
                  function(errorResult){
                      console.error('NOPE');
                  }
                );

          };

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
     function($scope, $rootScope, $state, $window, $controller) {

          var account = this;
          angular.extend(account, $controller('BaseCtrl', {$scope: $scope}));

          console.error(account);

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

                                  $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});

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
                            window.location.href = '/logout-now'
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
