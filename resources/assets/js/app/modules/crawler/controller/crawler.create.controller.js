angular.module('crawler').controller('CrawlerCreateCtrl',[
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
              ctrl.DB.call('Crawler',method, params, ctrl.fieldData).then(
                function(result)
                {
                    var fn = null;

                    if (angular.isDefined(ctrl.onSave) === true &&
                        angular.isFunction(ctrl.onSave) === true)
                           {
                           fn = ctrl.onSave;
                           fn(result);
                           $rootScope.$broadcast('crawler-save', {uuid:ctrl.uuid,data:result.data.data});
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
                        'title':     ctrl.LANG.getString('Fehler beim Speichern des Crawler aufgeteten.'),
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
                       "type":         "select",
                       "key":          "game",
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
                              {label: ctrl.LANG.getString('Twitch Channel'),    id: 'twitch',            group: ctrl.LANG.getString('Standard')},
                              {label: ctrl.LANG.getString('Youtube Channel'),   id: 'youtube',           group: ctrl.LANG.getString('Standard')},
                              {label: ctrl.LANG.getString('RSS-Feed'),          id: 'rss',               group: ctrl.LANG.getString('Standard')},
                              {label: ctrl.LANG.getString('Twitter-Konto'),     id: 'twitter',           group: ctrl.LANG.getString('Standard')},
                              {label: ctrl.LANG.getString('Twitter-Hashtag'),   id: 'twitter_hashtag',   group: ctrl.LANG.getString('Standard')},
                            ],
                            "groupProp": 'group',
                            "valueProp": 'id',
                            "labelProp": 'label',
                            "className": 'col-xs-12'
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
                           "placeholder":     ctrl.LANG.getString('Geben Sie eine URL zum RSS-Feed ein.')
                       },
                       hideExpression: function($viewValue, $modelValue, scope) {
                           return scope.model.type !== 'rss';
                       }
                    },
                    {
                       "type": "input",
                       "key":  "channel",
                       "templateOptions":
                       {
                           "type":            "text",
                           "required":        true,
                           "label":           ctrl.LANG.getString('Twitter-User'),
                           "placeholder":     ctrl.LANG.getString('Geben Sie den Usernamen ein dessen Tweets importiert werden soll')
                       },
                       hideExpression: function($viewValue, $modelValue, scope) {
                           return scope.model.type !== 'twitter';
                       }
                    },
                    {
                       "type": "input",
                       "key":  "tag",
                       "templateOptions":
                       {
                           "type":            "text",
                           "required":        true,
                           "label":           ctrl.LANG.getString('Twitter-Hashtag'),
                           "placeholder":     ctrl.LANG.getString('Geben Sie den Hashtag ein nach dem gesucht werden soll')
                       },
                       hideExpression: function($viewValue, $modelValue, scope) {
                           return scope.model.type !== 'twitter_hashtag';
                       }
                    },
                    {
                       "type": "input",
                       "key":  "channel",
                       "templateOptions":
                       {
                           "type":            "text",
                           "required":        true,
                           "label":           ctrl.LANG.getString('Kanal'),
                           "placeholder":     ctrl.LANG.getString('Geben Sie einen Kanal ein.')
                       },
                       hideExpression: function($viewValue, $modelValue, scope) {
                           return scope.model.type !== 'twitch'  && scope.model.type !== 'youtube';
                       }
                    },
                    {
                       "type":         "select",
                       "key":          "interval",
                       "defaultValue": 15,
                       "templateOptions":
                       {
                           "type":            "select",
                           "required":        true,
                           "label":           ctrl.LANG.getString('Import-Interval'),
                           "options": [
                              {label: 15 + ' ' + ctrl.LANG.getString('Minuten'),    id: 15},
                              {label: 30 + ' ' + ctrl.LANG.getString('Minuten'),    id: 30},
                              {label: 60 + ' ' + ctrl.LANG.getString('Minuten'),    id: 60},
                            ],
                            "valueProp": 'id',
                            "labelProp": 'label',
                            "className": 'col-xs-12'
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
