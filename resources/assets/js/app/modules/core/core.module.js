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
        $urlRouterProvider.otherwise('/', fallbackUrl);

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
