angular.module('user').controller('FriendsRequestsModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          // List of requests

          modal.requests = [];
          modal.headline = '';

          modal.skillOptions    = [
              {
                 skill: 'beginner',
                 label: modal.LANG.getString('*in')
              },
              {
                 skill: 'amateur',
                 label: modal.LANG.getString('Amateur*in')
              },
              {
                 skill: 'advanced',
                 label: modal.LANG.getString('Fortgeschritten')
              },
              {
                 skill: 'pro',
                 label: modal.LANG.getString('Profi')
              }
          ];

          // Init function

          modal.init = function()
          {
              modal.DB.call('CurrentUser','friendRequests').then(
                  function(result)
                  {

                      modal.requests = result.data.data;
                      modal.headline = modal.LANG.getPlural(modal.requests.length, '{{count}} offene Anfrage', '{{count}} offene Anfragen', {count:modal.requests.length});

                      $timeout(function(){
                        $scope.$apply();
                      });

                  },
                  function(errorResult)
                  {
                      modal.requests = [];
                  }
              );
          };

          // Get headline for a single request

          modal.getItemHeadline = function(request)
          {
              return modal.LANG.getString('Neue Freundschaftsanfrage von {{username}}',{username:request.from.username});
          };

          // Accept request

          modal.acceptRequest = function(event,request)
          {
              event.preventDefault();
              modal.setRequestStatus(request.uuid,true);
          };

          // Decline the request

          modal.declineRequest = function(event,request)
          {
              event.preventDefault();
              modal.setRequestStatus(request.uuid,false);
          };

          // Update the request status

          modal.setRequestStatus = function(uuid,status)
          {

            var obj = {};

            if(status === true)
              {
                  obj.accepted = true;
                  obj.declined = false;
                  obj.read     = true;
              }
            else
              {
                  obj.accepted = false;
                  obj.declined = true;
                  obj.read     = true;
              }

            modal.DB.call('FriendRequests','update',uuid,obj).then(
                function(result)
                {
                    modal.init();
                    $rootScope.$broadcast('requestUserUpdate');
                },
                function(errorResult)
                {
                    modal.ALERT.add({
                        'title':     modal.LANG.getString('Fehler beim Bearbeiten der Freundschaftsanfrage'),
                        'message':   modal.LANG.getString('Es ist ein Fehler beim Bearbeiten der Freundschaftsanfrage aufgetreten. Bitte probiere es erneut oder kontaktiere den Support.'),
                        'autoClose': true
                    });
                }
            );
          };

          // Get the game class

          modal.getClass = function(element)
          {

              if(angular.isDefined(element.icon) === true)
                {
                   return element.icon;
                }

              return element.gameIcon;
          };

          // Get the lang label for the skill

          modal.getGameSkill = function(game)
          {
              var i = 0;

              for(i = 0; i < modal.skillOptions.length; i++)
              {
                  if(game.skill === modal.skillOptions[i].skill)
                  {
                      return modal.skillOptions[i].label;
                  }
              }

              return '';

          };

          modal.init();

     }
]);
