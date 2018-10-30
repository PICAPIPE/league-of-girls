angular.module('user').controller('UserPanelCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,$timeout,UserService) {

          var userpanel = this;
          angular.extend(userpanel, $controller('BaseCtrl', {$scope: $scope}));

          // Variables

          userpanel.user     = null;
          userpanel.username = null;
          userpanel.listener = null;

          // Init function

          userpanel.init = function()
          {

                // Get the user information
                userpanel.user = UserService.getCurrentUser();

                userpanel.listen();

                $timeout(function(){
                    $scope.$apply();
                });

                $rootScope.$broadcast('requestUserUpdate');

          };

          // Update the user data

          userpanel.update    = function()
          {
            userpanel.DB.call('CurrentUser','check',null,null).then(
              function(result){

                // Successful getting the user data
                UserService.setCurrentUser(result.data.data);
                userpanel.init();
                userpanel.listen();

              }
            );
          };

          userpanel.listen    = function()
          {

            if(userpanel.listener === null && userpanel.user !== null)
              {
                userpanel.listener = Echo.join('user-' + userpanel.user.uuid)
                  .listen('.UserUpdate', function(e) {
                     userpanel.update();
                  });
              }

          };

          userpanel.openLogin = function(e)
          {

                userpanel.createModal({
                    'background' : 'rgba(0,0,0,0.5)',
                    'content':     '<login-modal>...</login-modal>'
                },function(){

                });

          };

          userpanel.openRequests = function(e)
          {
              userpanel.createModal({
                  'background' : 'rgba(34,181,115,0.8)',
                  'content':     '<friends-requests-modal>...</friends-requests-modal>'
              },function(){

              });
          };

          userpanel.openMessages = function(e)
          {
              userpanel.createModal({
                  'background' : 'rgba(34,181,115,0.8)',
                  'content':     '<messages-modal>...</messages-modal>'
              },function(){

              });
          };

          // Init

          userpanel.listen();
          userpanel.init();

          // Watchers

          $rootScope.$on('userLogged',function(event,args){

              if(angular.isDefined(args) === true &&
                 args.success            === true)
                {
                      UserService.setCurrentUser(args.user);
                }
                
              userpanel.listen();

              // Update user object in this controller
              userpanel.user = args.user;

          });

          // Update the user data

          $rootScope.$on('updateUser',function(){

              userpanel.listen();
              userpanel.update();

          });

     }
]);
