angular.module('user').controller('UserPanelCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,UserService) {

          var userpanel = this;
          angular.extend(userpanel, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          userpanel.user     = null;
          userpanel.username = null;

          // Init function

          userpanel.init = function()
          {

                // Get the user information
                userpanel.user = UserService.getCurrentUser();

          };

          userpanel.openLogin = function(e)
          {

                userpanel.createModal({
                    'background' : 'rgba(0,0,0,0.5)',
                    'content':     '<login-modal>...</login-modal>'
                },function(){

                });

          };

          // Init

          userpanel.init();

          // Watchers

          $scope.$on('userLogged',function(event,args){

              if(angular.isDefined(args) === true &&
                 args.success            === true)
                {
                      UserService.setCurrentUser(args.user);
                }

              userpanel.init();  

          });

     }
]);
