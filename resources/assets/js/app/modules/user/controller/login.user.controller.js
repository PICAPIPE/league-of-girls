angular.module('user').controller('UserLoginCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     'UserService',
     'store',
     function($scope, $rootScope, $state, $window, $controller, $timeout,UserService,store) {

          var login = this;
          angular.extend(login, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          login.isReset   = false;

          login.fieldData = {};

          login.fields    = [
             {
                "type": "input",
                "key":  "email",
                "templateOptions":
                {
                    "type":            "email",
                    "required":        true,
                    "label":           login.LANG.getString('E-Mail'),
                    "placeholder":     login.LANG.getString('E-Mail'),
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
                    "required":        true,
                    "label":           login.LANG.getString('Passwort'),
                    "placeholder":     login.LANG.getString('Passwort'),
                    "addonLeft" :{
                      "class": "fas fa-key"
                    }
                },
                "hideExpression": 'login.isReset'
             }
          ];

          login.fieldsReset    = [
             login.fields[0]
          ];

          login.errors =  [];

          // Submit form

          login.submit = function()
          {

              login.loading = true;
              login.errors  = [];

              if   (login.isReset === false)
                   {

                      // Standard login

                      login.DB.call('Auth','login',null,login.fieldData).then(
                          function(result)
                          {

                              // Login was successful

                              login.loading = false;

                              store.set('token',result.data.token);

                              login.DB.call('CurrentUser','check',null,null).then(
                                function(result){

                                  // Successful getting the user data

                                  UserService.setCurrentUser(result.data);

                                  // Close modal and then redirect to dashboard

                                  $rootScope.$broadcast('$modalClose');
                                  location.reload();

                                  $timeout(function()
                                  {
                                      $rootScope.$broadcast('userLogged',{success:true,user:result.data.data});
                                  });

                                },
                                function(errorResultGetUserData)
                                {

                                    // Error while getting the current user logged user data

                                    login.loading = false;
                                    login.errors  = [errorResultGetUserData.data !== undefined && errorResultGetUserData.data.message !== undefined ? errorResultGetUserData.data.errors : []];

                                    if(login.errors.length === 0 || angular.isUndefined(login.errors[0]) === true)
                                      {
                                            login.errors[login.errors.length] = login.LANG.getString('Unbekannter Fehler aufgetreten.');
                                      }

                                    $rootScope.$broadcast('userLogged',{success:false});

                                }
                              );

                          },
                          function(errorResult)
                          {
                              login.loading = false;
                              login.errors  = [errorResult.data.message];

                              if(login.errors.length === 0 || angular.isUndefined(login.errors[0]) === true)
                                {
                                      login.errors[login.errors.length] = login.LANG.getString('Unbekannter Fehler aufgetreten.');
                                }

                          }
                      );

                   }
              else {

                      // Reset password

                      login.DB.call('Auth','reset',null,login.fieldData).then(
                          function(result)
                          {
                              login.loading     = false;
                              login.fieldsReset = false;

                              // Success

                              $state.go('app.start');

                              login.closeModal();

                              login.ALERT.add({
                                  'title':     login.LANG.getString(''),
                                  'message':   login.LANG.getString('An die anggebene E-Mailadresse wurde ein Link zum Zurücksetzen des Kontos geschickt.'),
                                  'autoClose': true
                              });

                          },
                          function(errorResult)
                          {
                              login.loading = false;
                              login.errors  = [errorResult.data.message];
                          }
                      );
                   }


          };

          // Reset the users password

          login.resetPassword = function(e)
          {
              e.preventDefault();
              login.isReset = !login.isReset;
          };

          // Init function

          login.init = function()
          {

                login.isReset = false;
                login.loading = false;

          };

          // Init

          login.init();

     }
]);
