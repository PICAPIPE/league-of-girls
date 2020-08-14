angular.module('user').controller('MessagesModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          // List of chats

          modal.chats   = [];
          modal.profile = false;

          // Get avatar path

          modal.getAvatarPath = function(message)
          {
              if(angular.isUndefined(message) === true)
                {
                return '';
                }
              return '/files/avatars/' + (message.user !== null && message.user !== undefined && message.user.uuid !== undefined ? message.user.uuid : '')
          };

          // Init function

          modal.init = function()
          {
            modal.DB.call('CurrentUser','chats',{read:'true'}).then(
                function(result)
                {
                    modal.chats = result.data.data;
                },
                function(errorResult)
                {
                    modal.chats = [];
                }
            );
          };

          modal.openProfileClass = function()
          {
              if(modal.profile === false)
                {
                return;
                }
              return 'clickable';
          };

          // Open profile

          modal.openProfile = function(event, user)
          {
              event.preventDefault();

              if(chat.profile === false || angular.isDefined(user) === false)
                {
                return;
                }

          };

          // Open the chat

          modal.read  = function(chat)
          {
              $rootScope.$broadcast('$modalClose');
              $rootScope.$broadcast('updateUser');
              $state.go('app.chat.detail',{id:chat.uuid});
          };

          modal.init();

     }
]);
