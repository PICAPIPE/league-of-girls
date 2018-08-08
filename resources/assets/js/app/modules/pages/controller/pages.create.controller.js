angular.module('pages').controller('PagesCreateCtrl',[
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

              if (angular.isDefined(ctrl.pageId) === true)
                    {
                    method = 'update';
                    params = {'id':ctrl.pageId};
                    }
              ctrl.DB.call('Pages',method, params, ctrl.fieldData).then(
                function(result)
                {
                    var fn = null;

                    if (angular.isDefined(ctrl.onSave) === true &&
                        angular.isFunction(ctrl.onSave) === true)
                           {
                           fn = ctrl.onSave;
                           fn(result);
                           $rootScope.$broadcast('page-save', {uuid:ctrl.pageId,data:result.data.data});
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
                        'title':     ctrl.LANG.getString('Fehler beim Speichern der Seite aufgeteten.'),
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
                 "type":         "select",
                 "key":          "type",
                 "templateOptions":
                 {
                     "type":            "select",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Typ'),
                     "defaultValue":    "link",
                     "options": [
                        {label: ctrl.LANG.getString('Standard'),     id: 'page',      group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Weiterleitung'),id: 'redirect',  group: ctrl.LANG.getString('Weiterleitung')}
                      ],
                      "groupProp": 'group',
                      "valueProp": 'id',
                      "labelProp": 'label',
                      "className": 'col-xs-12'
                 }
              },
              {
                 "type": "input",
                 "key":  "name",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Seitenname'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie einen Seitenname ein.')
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                     //return scope.model.type !== 'link';
                 }
              },
              {
                 "type": "input",
                 "key":  "alias",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Alias'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie einen Seitenalias unter dem die Seite erreichbar sein soll.')
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {

                 }
              },
              {
                 "type": "input",
                 "key":  "url",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('URL'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie eine Adresse ein auf die weitergeleitet werden soll.')
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                     return scope.model.type !== 'redirect';
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
              },
            ];
          }

          // Init point
          ctrl.$onInit = function()
          {
                ctrl.fields       = [];

                if (angular.isDefined(ctrl.pageId) === true)
                      {
                      ctrl.DB.call('Pages','show',ctrl.pageId).then(
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
                                  'title':     ctrl.LANG.getString('Fehler beim Öffnen der Seite aufgetreten.'),
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
