angular.module('user').controller('UserRegisterCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     '$compile',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller, $timeout,$compile,UserService) {

          var register = this;
          angular.extend(register, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          register.fieldData = {
              'gender': 'female'
          };

          register.gender    = [
             {
                id: 'female',
                name: register.LANG.getString('Weiblich')
             },
             {
                id: 'male',
                name: register.LANG.getString('Männlich')
             },
             {
                id: 'misc',
                name: register.LANG.getString('Divers')
             }
          ];

          register.fields    = [
             {
                 "type": "input",
                 "key":  "username",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           register.LANG.getString('Benutzername'),
                     "placeholder":     register.LANG.getString('Benutzername'),
                     "addonLeft": {
                       "class": ""
                     }
                 }
             },
             {
                 "type": "input",
                 "key":  "firstname",
                 "templateOptions":
                 {
                     "type":            "text",
                     "required":        true,
                     "label":           register.LANG.getString('Vorname'),
                     "placeholder":     register.LANG.getString('Vorname'),
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
                     "label":           register.LANG.getString('Nachname'),
                     "placeholder":     register.LANG.getString('Nachname'),
                     "addonLeft": {
                       "class": ""
                     }
                 }
             },
             {
                "type":         "select",
                "key":          "gender",
                "templateOptions":
                {
                    "type":            "select",
                    "required":        false,
                    "label":           register.LANG.getString('Geschlecht'),
                    "placeholder":     register.LANG.getString('Geschlecht'),
                    "options":         register.gender,
                    "valueProp":       'id',
                    "labelProp":       'name',
                    "className":       'col-xs-12'
                }
             },
             {
                "type": "input",
                "key":  "email",
                "templateOptions":
                {
                    "type":            "email",
                    "required":        true,
                    "label":           register.LANG.getString('E-Mail'),
                    "placeholder":     register.LANG.getString('E-Mail'),
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
                    "label":           register.LANG.getString('Passwort'),
                    "placeholder":     register.LANG.getString('Passwort'),
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
                    "required":        true,
                    "label":           register.LANG.getString('Passwort wiederholen'),
                    "placeholder":     register.LANG.getString('Passwort wiederholen'),
                    "addonLeft" :{
                      "class": "fas fa-key"
                    }
                }
             },
             {
                "type": "checkbox",
                "key":  "terms",
                "templateOptions":
                {
                    "required":        true,
                    "label":           register.LANG.getString('Hiermit akzeptiere ich die {{agb}} und die {{rules}}', {agb : register.LANG.getString('Allgemeine Geschäftsbedingungen'), rules: register.LANG.getString('Verhaltensregeln')})
                }
             },
             {
                "type": "checkbox",
                "key":  "gdpr",
                "templateOptions":
                {
                    "required":        true,
                    "label":           register.LANG.getString('Hiermit akzeptiere ich die {{gdpr}}', {gdpr : register.LANG.getString('Datenschutz-Erklärungen')})
                }
             },
             {
                "type": "checkbox",
                "key":  "newsletter",
                "templateOptions":
                {
                    "required":        false,
                    "label":           register.LANG.getString('Ich möchte den Newsletter abonieren')
                }
             }
          ];

          register.errors =  [];

          // Submit form

          register.submit = function()
          {

              register.loading = true;
              register.errors  = [];

              // Reset password

              register.DB.call('Auth','register',null,register.fieldData).then(
                  function(result)
                  {
                      register.loading     = false;
                      register.fieldsReset = false;
                      register.errors      = [];

                      // Success - close modal and redirect

                      $rootScope.$broadcast('$modalClose');
                      $state.go('login.login');

                  },
                  function(errorResult)
                  {

                      // errors at the api/db

                      register.loading = false;
                      register.errors  = [errorResult.data.message];
                      register.errors  = register.errors.concat(errorResult.data.errors !== undefined ? errorResult.data.errors : []);

                      if(register.errors.length === 0  || angular.isUndefined(register.errors[0]) === true)
                        {
                              register.errors[register.errors.length] = register.LANG.getString('Unbekannter Fehler aufgetreten.');
                        }
                  }
              );


          };
          // Init function

          register.init = function()
          {
                register.loading = false;
          };

          // Init

          register.init();

     }
]);
