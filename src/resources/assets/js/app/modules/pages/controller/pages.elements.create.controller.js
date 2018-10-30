angular.module('pages').controller('PagesElementsCreateCtrl',[
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

              params         = Object.assign({}, ctrl.fieldData);
              params.page_id = ctrl.pageId;

              if (angular.isUndefined(ctrl.fieldData.uuid))
                    {
                      ctrl.DB.call('Elements',method, params).then(
                          function(result){

                              $rootScope.$broadcast('$modalClose');
                              $rootScope.$broadcast('page-reload');

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
                                'title':     ctrl.LANG.getString('Fehler beim Speichern des Elements aufgetreten.'),
                                'message':   message,
                                'autoClose': true
                            });
                          }
                      );
                    }
              else  {
                      ctrl.DB.call('Elements','update',ctrl.fieldData.uuid,params).then(
                          function(result){

                              $rootScope.$broadcast('$modalClose');
                              $rootScope.$broadcast('page-reload');

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
                                'title':     ctrl.LANG.getString('Fehler beim Speichern des Elements aufgetreten.'),
                                'message':   message,
                                'autoClose': true
                            });
                          }
                      );
                    }


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
                     "defaultValue":    "headline",
                     "options": [
                        {label: ctrl.LANG.getString('Überschrift'),      id: 'headline',      group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Text'),             id: 'text',          group: ctrl.LANG.getString('Standard')},
                        //{label: ctrl.LANG.getString('Bild'),             id: 'image',         group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('HTML'),             id: 'html',          group: ctrl.LANG.getString('Standard')},
                        {label: ctrl.LANG.getString('Youtube'),          id: 'youtube',       group: ctrl.LANG.getString('Medien')},
                        {label: ctrl.LANG.getString('Twitter'),          id: 'twitter',       group: ctrl.LANG.getString('Medien')},
                        {label: ctrl.LANG.getString('Twitch'),           id: 'twitch',        group: ctrl.LANG.getString('Medien')},
                        //{label: ctrl.LANG.getString('Benutzerdefiniert'),id: 'custom',        group: ctrl.LANG.getString('Standard')}
                      ],
                      "groupProp": 'group',
                      "valueProp": 'id',
                      "labelProp": 'label',
                      "className": 'col-xs-12'
                 }
              },
              {
                 "type": "input",
                 "key":  "headline",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Überschrift'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie hie die Überschrift ein.'),
                     "className":       'col-xs-12 col-md-8 col-lg-8'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || (scope.model.type !== 'headline' && scope.model.type !== 'text');
                 }
              },
              {
                 "type":         "select",
                 "key":          "headlineSize",
                 "defaultValue": "h1",
                 "templateOptions":
                 {
                     "type":            "select",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Überschriftgröße'),
                     "defaultValue":    "headline",
                     "options": [
                        {label: ctrl.LANG.getString('Überschrift 1'),      id: 'h1'},
                        {label: ctrl.LANG.getString('Überschrift 2'),      id: 'h2'},
                        {label: ctrl.LANG.getString('Überschrift 3'),      id: 'h3'},
                        {label: ctrl.LANG.getString('Überschrift 4'),      id: 'h4'},
                        {label: ctrl.LANG.getString('Überschrift 5'),      id: 'h5'},
                        {label: ctrl.LANG.getString('Überschrift 6'),      id: 'h6'}
                      ],
                      "groupProp": 'group',
                      "valueProp": 'id',
                      "labelProp": 'label',
                      "className": 'col-xs-12 col-md-4 col-lg-4'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || (scope.model.type !== 'headline' && scope.model.type !== 'text');
                 }
              },
              {
                 "type": "textarea",
                 "key":  "text",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('Text'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie den gewünschten Text ein.'),
                     "className":       'col-xs-12  col-lg-12'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || scope.model.type !== 'text';
                 }
              },
              {
                 "type": "textarea",
                 "key":  "html",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           ctrl.LANG.getString('HTML'),
                     "placeholder":     ctrl.LANG.getString('Bitte geben Sie HTML-Code ein.'),
                     "className":       'col-xs-12  col-lg-12'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || scope.model.type !== 'html';
                 }
              },
              {
                 "type": "input",
                 "key":  "twitter",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Twitter-URL'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie hier die URL zum Tweet ein.'),
                     "className":       'col-xs-12 col-lg-12'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || (scope.model.type !== 'twitter');
                 }
              },
              {
                 "type": "input",
                 "key":  "youtube",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Youtube-ID'),
                     "placeholder":     ctrl.LANG.getString('Bitte geben Sie hier die Youtube Video ID ein.'),
                     "className":       'col-xs-12 col-lg-12'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || (scope.model.type !== 'youtube');
                 }
              },
              {
                 "type": "input",
                 "key":  "twitch",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('Channel-ID'),
                     "placeholder":     ctrl.LANG.getString('Bitte geben Sie hier die Twitch Channel ID ein.'),
                     "className":       'col-xs-12 col-lg-12'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type === '' ||  scope.model.type === undefined || (scope.model.type !== 'twitch');
                 }
              },
              {
                 "type":            "input",
                 "key":             "cssClass",
                 "defaultValue":    "col-xs-12 col-lg-12",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        false,
                     "label":           ctrl.LANG.getString('CSS-Klasse'),
                     "placeholder":     ctrl.LANG.getString('Geben Sie eine CSS-Klasse ein.'),
                     "className":       'col-xs-12  col-lg-12'
                 },
                 hideExpression: function($viewValue, $modelValue, scope) {

                 }
              },
              {
                 "type": "checkbox",
                 "key":  "published",
                 "templateOptions":
                 {
                     "required":        false,
                     "label":           ctrl.LANG.getString('Veröffentlichen'),
                     "className":       'col-xs-12 col-lg-12'
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

                if (angular.isDefined(ctrl.elementId) === true)
                      {
                      ctrl.DB.call('Elements','show', ctrl.elementId).then(
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
