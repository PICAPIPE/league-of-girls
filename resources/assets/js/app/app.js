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
