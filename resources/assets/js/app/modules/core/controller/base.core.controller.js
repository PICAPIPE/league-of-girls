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
