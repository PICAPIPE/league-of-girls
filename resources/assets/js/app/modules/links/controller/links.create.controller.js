angular.module('links').controller('LinksCreateCtrl',[
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
              ctrl.DB.call('Links',method, params, ctrl.fieldData).then(
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
                    $rootScope.$broadcast('reload-plattforms');
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
                        'title':     ctrl.LANG.getString('Fehler beim Speichern des Links aufgeteten.'),
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
                 "defaultValue": "blog",
                 "templateOptions":
                 {
                     "type":            "select",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Typ'),
                     "defaultValue":    "link",
                     "options": [
                        {label: ctrl.LANG.getString('Webseite'),     id: 'blog',      group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Youtube'),      id: 'youtube',   group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Twitch'),       id: 'twitch',    group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Facebook'),     id: 'facebook',  group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Twitter'),      id: 'twitter',  group: ctrl.LANG.getString('Standard')}
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
                     "label":           ctrl.LANG.getString('Name'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie  ein.')
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {

                 }
              },
              {
                 "type": "input",
                 "key":  "placeholder",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Platzhaltertext im Formular'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie einen Platzhaltertext für das Formular ein.')
                 }
              },
              {
                 "type": "input",
                 "key":  "help",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Hilfe'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie einen Hilfstext ein.')
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
                     "placeholder":     ctrl.LANG.getString('Geben Sie die CSS-Klasse für das Icon ein, welches für den Link verwendet werden soll.')
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
                      ctrl.DB.call('Links','show',ctrl.uuid).then(
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
                                  'title':     ctrl.LANG.getString('Fehler beim Öffnen des Links aufgetreten.'),
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
