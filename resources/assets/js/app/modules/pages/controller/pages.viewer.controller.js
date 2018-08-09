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
                    'content':     '<page-element-create page-id="'+ page.data.id + '" parent="' + type + '"></page-element-create>'
              },function(){

              });
          };

          // Insert content element
          page.editElement = function (uuid)
          {
              if (window.LARAVEL.debug === true)
                   {
                   console.log('Open element edit dialog for:' + uuid);
                   }
              page.createModal({
                    'background' : window.CONST.colors.pages,
                    'content':     '<page-element-create page-id="'+ page.data.id + '" element-id="' + uuid + '"></page-element-create>'
              },function(){

              });
          };


          // Page reload
          page.reload = function()
          {
              page.alias = page.data.alias;

              if (angular.isUndefined(page.alias) === true)
                    {
                    return;
                    }

              page.load();
          };

          // Element sortable
          page.onSort = function($item, $partFrom, $partTo, $indexFrom, $indexTo)
          {
             var i = 0;

             for (i = 0; i < page.data.elements.length; i ++)
                    {
                    page.data.elements[i].sort = i;
                    page.DB.call('Elements','update',page.data.elements[i].uuid, {sort:i}).then(
                      function(result)
                      {
                        if (i + 1 === page.data.elements.length)
                              {
                                page.reload();
                              }
                      },
                      function(errorResult)
                      {
                          // Error message
                          page.ALERT.add({
                              'title':     ctrl.LANG.getString('Fehler beim Aktualisieren der Reihenfolge.'),
                              'message':   errorResult.message,
                              'autoClose': true
                          });

                          if (i + 1 === page.data.elements.length)
                                {
                                  page.reload();
                                }
                      }
                    );
                    }

          }

          // Watchers

          $scope.$on('element-edit' , function (event,args) {
              if (angular.isUndefined(args.uuid) === true)
                    {
                    return;
                    }
              page.editElement (args.uuid);
          });

          $scope.$on('page-reload', function (event,args) {
              page.reload();
          });

          $scope.$on('page-save', function (event,args) {
              if (args.uuid === page.data.uuid)
                    {
                    page.onSave(args.data);
                    }
          });

     }
]);
