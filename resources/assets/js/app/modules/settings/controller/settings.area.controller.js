angular.module('settings').controller('SettingsAreaCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var setting = this;
          angular.extend(setting, $controller('BaseCtrl', {$scope: $scope}));

          setting.headline = '';
          setting.data     = {};
          setting.options  = {};
          setting.page     = 1;

          setting.$onInit = function () {
              setting.getData(setting.page);
          };

          // Get data for the setting
          setting.getData = function(page,search)
          {
            setting.page = page;
            if (setting.page <= 0)
                  {
                  setting.page = 1
                  }

            if (angular.isUndefined(search) === true)
                  {
                  search = '';
                  }

            if (angular.isUndefined($state.current.datalist)    === true &&
                angular.isUndefined($state.current.datalist.DB) === true)
                 {
                 if (window.LARAVEL.debug === true)
                      {
                      console.warn('The current state does not provide any datalist information (required)');
                      $state.go('app.settings.overview');
                      }
                 return;
                 }

            setting.headline = $state.current.label || setting.LANG.getString('Einstellung');
            setting.template = $state.current.datalist.template;

            setting.DB.call($state.current.datalist.DB,'get', {showUnpublished:true,page:page,search:search}).then(
              function(result)
              {
                  setting.data = result;
                  $timeout(function(){
                      $scope.$apply();
                  });
              },
              function(errorResult)
              {
                  setting.data = errorResult;
                  $timeout(function(){
                      $scope.$apply();
                  });
              }
            );
          };

          // Pagination output event
          setting.onPagination = function(type,page)
          {
            setting.getData (page);
          };

          // Pagination output event
          setting.onSearch = function(searchTerm)
          {
            setting.getData (1,searchTerm);
          };

          // Button actions
          setting.onAction = function(type,entry)
          {
            if (angular.isUndefined($state.current.datalist)    === true &&
                angular.isUndefined($state.current.datalist.DB) === true)
                 {
                 if (window.LARAVEL.debug === true)
                      {
                      console.warn('The current state does not provide any datalist information (required)');
                      $state.go('app.settings.overview');
                      }
                 return;
                 }
              switch(type)
                 {
                 case 'edit':
                    setting.editElement(entry.uuid);
                    break;
                 case 'delete':
                   setting.DB.call($state.current.datalist.DB,'destroy', {id:entry.uuid}).then(
                     function(result)
                     {
                         setting.getData (setting.page);
                     },
                     function(errorResult)
                     {
                         // Error message
                         setting.ALERT.add({
                             'title':     setting.LANG.getString('Fehler beim Löschen aufgetreten.'),
                             'message':   errorResult.message,
                             'autoClose': true
                         });
                     }
                   );
                    break;
                 }
          };

          // Open create dialog for the
          setting.createElement = function()
          {
              setting.createModal({
                    'background' : $state.current.datalist.color !== undefined ? $state.current.datalist.color : 'rgba(174,174,174,0.8)',
                    'content':     '<' + $state.current.datalist.component + ' on-save="setting.onSave"></' + $state.current.datalist.component + '>'
              },function(){

              });
          };

          // Open edit dialog
          setting.editElement = function(uuid)
          {
              setting.createModal({
                    'background' : $state.current.datalist.color !== undefined ? $state.current.datalist.color : 'rgba(174,174,174,0.8)',
                    'content':     '<' + $state.current.datalist.component + ' uuid="'+ uuid + '" on-save="setting.onSave"></' + $state.current.datalist.component + '>'
              },function(){

              });
          };

          // Save callback
          setting.onSave = function(result)
          {
              setting.getData (setting.page);
          };

     }
]);
