angular.module('faq').controller('FaqCreateCtrl',[
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
              ctrl.DB.call('Faq',method, params, ctrl.fieldData).then(
                function(result)
                {
                    var fn = null;

                    if (angular.isDefined(ctrl.onSave) === true &&
                        angular.isFunction(ctrl.onSave) === true)
                           {
                           fn = ctrl.onSave;
                           fn(result);
                           $rootScope.$broadcast('faq-save', {uuid:ctrl.pageId,data:result.data.data});
                           }

                    $rootScope.$broadcast('$modalClose');
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
                        'title':     ctrl.LANG.getString('Fehler beim Speichern der Frage aufgeteten.'),
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
                 "key":  "sort",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Reihenfolge'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie einen numerischen Wert ein um die Reihenfolge zu bestimmen.')
                 }
              },
              {
                 "type": "input",
                 "key":  "question",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Frage'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie die Frage ein.')
                 }
              },
              {
                 "type": "textarea",
                 "key":  "answer",
                 "templateOptions":
                 {
                     "required":        true,
                     "label":           ctrl.LANG.getString('Antwort'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie hier die Antwort ein.')
                 }
              },
              {
                 "type": "checkbox",
                 "key":  "published",
                 "templateOptions":
                 {
                     "required":        false,
                     "label":           ctrl.LANG.getString('Veröffentlichen')
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
                      ctrl.DB.call('Faq','show',ctrl.uuid).then(
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
                                  'title':     ctrl.LANG.getString('Fehler beim Öffnen der Faq aufgetreten.'),
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
