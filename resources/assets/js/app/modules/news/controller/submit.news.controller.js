angular.module('news').controller('NewsSubmitCtrl',[
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
          ctrl.fieldData  = {
              'game':    store.get(ctrl.storageKey),
              'type':    'link'
          };

          // Form fields

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
                      {label: ctrl.LANG.getString('Blog'),    id: 'link',    group: ctrl.LANG.getString('Webseiten')},
                      {label: ctrl.LANG.getString('Youtube'), id: 'youtube', group: ctrl.LANG.getString('Streaming')},
                      {label: ctrl.LANG.getString('Twitch'),  id: 'twitch',  group: ctrl.LANG.getString('Streaming')},
                      {label: ctrl.LANG.getString('Tweet'),   id: 'twitter', group: ctrl.LANG.getString('Social Media')}
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
                   "required":        true,
                   "label":           ctrl.LANG.getString('Überschrift'),
                   "placeholder":     ctrl.LANG.getString('Überschrift eingeben')
               },
               hideExpression: function($viewValue, $modelValue, scope) {
                   return scope.model.type !== 'link';
               }
            },
            {
               "type": "textarea",
               "key":  "text",
               "templateOptions":
               {
                   "type":            "textarea",
                   "required":        false,
                   "label":           ctrl.LANG.getString('Text'),
                   "placeholder":     ctrl.LANG.getString('Bitte gib hier eine Kurzbeschreibung der Nachricht ein.')
               },
               hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type !== 'link';
               }
            },
            {
               "type": "input",
               "key":  "channel",
               "templateOptions":
               {
                   "type":            "text",
                   "required":        true,
                   "label":           ctrl.LANG.getString('Youtube-Video ID'),
                   "placeholder":     ctrl.LANG.getString('Gib bitte gib die Youtube Video Id ein.')
               },
               hideExpression: function($viewValue, $modelValue, scope) {
                    return scope.model.type !== 'youtube';
               }
            },
            {
               "type": "input",
               "key":  "channel",
               "templateOptions":
               {
                   "type":            "text",
                   "required":        true,
                   "label":           ctrl.LANG.getString('Channel Name'),
                   "placeholder":     ctrl.LANG.getString('Bitte gib einen Twitch Channel ein.')
               },
               hideExpression: function($viewValue, $modelValue, scope) {
                   return scope.model.type !== 'twitch';
               }
            },
            {
               "type": "input",
               "key":  "url",
               "templateOptions":
               {
                   "type":            "text",
                   "required":        true,
                   "label":           ctrl.LANG.getString('Twitter-Link'),
                   "placeholder":     ctrl.LANG.getString('Bitte gib den Link zu dem Tweet ein.')
               },
               hideExpression: function($viewValue, $modelValue, scope) {
                   return scope.model.type !== 'twitter';
               }
            },
            {
               "type": "input",
               "key":  "url",
               "templateOptions":
               {
                   "type":            "text",
                   "required":        true,
                   "label":           ctrl.LANG.getString('Link'),
                   "placeholder":     ctrl.LANG.getString('Bitte gib den Link zu deiner Nachricht ein.')
               },
               hideExpression: function($viewValue, $modelValue, scope) {
                  return scope.model.type !== 'link';
               }
            },
          ];

          // Submit a news entry
          ctrl.submit = function()
          {
              ctrl.DB.call('Streams','store', {}, ctrl.fieldData).then(
                function(result)
                {
                    $rootScope.$broadcast('$modalClose');
                    $rootScope.$broadcast('reloadNews');
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
                        'title':     ctrl.LANG.getString('Fehler beim Einreichen der News!'),
                        'message':   message,
                        'autoClose': true
                    });
                }
              );
          };

          // Init point
          ctrl.$onInit = function()
          {
                console.error(ctrl);
          };

     }
]);
