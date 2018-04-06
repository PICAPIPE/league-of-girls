// Init the application configuration module for AngularJS application
var appConfig = (function() {

    var appModuleName               = 'app';
    var appModuleVendorDependencies = [
      'ui.router',
      'formly',
      'gettext',
      'ambersive.db',
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
      'gettext',
      'ambersive.db',
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


appConfig.registerModule('core');

angular.module('core').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,DBProvider,gettext) {

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


    }]);

angular.module('core').component('imprint.core', {
  templateUrl:  'views/core/imprint.html',
  controller:   'CoreImprintCtrl as imprint'
})

angular.module('core').component('layout', {
  template:     '<ui-view></ui-view>',
  controller:   'CoreLayoutCtrl as layout'
})

angular.module('core').component('start.core', {
  templateUrl:  'views/core/start.html',
  controller:   'CoreStartCtrl as ctrl'
});

angular.module('core').controller('BaseCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     'gettextCatalog',
     'DB',
     function($scope, $rootScope, $state, $window, gettextCatalog, DB) {

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
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

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

          ctrl.name = 'League of girls';

     }
]);
