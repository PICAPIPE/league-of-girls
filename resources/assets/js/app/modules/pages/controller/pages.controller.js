angular.module('pages').controller('PagesOverviewCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.data    = {};
          ctrl.options = {};
          ctrl.page    = 1;

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
            ctrl.DB.call('Pages','get', {showUnpublished:true,page:page,search:search}).then(
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
                    'background' : 'rgba(75, 54, 124,0.8)',
                    'content':     '<page-create></page-create>'
              },function(){

              });
          };

          // Create page
          ctrl.editPage = function(id)
          {
              ctrl.createModal({
                    'background' : 'rgba(75, 54, 124,0.8)',
                    'content':     '<page-create page-id="'+ id + '"></page-create>'
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
                   ctrl.DB.call('Pages','destroy', {id:entry.uuid}).then(
                     function(result)
                     {
                         ctrl.getData (ctrl.page);
                     },
                     function(errorResult)
                     {
                         // Error message
                         ctrl.ALERT.add({
                             'title':     chat.LANG.getString('Fehler beim Löschen aufgetreten.'),
                             'message':   errorResult.message,
                             'autoClose': true
                         });
                     }
                   );
                    break;
                 }
          };

     }
]);
