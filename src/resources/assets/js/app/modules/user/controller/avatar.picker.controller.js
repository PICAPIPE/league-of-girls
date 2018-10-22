angular.module('user').controller('AvatarPickerCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     'UserService',
     function($scope, $rootScope, $state, $window, $controller,$timeout,UserService) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.user = Object.assign({},UserService.getCurrentUser());

          ctrl.avatars    = [];
          ctrl.color      = ctrl.user.color;
          ctrl.background = ctrl.user.background;

          ctrl.$onInit = function()
          {
              var i = 0;

              for (i = 0; i < 17; i++)
                    {
                    ctrl.avatars[ctrl.avatars.length] = {icon:(i+1)};
                    }

          };
          
          // Get the class for a choosen avatar
          ctrl.getClass = function(avatar)
          {
              if (avatar.icon * -1 === ctrl.user.avatar_id)
                    {
                    return 'active';
                    }
          };

          // Select the new avatar 
          ctrl.chooseAvatar = function(event, avatar)
          { 
              ctrl.user.avatar_id = (avatar.icon * -1);
          };

          // Close the modal
          ctrl.choose = function(event)
          { 
              $rootScope.$broadcast('chooseAvatar',{avatar_id:ctrl.user.avatar_id,color:ctrl.color, background:ctrl.background});
              $rootScope.$broadcast('$modalClose');
          };

     }
]);
