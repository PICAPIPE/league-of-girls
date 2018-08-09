angular.module('core').controller('BaseCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     'gettextCatalog',
     'DB',
     'AlertService',
     'UserService',
     function($scope, $rootScope, $state, $window, gettextCatalog,DB,AlertService,UserService) {

          var ctrl = this;

          ctrl.DB      = DB;
          ctrl.LANG    = gettextCatalog;
          ctrl.ALERT   = AlertService;
          ctrl.MOMENT  = $window.moment;
          ctrl.USER    = UserService;
          ctrl.STATE   = {};

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

          ctrl.loadOnInit = function()
          {
              try {
                  ctrl.STATE = $state.current.data.data;
                  }
              catch (err)
                  {
                  ctrl.STATE = {};
                  }
          };

          ctrl.loadOnInit();

     }
]);
