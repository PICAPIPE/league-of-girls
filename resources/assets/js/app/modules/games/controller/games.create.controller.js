angular.module('games').controller('GamesCreateCtrl',[
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
              ctrl.DB.call('Games',method, params, ctrl.fieldData).then(
                function(result)
                {
                    var fn = null;

                    if (angular.isDefined(ctrl.onSave)  === true &&
                        angular.isFunction(ctrl.onSave) === true)
                           {
                           fn = ctrl.onSave;
                           fn(result);
                           $rootScope.$broadcast('entry-save', {uuid:ctrl.uuid,data:result.data.data});
                           }
                    $rootScope.$broadcast('$modalClose');
                    $rootScope.$broadcast('reload-data');
                    $rootScope.$broadcast('reload-games');
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
                        'title':     ctrl.LANG.getString('Fehler beim Speichern des Spiels aufgeteten.'),
                        'message':   message,
                        'autoClose': true
                    });
                }
              );
          };

          ctrl.loadFields = function()
          {
            ctrl.fields = [
              {
                 "type": "input",
                 "key":  "name",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Spielname'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie den Namen des Spiels ein.')
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {

                 }
              },
              {
                 "type": "input",
                 "key":  "short",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Kurzbezeichnung'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie eine Kurzbezeichnung fürs Spiel ein. Sie wird im Menü angezeigt.')
                 }
              },
              {
                 "type": "input",
                 "key":  "icon",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Icon'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie die CSS-Klasse für das Icon ein, welches für das Spiel verwendet werden soll.')
                 }
              },
              {
                 "type": "input",
                 "key":  "color",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Farbe'),
                     "placeholder":     ctrl.LANG.getString('Wählen Sie eine Farbe für das Spiel aus.')
                 }
              },
              {
                 "type": "input",
                 "key":  "background",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Hintergrundfarbe'),
                     "placeholder":     ctrl.LANG.getString('Wählen Sie eine Hintergrundfarbe für das Spiel aus.')
                 }
              },
              {
                 "type": "checkbox",
                 "key":  "published",
                 "templateOptions":
                 {
                     "required":        false,
                     "label":           ctrl.LANG.getString('Veröffentlichen')
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {

                 }
              }
            ];
          }

          // Init point
          ctrl.$onInit = function()
          {
                ctrl.fields       = [];

                if (angular.isDefined(ctrl.uuid) === true)
                      {
                      ctrl.DB.call('Games','show',ctrl.uuid).then(
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
                                  'title':     ctrl.LANG.getString('Fehler beim Öffnen des Spiels aufgetreten.'),
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
