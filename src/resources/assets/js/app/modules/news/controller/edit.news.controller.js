angular.module('news').controller('NewsEditCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller, store,$timeout) {

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
              ctrl.DB.call('Streams','update', ctrl.uuid, ctrl.fieldData).then(
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
                        'title':     ctrl.LANG.getString('Fehler beim Abspeichern der News!'),
                        'message':   message,
                        'autoClose': true
                    });
                }
              );
          };

          // Init point
          ctrl.$onInit = function()
          {
                ctrl.fields       = [];
                ctrl.optionsGames = [];

                ctrl.DB.call('Games','all').then(
                  function(result){

                      ctrl.optionsGames = [];

                      var resultGames = result.data.data;
                      var games       = [];

                      games[games.length] = {'name':'Allgemein','id':-1};

                      for (var i = 0; i < resultGames.length; i++)
                             {
                             games[games.length] = {name:resultGames[i].name,id:resultGames[i].id};
                             }

                      ctrl.fields = [
                        {
                           "type":         "select",
                           "key":          "game_id",
                           "defaultValue": -1,
                           "templateOptions":
                           {
                               "type":            "select",
                               "required":        true,
                               "label":           ctrl.LANG.getString('Spiel'),
                               "options":         games,
                               "valueProp":       'id',
                               "labelProp":       'name',
                               "className":       'col-xs-12'
                           }
                        },
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
                               "placeholder":     ctrl.LANG.getString('Bitte gib hier eine Kurzbeschreibung des Beitrags ein.')
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
                               "placeholder":     ctrl.LANG.getString('Bitte gib hier den Link zu des Beitrag ein.')
                           },
                           hideExpression: function($viewValue, $modelValue, scope) {
                              return scope.model.type !== 'link';
                           }
                        },
                      ];

                      // Load news entry
                      ctrl.DB.call('Streams','show', ctrl.uuid).then(
                        function(result){
                           ctrl.fieldData = result.data.data;
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
                              'title':     ctrl.LANG.getString('Fehler beim Öffnen der News!'),
                              'message':   message,
                              'autoClose': true
                          });

                          $rootScope.$broadcast('$modalClose');

                        }
                      );

                  }
                );


          };

     }
]);
