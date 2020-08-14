angular.module('pages').controller('FaqOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data    = {};
          ctrl.options = {
              actionItems:[]
          };
          ctrl.page    = 1;
          ctrl.user    = ctrl.USER.getCurrentUser();

          // Init

          ctrl.$onInit = function () {
              ctrl.getData(ctrl.page);
          };

          ctrl.getData = function(page,search)
          {
            ctrl.page = page;
            if (ctrl.page <= 0)
                  {
                  ctrl.page = 1
                  }

            if (angular.isUndefined(search) === true)
                  {
                  search = '';
                  }
            ctrl.DB.call('Faq','get', {showUnpublished:(ctrl.user !== null && ctrl.user !== undefined && ctrl.user.permissions.indexOf('Admin') !== -1),page:page,search:search}).then(
              function(result)
              {
                  ctrl.data = result;
              },
              function(errorResult)
              {
                  ctrl.data = errorResult;
              }
            );
          };

          // Create page
          ctrl.createPage = function()
          {
              ctrl.createModal({
                    'background' : window.CONST.colors.pages,
                    'content':     '<faq-create on-save="ctrl.onSave"></faq-create>'
              },function(){

              });
          };

          // Create page
          ctrl.editPage = function(uuid)
          {
              ctrl.createModal({
                    'background' : window.CONST.colors.pages,
                    'content':     '<faq-create uuid="'+ uuid + '" on-save="ctrl.onSave"></faq-create>'
              },function(){

              });
          };

          // Pagination output event
          ctrl.onPagination = function(type,page)
          {
            ctrl.getData (page);
          };

          // Pagination output event
          ctrl.onSearch = function(searchTerm)
          {
            ctrl.getData (1,searchTerm);
          };

          // Button actions
          ctrl.onAction = function(type,entry)
          {
              switch(type)
                 {
                 case 'edit':
                    ctrl.editPage(entry.uuid);
                    break;
                 case 'delete':
                   ctrl.DB.call('Faq','destroy', {id:entry.uuid}).then(
                     function(result)
                     {
                         ctrl.getData (ctrl.page);
                     },
                     function(errorResult)
                     {
                         // Error message
                         ctrl.ALERT.add({
                             'title':     ctrl.LANG.getString('Fehler beim Löschen aufgetreten.'),
                             'message':   errorResult.message,
                             'autoClose': true
                         });
                     }
                   );
                    break;
                 }
          };

          // Save callback
          ctrl.onSave = function(result)
          {
              ctrl.getData (ctrl.page);
          };

          // Broadcasts

          $rootScope.$on('faq-save', function(event,args){
              ctrl.getData (ctrl.page);
          });

     }
]);
