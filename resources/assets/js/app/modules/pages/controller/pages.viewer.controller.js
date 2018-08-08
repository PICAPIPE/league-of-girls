angular.module('pages').controller('PagesViewerCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var page = this;
          angular.extend(page, $controller('BaseCtrl', {$scope: $scope}));

          page.currentUser = page.USER.getCurrentUser();

          // Init method
          page.$onInit = function()
          {
              if (angular.isDefined(page.alias) === true)
                   {
                   // Load page
                   page.load();
                   }

          };

          page.onSave  = function(data)
          {
            if (page.data.alias !== data.alias)
                  {
                  // Redirect to new page
                  window.location.href = '/' + data.alias;
                  return;
                  }
            page.data = data;
          };

          page.load    = function()
          {
            page.DB.call('Pages','view', {id:page.alias}, {}).then(
                function(data)
                {
                    page.data = data.data.data;
                },
                function(errorResult)
                {
                    page.data  = null;
                }
            );
          };

          // Published or unpublish site
          page.publish = function(published)
          {
            page.DB.call('Pages','update', page.data.uuid, {'published': published }).then(
                function(data)
                {
                    page.data = data.data.data;
                },
                function(errorResult)
                {
                    var message = page.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                    if(angular.isDefined(errorResult.data)         === true &&
                       angular.isDefined(errorResult.data.message) === true)
                      {
                      message = errorResult.data.message;
                      }

                    page.ALERT.add({
                        'title':     page.LANG.getString('Fehler beim Aktualisieren des Datensatzes'),
                        'message':   message,
                        'autoClose': true
                    });
                }
            );
          };

          // Delete the current page
          page.delete = function()
          {
            page.DB.call('Pages','destroy', {id:page.data.uuid}).then(
              function(result)
              {
                  $state.go('app.start');
              },
              function(errorResult)
              {
                  // Error message
                  page.ALERT.add({
                      'title':     ctrl.LANG.getString('Fehler beim Löschen aufgetreten.'),
                      'message':   errorResult.message,
                      'autoClose': true
                  });
              }
            );
          };

          // Edit the current page
          page.edit = function ()
          {
              if (window.LARAVEL.debug === true)
                   {
                   console.log('Open edit dialog for:' + page.data.uuid);
                   }
              page.createModal({
                    'background' : window.CONST.colors.pages,
                    'content':     '<page-create page-id="'+ page.data.uuid + '" on-save="page.onSave"></page-create>'
              },function(){

              });
          };

          // Insert content element
          page.insert = function (type)
          {
              if (window.LARAVEL.debug === true)
                   {
                   console.log('Open element create dialog for:' + page.data.uuid);
                   }
              page.createModal({
                    'background' : window.CONST.colors.pages,
                    'content':     '<page-element page-id="'+ page.data.uuid + '" parent="' + type + '"></page-element>'
              },function(){

              });
          };

          // Watchers

          $scope.$on('page-save', function (event,args) {
              if (args.uuid === page.data.uuid)
                    {
                    page.onSave(args.data);
                    }
          });

     }
]);
