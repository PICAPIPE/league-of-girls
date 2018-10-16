angular.module('core').controller('CategoryCreateCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller, store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.storageKey = 'log_choosen_game';

          ctrl.errors     = [];
          ctrl.fieldData  = {};

          // Form fields

          ctrl.fields = [];

          // Submit a news entry
          ctrl.submit = function()
          {
              var method = 'store';
              var params = {};

              if (angular.isDefined(ctrl.uuid) === true)
                    {
                    method = 'update';
                    params = {'id':ctrl.uuid};
                    }
              ctrl.DB.call('Categories',method, params, ctrl.fieldData).then(
                function(result)
                {
                    var fn = null;

                    if (angular.isDefined(ctrl.onSave) === true &&
                        angular.isFunction(ctrl.onSave) === true)
                           {
                           fn = ctrl.onSave;
                           fn(result);
                           $rootScope.$broadcast('categories-save', {uuid:ctrl.uuid,data:result.data.data});
                           }

                    $rootScope.$broadcast('$modalClose');
                    $rootScope.$broadcast('reload-data');
                },
                function(errorResult)
                {
                    var message = ctrl.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                    if(angular.isDefined(errorResult.data)         === true &&
                       angular.isDefined(errorResult.data.message) === true)
                      {
                      message = errorResult.data.message;
                      }

                    ctrl.ALERT.add({
                        'title':     ctrl.LANG.getString('Fehler beim Speichern der Kategorie. aufgeteten.'),
                        'message':   message,
                        'autoClose': true
                    });
                }
              );
          };

          ctrl.loadFields = function()
          {

            if (window.LARAVEL.debug === true)
                  {
                  console.log('Load fields for crawler form');
                  }

            ctrl.DB.call('Games','all').then(
              function(result){

                  ctrl.optionsGames = [];

                  var resultGames = result.data.data;
                  var games       = [];

                  games[games.length] = {'name':'Allgemein','uuid':'-1'};

                  for (var i = 0; i < resultGames.length; i++)
                         {
                         games[games.length] = {name:resultGames[i].name,id:resultGames[i].id};
                         }

                  ctrl.fields = [                    
                    {
                       "type": "input",
                       "key":  "key",
                       "templateOptions":
                       {
                           "type":            "text",
                           "required":        true,
                           "label":           ctrl.LANG.getString('Schlüssel'),
                           "placeholder":     ctrl.LANG.getString('Gib einen eindeutigen Wert für den Schlüssel an.')
                       }
                    },
                    {
                        "type": "input",
                        "key":  "name",
                        "templateOptions":
                        {
                            "type":            "text",
                            "required":        true,
                            "label":           ctrl.LANG.getString('Name'),
                            "placeholder":     ctrl.LANG.getString('Gib eine Bezeichnung ein.')
                        }
                     }
                  ];
              },
              function(errorResult){
                  var message = ctrl.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                  if(angular.isDefined(errorResult.data)         === true &&
                     angular.isDefined(errorResult.data.message) === true)
                    {
                    message = errorResult.data.message;
                    }

                  ctrl.ALERT.add({
                      'title':     ctrl.LANG.getString('Fehler beim Öffnen/Erstellen des Crawler aufgetreten.'),
                      'message':   message,
                      'autoClose': true
                  });
                  $rootScope.$broadcast('$modalClose');
              }
            );
          }

          // Init point
          ctrl.$onInit = function()
          {
                ctrl.fields       = [];

                if (angular.isDefined(ctrl.uuid) === true)
                      {
                      ctrl.DB.call('Crawler','show',ctrl.uuid).then(
                          function(result){

                              ctrl.fieldData = result.data.data;
                              ctrl.loadFields();

                          },
                          function(errorResult)
                          {
                              // Close an trigger an error
                              $rootScope.$broadcast('$modalClose');

                              var message = ctrl.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                              if(angular.isDefined(errorResult.data)         === true &&
                                 angular.isDefined(errorResult.data.message) === true)
                                {
                                message = errorResult.data.message;
                                }

                              ctrl.ALERT.add({
                                  'title':     ctrl.LANG.getString('Fehler beim Öffnen des Crawler aufgetreten.'),
                                  'message':   message,
                                  'autoClose': true
                              });
                          }
                      );
                      }
                else  {
                      ctrl.loadFields();
                      }

          };

     }
]);
