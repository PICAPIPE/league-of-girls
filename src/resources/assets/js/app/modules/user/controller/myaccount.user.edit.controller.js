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

          myaccountEdit.user             = Object.assign({'gender':'female'},UserService.getCurrentUser());
          myaccountEdit.changeDetected   = false;
          myaccountEdit.imagePath        = '/files/avatars/' + myaccountEdit.user.uuid + '?time='+ date.getTime();
          myaccountEdit.games            = [];
          myaccountEdit.plattforms       = [];
          myaccountEdit.communications   = [];
          myaccountEdit.links            = [];
          myaccountEdit.categories       = [];

          myaccountEdit.gender    = [
            {
               id: 'female',
               name: myaccountEdit.LANG.getString('Weiblich')
            },
            {
               id: 'male',
               name: myaccountEdit.LANG.getString('Männlich')
            },
            {
               id: 'misc',
               name: myaccountEdit.LANG.getString('Divers')
            }
          ];

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

          myaccountEdit.fieldsGeneral    = [
            {
                "type":         "select",
                "key":          "gender",
                "defaultValue": "female",
                "templateOptions":
                {
                    "type":            "select",
                    "required":        false,
                    "label":           myaccountEdit.LANG.getString('Geschlecht'),
                    "placeholder":     myaccountEdit.LANG.getString('Geschlecht'),
                    "options":         myaccountEdit.gender,
                    "valueProp":       'id',
                    "labelProp":       'name',
                    "className":       'col-xs-12'
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

          myaccountEdit.skillOptions    = [
              {
                 skill: 'beginner',
                 label: myaccountEdit.LANG.getString('Anfänger')
              },
              {
                 skill: 'amateur',
                 label: myaccountEdit.LANG.getString('Amateur')
              },
              {
                 skill: 'advanced',
                 label: myaccountEdit.LANG.getString('Fortgeschritten')
              },
              {
                 skill: 'pro',
                 label: myaccountEdit.LANG.getString('Profi')
              }
          ];

          myaccountEdit.acceptTypes    = 'image/*,application/pdf';

          myaccountEdit.watchCheck     = function(newValue,attr)
          {

              var i = 0;

              if(angular.isUndefined(newValue[attr]) === true)
              {
                 return;
              }

              for(i = 0; i < newValue[attr].length; i++)
              {

                  if(angular.isUndefined(newValue[attr][i].value) === true)
                    {
                       continue;
                    }

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

                if (newValue.gender === '' || newValue.gender === undefined)
                     {
                     newValue = 'female';
                     }

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

                if(angular.isUndefined(newValue.games) === false)
                  {
                      myaccountEdit.watchCheck(newValue,'games');
                  }

                if(angular.isUndefined(newValue.categories) === false)
                  {
                      myaccountEdit.watchCheck(newValue,'categories');
                  }

          };

          // Helper method to watch specfiic elements of the user

          myaccountEdit.watchAttribute        = function(newValue,attr,pid)
          {
                var i = 0;
                var j = 0;

                myaccountEdit.changeDetected = true;

                if (angular.isUndefined(newValue)                 === true ||
                    angular.isUndefined(myaccountEdit.user[attr]) === true)
                     {
                     return;   
                     }

                for(i = 0; i < newValue.length; i++)
                {

                    for(j = 0; j < myaccountEdit.user[attr].length; j++)
                    {

                        if(myaccountEdit.user[attr][j][pid] === newValue[i].id)
                        {
                              if(attr === 'games')
                                   {
                                   myaccountEdit.user[attr][j].skill = newValue[i].skill;
                                   }
                              else {
                                   if (attr === 'links')
                                        {
                                        myaccountEdit.user[attr][j].allow_crawler = newValue[i].allow_crawler;
                                        }
                                   else {
                                        myaccountEdit.user[attr][j].public = newValue[i].public;
                                        }

                                   // Save attribute in original data set
                                   if (angular.isDefined(newValue[i].value) === true)
                                        {
                                        myaccountEdit.user[attr][j].value = newValue[i].value;
                                        }
                                   }
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

          // Watcher for games

          myaccountEdit.watchGames  = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'games','game_id');
          };

          // Watcher for games

          myaccountEdit.watchCategories  = function(newValue, oldValue, scope)
          {
              myaccountEdit.watchAttribute(newValue,'categories','category_id');
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

                        $timeout(function(){
                            location.reload();
                        },150);

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
              var k = 0;

              if (angular.isUndefined(myaccountEdit.user[attr]) === true)
                  {
                  return;
                  }

              for(j = 0; j < myaccountEdit.user[attr].length; j++)
              {
                  for(i = 0; i < myaccountEdit[attr].length; i++)
                  {
                      if(myaccountEdit[attr][i].id === myaccountEdit.user[attr][j][pid])
                      {

                          if(attr === 'games')
                               {

                                  myaccountEdit[attr][i].active = myaccountEdit.user[attr][j].active;

                                  for(k = 0; k < myaccountEdit.skillOptions.length; k++)
                                  {
                                      if(myaccountEdit.user[attr][j].skill ===  myaccountEdit.skillOptions[k].skill)
                                      {
                                          myaccountEdit[attr][i].skill = myaccountEdit.skillOptions[k];
                                      }
                                  }

                               }
                          else {                                  
                                  myaccountEdit[attr][i].value = myaccountEdit.user[attr][j].value;
                                  if (attr !== 'links')
                                       {
                                       myaccountEdit[attr][i].public = myaccountEdit.user[attr][j].public;
                                       }
                               }

                          if (attr === 'links')
                               {
                                  myaccountEdit[attr][i].allow_crawler = myaccountEdit.user[attr][j].allow_crawler;
                               }
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
                      console.error(myaccountEdit.user);
                      myaccountEdit.imagePath      = '/files/avatars/' + myaccountEdit.user.uuid+'?time='+ date.getTime();
                      $scope.$apply();
                  },200);

              },0);
          };

          // Init the account information

          myaccountEdit.init           = function()
          {

              if (myaccountEdit.user.uuid === undefined)
                    {
                    // Request data if user is undefined
                    myaccountEdit.DB.call('CurrentUser','check').then(
                        function(result)
                        {
                          myaccountEdit.user = result.data.data;
                        },
                        function(errorResult)
                        {
                          console.log(errorResult);
                        }
                    );
                    }

              myaccountEdit.DB.call('Games','all').then(
                function(result)
                {
                    myaccountEdit.games = result.data.data;

                    $timeout(function(){
                      $scope.$apply();
                    });

                    myaccountEdit.setUpValue('games','game_id');

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

              myaccountEdit.DB.call('Categories','all').then(
                function(result)
                {
                    myaccountEdit.categories = result.data.data;

                    $timeout(function(){
                      $scope.$apply();
                    });

                    myaccountEdit.setUpValue('categories','category_id');

                },
                function(errorResult)
                {
                  myaccountEdit.ALERT.add({
                      'title':     myaccountEdit.LANG.getString('Fehler beim Laden der Kategorien'),
                      'message':   myaccountEdit.LANG.getString('Es ist leider ein Fehler beim Laden der verfügbaren Kategorien aufgetreten.'),
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

          // Get the class for a category

          myaccountEdit.getCategoryClass        = function(categoryId)
          {
              return myaccountEdit.getHelperClass('categories','category_id',categoryId);
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
             
              if(angular.isDefined(myaccountEdit.user[attr]) === false)
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

          // Toogle category status

          myaccountEdit.toggleCategory      = function(categoryId,noSet)
          {
              myaccountEdit.toggleItemData('categories','category_id','addCategory','category',categoryId,noSet);
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

            if (angular.isUndefined(myaccountEdit.user[attr]) === true)
                  {
                  return;
                  }

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

                                  if(attr === 'games')
                                    {
                                      myaccountEdit.setUpValue('games','game_id');
                                    }

                                  if(attr === 'categories')
                                    {
                                      myaccountEdit.setUpValue('categories','category_id');
                                    }

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

          myaccountEdit.updateUser = function()
          {
              myaccountEdit.DB.call('CurrentUser','check',null,null).then(
                function(result){

                  // Successful getting the user data
                  UserService.setCurrentUser(result.data);

                }
              );

          };

          // Delete account

          myaccountEdit.deleteAccount = function(event,uuid)
          {

            var r = confirm(myaccountEdit.LANG.getString('Möchtest du dein Konto wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.'));

            if (r !== true)
                 {
                 myaccountEdit.ALERT.add({
                       'title':     myaccountEdit.LANG.getString('Vorgang abgebrochen!'),
                       'message':   myaccountEdit.LANG.getString('Die Kontolöschung wurde abgebrochen.'),
                       'autoClose': true
                 });
                 return;
                 }

            myaccountEdit.DB.call('CurrentUser','deleteAccount',uuid,{uuid:uuid}).then(
              function(result)
              {

                var i = 0;

                myaccountEdit.ALERT.add({
                    'title':     myaccountEdit.LANG.getString('Benutzer wurde gelöscht!'),
                    'message':   myaccountEdit.LANG.getString('Du wirst abgemeldet!'),
                    'autoClose': true
                });

                $state.go('login.logout');

              },
              function(errorResult)
              {
                myaccountEdit.ALERT.add({
                    'title':     myaccountEdit.LANG.getString('Fehler beim Exportieren!'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }

            );
          };

          // Export account data

          myaccountEdit.exportAccount = function(event,uuid)
          {
            myaccountEdit.DB.call('CurrentUser','export',uuid,{uuid:uuid}).then(
              function(result)
              {

                var i = 0;

                myaccountEdit.ALERT.add({
                    'title':     myaccountEdit.LANG.getString('Benutzerdaten werden exportiert'),
                    'message':   myaccountEdit.LANG.getString('Die erstellten Daten wurden erstellt und mit dem Herunterladen auch von unserem Server gelöscht.'),
                    'autoClose': true
                });

                // Öffne jeden Link

                for (i = 0; i < result.data.files.length; i++)
                      {
                      if (window.LARAVEL.debug === true)
                            {
                            console.log('Open Link:' + result.data.files[i]);
                            }
                      window.open(result.data.files[i], '_blank');
                      }

              },
              function(errorResult)
              {
                myaccountEdit.ALERT.add({
                    'title':     myaccountEdit.LANG.getString('Fehler beim Exportieren!'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }

            );
          };

          // Open Avatar chooser
          myaccountEdit.chooseAvatar = function(event)
          {
             event.preventDefault();

             myaccountEdit.createModal({
                 'background' : 'rgba(0, 0, 0,0.8)',
                 'content':     '<avatar-picker></avatar-picker>'
             },function(){
                 
             });
          };

          myaccountEdit.init();

          // Watchers

          $scope.$watch('myaccountEdit.user',           myaccountEdit.watch,               true);
          $scope.$watch('myaccountEdit.plattforms',     myaccountEdit.watchPlattforms,     true);
          $scope.$watch('myaccountEdit.communications', myaccountEdit.watchCommunications, true);
          $scope.$watch('myaccountEdit.links',          myaccountEdit.watchLinks,          true);
          $scope.$watch('myaccountEdit.games',          myaccountEdit.watchGames,          true);
          $scope.$watch('myaccountEdit.categories',     myaccountEdit.watchCategories,     true);

          // New avatar choosen
          $scope.$on('chooseAvatar',function(event,args){
              myaccountEdit.imagePath       = '';
              myaccountEdit.user.avatar_id  = args.avatar_id;
              myaccountEdit.user.color      = args.color;
              myaccountEdit.user.background = args.background;
              $timeout(function()
              {                
                myaccountEdit.imagePath      = '/files/avatars/' + myaccountEdit.user.uuid+'?time='+ date.getTime() + '&preview='+(args.avatar_id * -1) + '&color=' + (args.color !== undefined ? args.color.replace('#','') : '') + '&background=' + (args.background !== undefined ? args.background.replace('#','') : '');
                $scope.$apply();
              },200);
          });          

     }
]);
