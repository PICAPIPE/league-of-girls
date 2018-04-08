// Init the application configuration module for AngularJS application
var appConfig = (function() {

    var appModuleName               = 'app';
    var appModuleVendorDependencies = [
      'ui.router',
      'formly',
      'gettext'
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
      'gettext'
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

var DB_SERVICES = [

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
              name:      'chat',
              component: 'layout'
            },
            {
              name:      'chat.overview',
              url:       '/chat',
              views:     {
                  'content':{
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

appConfig.registerModule('db');

angular.module('db').run([
    'DB',
    function(DB){

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
              name:      'meet',
              component: 'layout'
            },
            {
              name:      'meet.overview',
              url:       '/meet',
              views:     {
                  'content':{
                    component: 'meetOverview'
                  }
              }
            },
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
              name:      'news',
              component: 'layout'
            },
            {
              name:      'news.overview',
              url:       '/news',
              views:     {
                  'content':{
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
              name:      'user',
              component: 'layout'
            },
            {
              name:      'user.account',
              url:       '/my-account',
              component: 'start.core'
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
})

angular.module('core').component('layout', {
  templateUrl:  'views/core/layout.html',
  controller:   'CoreLayoutCtrl as layout'
})

angular.module('core').component('start.core', {
  templateUrl:  'views/core/start.html',
  controller:   'CoreStartCtrl as ctrl'
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

angular.module('user').component('myAccount', {
  templateUrl:  'views/user/myaccount.user.html',
  controller:   'UserMyAccountCtrl as myaccount'
});

angular.module('user').component('userPanel', {
  templateUrl:  'views/user/panel.user.html',
  controller:   'UserPanelCtrl as userpanel'
});
 

angular.module('db').service('APIInterceptor',[
    '$rootScope',
    function($rootScope)
    {
        var service = this;

        service.request = function(config)
        {

            /*
            var currentUser = UserService.getCurrentUser(),
                access_token = currentUser ? currentUser.access_token : null;
            if (access_token) {
                config.headers.authorization = access_token;
            }
            */

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
                                  deferred.resolve({code:200,statusCode:response.status,data:response.data,headers:response.headers});

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

          ctrl.DB   = DB;
          ctrl.LANG = gettextCatalog;

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
     function($scope, $rootScope, $state, $window, $controller,$http) {

          var site = this;
          angular.extend(site, $controller('BaseCtrl', {$scope: $scope}));

          // Listen to Request abortion

          $rootScope.$on('$abort', function (event, next, current) {

              $http.pendingRequests.forEach(function(request) {
                  console.log(request);
                  if (request.cancel) {
                      request.cancel.resolve();
                  }
              });

              console.warn('Every further request was canceled');

          });

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
                state:                'chat.overview',
                useFirstLetterAsIcon: true
            },
            {
                label:                mainnavigation.LANG.getString("News"),
                state:                'news.overview',
                useFirstLetterAsIcon: true
            },
            {
                label:                mainnavigation.LANG.getString("Meet"),
                state:                'meet.overview',
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
                state:                'chat.overview',
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
     function($scope, $rootScope, $state, $window, $controller) {

          var userpanel = this;
          angular.extend(userpanel, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          userpanel.username = null;

          // Init function

          userpanel.init = function()
          {

                

          };

          // Init

          userpanel.init();

     }
]);
