appConfig.registerModule('core');

angular.module('core').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'gettext',
    '$httpProvider',
    '$injector',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext,$httpProvider,$injector) {

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
              },
              redirectOnLoggged: true
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
            },
            {
              name:      'app.privacy',
              url:       '/privacy',
              views:     {
                  '!$default.content':{
                      'templateUrl': 'views/core/privacy.html',
                      'controller':  'CorePrivacyCtrl as privacy'
                  }
              }
            },
            {
              name:      'app.error403',
              url:       '/403',
              views:     {
                  '!$default.content':{
                      'templateUrl': 'views/core/error.html',
                      'controller':  'CoreError403Ctrl as ctrl'
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

        $urlRouterProvider.otherwise(function($injector, $location){

              var requestValue = $location.path().substr(1);

              var $state       = $injector.get('$state');
              var DB           = $injector.get('DB');

              DB.call('Pages','view', {id:requestValue}, {}).then(
                  function(data)
                  {
                      var routeName = 'app_' + data.data.data.uuid;

                      // Check if this site is a redirect
                      if (data.data.data.type === 'redirect')
                            {
                            window.location.replace(data.data.data.url);
                            return;
                            }

                      $stateProvider.state(routeName, {
                            url:    data.data.data.alias,
                            parent: 'app',
                            data: data.data,
                            views: {
                                '!$default.content':{
                                    'templateUrl': 'views/core/dynamic.html',
                                    'controller':  'CoreDynamicCtrl as site'
                                }
                            }
                        });

                        $state.go(routeName,data.data);

                  },
                  function(errorResult)
                  {
                      // Site not found our error while request
                      $state.go('app.start');
                  }
              );

        });

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

                    hasRole = usersrv.hasPermission(roles);

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
                          $state.go('app.error403');
                          return trans.router.stateService.target('app.error403');
                      }

              }

        };

      $transitions.onStart({ to: '**' }, function(trans) {

          var usersrv           = trans.injector().get('UserService');
          var user              = usersrv.getCurrentUser();

          window.scrollTo(0, 0);

          if    (user === null)
                {
                    // Check current user data
                    DB.call('CurrentUser','check',{sockedId:Echo.socketId()}).then(
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


angular.module('core')
.filter('hashtag', function() {
  return function(input, uppercase) {
    var out       = input;
    var i         = 0;

    var tagsFound     = input.match(new RegExp('\\#[a-zA-Z0-9\\$\\-\\_]{1,}','gmi'));
    var mentionsFound = input.match(new RegExp('\\@[a-zA-Z0-9\\$\\-\\_]{1,}','gmi'));
    var imagesFound   = input.match(new RegExp('(src)="(http|https){1}\\:\\/\\/[a-zA-Z0-9\\_\\-\\#\\?\\=]{1,}\\.[a-z]{2,}([a-zA-Z0-9\\_\\-\\#\\?\\=\\&\\.\\/]{1,})"','gmi'));
    var urlFound      = input.match(new RegExp('(http|https){1}\\:\\/\\/[a-zA-Z0-9\\_\\-\\#\\?\\=]{1,}\\.[a-z]{2,}([a-zA-Z0-9\\_\\-\\#\\?\\=\\&\\.\\/]{1,})','gmi'));
    var aLinkFound    = input.match(new RegExp('(<a([a-zA-Z0-9\\s\\=\\-\\_\\:\\/\\\\.\\"\\\'\\?\\&]){0,}>([äöüa-zA-Z0-9\\s\\=\\-\\_\\:\/\\\.\\"\\\'\\?\\&]){0,}<\\/a>)','gmi'));

    var imageMap      = [];
    var aMap          = [];

    // Store found links 
    if (aLinkFound !== null && aLinkFound !== undefined)
          {
          for (i = 0; i < aLinkFound.length; i++)
            {                 
            input = input.replace(aLinkFound[i],'%%LINK' + i + '%%');      
            aMap[aMap.length] = aLinkFound[i];   
            }
          }

    // Store found images 
    if (imagesFound !== null && imagesFound !== undefined)
          {
          for (i = 0; i < imagesFound.length; i++)
            {                 
            input = input.replace(imagesFound[i],'%%IMAGE' + i + '%%');      
            imageMap[imageMap.length] = imagesFound[i];   
            }
          }

    if (urlFound !== null)
          {
          for (i = 0; i < urlFound.length; i++)
                 {                 
                 input = input.replace(urlFound[i],'<a class="url" href="'+urlFound[i]+'" target="_blank">' + urlFound[i] + '</span>');              
                 }
          }

    // Restore found images 
    if (imagesFound !== null && imagesFound !== undefined)
          {
          for (i = 0; i < imagesFound.length; i++)
            {                 
            input = input.replace('%%IMAGE' + i + '%%', imageMap[i]);              
            }
          }

    // Restore found links 
    if (aLinkFound !== null && aLinkFound !== undefined)
          {
          for (i = 0; i < aLinkFound.length; i++)
            {                 
            input = input.replace('%%LINK' + i + '%%', aMap[i]);              
            }
          }

    // Replace mentions
    if (mentionsFound !== null)
          {
          for (i = 0; i < mentionsFound.length; i++)
                 {                 
                 input = input.replace(mentionsFound[i],'<span class="mention" ng-click="ctrl.doSearch($event,\''+mentionsFound[i].substr(1)+'\')">' + mentionsFound[i] + '</span>');              
                 }
          }

    if (tagsFound !== null)
          {
          for (i = 0; i < tagsFound.length; i++)
                 {                 
                 input = input.replace(tagsFound[i],'<span class="hashtag" ng-click="ctrl.doSearch($event,\''+tagsFound[i].substr(1)+'\')">' + tagsFound[i] + '</span>');              
                 }
          }
  
    out = input;
    
    return out;
  };
})