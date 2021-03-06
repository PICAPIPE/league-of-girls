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
      'lr.upload',
      'angular-sortable-view'
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
