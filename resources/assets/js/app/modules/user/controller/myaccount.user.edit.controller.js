angular.module('user').controller('UserMyAccountEditCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$timeout',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $timeout, $controller,UserService) {

          var myaccountEdit = this;
          var date          = new Date();
          angular.extend(myaccountEdit, $controller('BaseCtrl', {$scope: $scope}));

          myaccountEdit.user             = Object.assign({},UserService.getCurrentUser());
          myaccountEdit.changeDetected   = false;
          myaccountEdit.imagePath        = '/files/avatars/' + myaccountEdit.user.uuid + '?time='+ date.getTime();
          myaccountEdit.games            = [];
          myaccountEdit.plattforms       = [];
          myaccountEdit.communications   = [];
          myaccountEdit.links            = [];

          myaccountEdit.fields           = [
            {
                "type": "input",
                "key":  "firstname",
                "templateOptions":
                {
                    "type":            "text",
                    "required":        true,
                    "label":           myaccountEdit.LANG.getString('Vorname'),
                    "placeholder":     myaccountEdit.LANG.getString('Vorname'),
                    "addonLeft": {
                      "class": ""
                    }
                }
            },
            {
                "type": "input",
                "key":  "lastname",
                "templateOptions":
                {
                    "type":            "text",
                    "required":        true,
                    "label":           myaccountEdit.LANG.getString('Nachname'),
                    "placeholder":     myaccountEdit.LANG.getString('Nachname'),
                    "addonLeft": {
                      "class": ""
                    }
                }
            },
            {
               "type": "input",
               "key":  "email",
               "templateOptions":
               {
                   "type":            "email",
                   "required":        true,
                   "label":           myaccountEdit.LANG.getString('E-Mail'),
                   "placeholder":     myaccountEdit.LANG.getString('E-Mail'),
                   "addonLeft": {
                     "class": "far fa-user"
                   }
               }
            },
            {
               "type": "input",
               "key":  "password",
               "templateOptions":
               {
                   "type":            "password",
                   "required":        false,
                   "label":           myaccountEdit.LANG.getString('Passwort'),
                   "placeholder":     myaccountEdit.LANG.getString('Passwort'),
                   "addonLeft" :{
                     "class": "fas fa-key"
                   }
               }
            },
            {
               "type": "input",
               "key":  "password2",
               "templateOptions":
               {
                   "type":            "password",
                   "required":        false,
                   "label":           myaccountEdit.LANG.getString('Passwort wiederholen'),
                   "placeholder":     myaccountEdit.LANG.getString('Passwort wiederholen'),
                   "addonLeft" :{
                     "class": "fas fa-key"
                   }
               }
            }
          ];

          myaccountEdit.fieldsNewsletter = [
              {
                 "type": "checkbox",
                 "key":  "newsletter",
                 "templateOptions":
                 {
                     "required":        false,
                     "label":           myaccountEdit.LANG.getString('Newsletter abonieren')
                 }
              }
          ];

          myaccountEdit.acceptTypes    = 'image/*,application/pdf';

          myaccountEdit.watchCheck     = function(newValue,attr)
          {

              var i = 0;

              for(i = 0; i < newValue[attr].length; i++)
              {
                  if(newValue[attr][i].value.length > 0)
                        {
                            newValue[attr][i].active = true;
                        }
                  else  {
                           newValue[attr][i].active = false;
                        }
              }
          };

          // Watch the user attributes

          myaccountEdit.watch = function(newValue, oldValue, scope)
          {
                var i = 0;

                if(angular.isDefined(newValue)  === true &&
                   newValue                     !== null &&
                   angular.isDefined(oldValue)  === true &&
                   oldValue                     !== null &&
                   myaccountEdit.changeDetected !== true)
                  {
                    myaccountEdit.changeDetected = !angular.equals(myaccountEdit.user, UserService.getCurrentUser());
                  }

                if(angular.isUndefined(newValue.plattforms) === false)
                  {
                       myaccountEdit.watchCheck(newValue,'plattforms');
                  }

                if(angular.isUndefined(newValue.communications) === false)
                  {
                      myaccountEdit.watchCheck(newValue,'communications');
                  }

                if(angular.isUndefined(newValue.links) === false)
                  {
                      myaccountEdit.watchCheck(newValue,'links');
                  }

          };

          // Helper method to watch specfiic elements of the user

          myaccountEdit.watchAttribute        = function(newValue,attr,pid)
          {
                var i = 0;
                var j = 0;

                myaccountEdit.changeDetected = true;

                for(i = 0; i < newValue.length; i++)
                {

                    for(j = 0; j < myaccountEdit.user[attr].length; j++)
                    {

                        if(myaccountEdit.user[attr][j][pid] === newValue[i].id)
                        {
                              myaccountEdit.user[attr][j].value = newValue[i].value;
                              break;
                        }

                    }

                }
          };

          // Watcher for plattforms

          myaccountEdit.watchPlattforms       = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'plattforms','plattform_id');
          };

          // Watcher for communications

          myaccountEdit.watchCommunications   = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'communications','communication_id');
          };

          // Watcher for links

          myaccountEdit.watchLinks   = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'links','link_id');
          };

          // Save profile information

          myaccountEdit.save = function(event,data)
          {
              event.preventDefault();

              myaccountEdit.DB.call('CurrentUser','save',null,data).then(
                  function(result)
                  {

                        UserService.setCurrentUser(result.data.data);
                        $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});

                        myaccountEdit.ALERT.add({
                            'title':     myaccountEdit.LANG.getString('Profil aktualisiert'),
                            'message':   myaccountEdit.LANG.getString('Dein Profil wurde erfolgreich aktualisiert.'),
                            'autoClose': true
                        });

                        $state.go('app.user.myaccount');

                  },
                  function(errorResult)
                  {
                      myaccountEdit.ALERT.add({
                          'title':     myaccountEdit.LANG.getString('Fehler beim Speichern'),
                          'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                          'autoClose': true
                      });
                  }
              );

          };

          // Setup the value field

          myaccountEdit.setUpValue    = function(attr,pid)
          {
              var i = 0;
              var j = 0;

              for(j = 0; j < myaccountEdit.user[attr].length; j++)
              {
                  for(i = 0; i < myaccountEdit[attr].length; i++)
                  {
                      if(myaccountEdit[attr][i].id === myaccountEdit.user[attr][j][pid])
                      {
                          myaccountEdit[attr][i].value = myaccountEdit.user[attr][j].value;
                          break;
                      }
                  }
              }
          };

          // Response if avatar got updated

          myaccountEdit.avatarUpdated = function(response)
          {

              myaccountEdit.imagePath      = '';

              myaccountEdit.ALERT.add({
                  'title':     myaccountEdit.LANG.getString('Avatar aktualisiert'),
                  'message':   myaccountEdit.LANG.getString('Du hast dein Profilbild erfolgreich aktualisiert.'),
                  'autoClose': true
              });

              date          = new Date();

              $timeout(function()
              {
                  myaccountEdit.imagePath      = '';
                  $scope.$apply();

                  $timeout(function()
                  {
                      myaccountEdit.imagePath      = '/files/avatars/' + myaccountEdit.user.uuid+'?time='+ date.getTime();
                      $scope.$apply();
                  },200);

              },0);
          };

          // Init the account information

          myaccountEdit.init           = function()
          {

              myaccountEdit.DB.call('Games','all').then(
                function(result)
                {
                    myaccountEdit.games = result.data.data;

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Spiele'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Spiele aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

              myaccountEdit.DB.call('Plattforms','all').then(
                function(result)
                {

                    myaccountEdit.plattforms = result.data.data;

                    myaccountEdit.setUpValue('plattforms','plattform_id');

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Plattformen'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Plattformen aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

              myaccountEdit.DB.call('Communications','all').then(
                function(result)
                {

                    myaccountEdit.communications = result.data.data;

                    myaccountEdit.setUpValue('communications','communication_id');

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Kommunikationsmethoden'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kommunikationsmethoden aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

              myaccountEdit.DB.call('Links','all').then(
                function(result)
                {

                    myaccountEdit.links = result.data.data;

                    myaccountEdit.setUpValue('links','link_id');

                    $timeout(function(){
                      $scope.$apply();
                    });

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Linktypen'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Linktypen aufgetreten.'),
                      'autoClose': true
                  });
                }
              );

          };

          // Get the class for a game

          myaccountEdit.getClass        = function(gameId)
          {
              return myaccountEdit.getHelperClass('games','game_id',gameId);
          };

          // Get the class for a plattform

          myaccountEdit.getPlattformClass        = function(plattformId)
          {
              return myaccountEdit.getHelperClass('plattforms','plattform_id',plattformId);
          };

          // Get the class for a plattform

          myaccountEdit.getCommuniationClass        = function(communicationId)
          {
              return myaccountEdit.getHelperClass('communications','communication_id',communicationId);
          };

          // Get the class for a link

          myaccountEdit.getLinkClass        = function(linkId)
          {
              return myaccountEdit.getHelperClass('links','link_id',linkId);
          };

          // Helper method for css

          myaccountEdit.getHelperClass        = function(attr,pid,value)
          {
              var i = 0;

              if(angular.isDefined(myaccountEdit.user) === false)
                {
                   return '';
                }

              for(i = 0; i < myaccountEdit.user[attr].length; i++)
              {
                  if(value === myaccountEdit.user[attr][i][pid] && myaccountEdit.user[attr][i].active === true)
                    {
                       return 'active';
                    }
              }

              return '';

          };

          // Toogle game status

          myaccountEdit.toggleGame      = function(gameId,noSet)
          {
              myaccountEdit.toggleItemData('games','game_id','addGame','game',gameId,noSet);
          };

          // Toogle plattform status

          myaccountEdit.togglePlattform      = function(plattformId,noSet)
          {
              myaccountEdit.toggleItemData('plattforms','plattform_id','addPlattform','plattform',plattformId,noSet);
          };

          // Toogle communication status

          myaccountEdit.toggleCommunication      = function(communicationId,noSet)
          {
              myaccountEdit.toggleItemData('communications','communication_id','addCommunication','communication',communicationId,noSet);
          };

          // Toogle link status

          myaccountEdit.toggleLink      = function(linkId,noSet)
          {
              myaccountEdit.toggleItemData('links','link_id','addLink','link',linkId,noSet);
          };

          // Helper method to toggle item data

          myaccountEdit.toggleItemData = function(attr,pid,method,id,value,noSet)
          {
            var i         = 0;
            var iF        = -1;
            var f         = false;
            var found2Add = false;

            var obj       = Object.assign({},{});

            obj[id] = value;

            if(angular.isUndefined(noSet) === true)
            {
               noSet = false;
            }

            myaccountEdit.changeDetected = true;

            for(i = 0; i < myaccountEdit.user[attr].length; i++)
            {

                if(value === myaccountEdit.user[attr][i][pid])
                  {
                     if(noSet === false)
                     {
                     myaccountEdit.user[attr][i].active = !myaccountEdit.user[attr][i].active;
                     }
                     f                                  = true;
                     iF                                 = i;
                     break;
                  }
            }

            if(f === false)
              {

                  myaccountEdit.DB.call('CurrentUser',method ,null,obj).then(
                      function(result)
                      {

                            for(i = 0; i < myaccountEdit.user[attr].length; i++)
                            {
                                if(myaccountEdit.user[attr][i] === result.data.data[pid])
                                  {
                                     found2Add = true;
                                     break;
                                  }
                            }

                            if(found2Add === false)
                              {
                                  myaccountEdit.user[attr][myaccountEdit.user[attr].length] = result.data.data;
                              }

                            $timeout(function()
                            {
                                $scope.$apply();
                            });

                      },
                      function(errorResult)
                      {
                          myaccountEdit.ALERT.add({
                              'title':     myaccountEdit.LANG.getString('Fehler beim Hinzufügen des Eintrages'),
                              'message':   errorResult.data.errors !== undefined ? errorResult.data.errors.join('<br/>') : myaccountEdit.LANG.getString('Bitte probiere es erneut. Sollte es weiterhin nicht funktionieren, kontaktiere bitte den Support.'),
                              'autoClose': true
                          });
                      }
                  );

              }
          };

          myaccountEdit.init();

          // Watchers

          $scope.$watch('myaccountEdit.user',           myaccountEdit.watch,               true);
          $scope.$watch('myaccountEdit.plattforms',     myaccountEdit.watchPlattforms,     true);
          $scope.$watch('myaccountEdit.communications', myaccountEdit.watchCommunications, true);
          $scope.$watch('myaccountEdit.links',          myaccountEdit.watchLinks,          true);

     }
]);
