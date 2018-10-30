angular.module('chat').controller('ChatCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,store,$timeout) {

          var chat = this;
          angular.extend(chat, $controller('BaseCtrl', {$scope: $scope}));

          chat.window         = $window;

          chat.channel        = null;
          chat.game           = store.get('log_choosen_game');
          chat.current        = null;
          chat.user           = chat.USER.getCurrentUser();

          chat.transferData   = {};

          chat.fieldData      = {};

          chat.messages       = [];
          chat.messagesIds    = [];
          chat.messagesAdded  = 0;

          chat.users          = [];
          chat.usersIds       = [];

          chat.profile        = (chat.profile === 'true' ? true : false);

          chat.chatType       = '';

          chat.hideTypes      = ['streams'];

          chat.writePlaceholder = chat.LANG.getString('Nachricht eingeben');

          // Get the class for the messages container

          chat.getClassForMessages = function()
          {
              if (chat.hideTypes.indexOf(chat.mode) > -1)
                   {
                   return 'col-xs-12 col-lg-12';
                   }
              return 'col-xs-12 col-lg-8';
          };

          // return if a area should be hide by area

          chat.checkHideByType = function()
          {
                var hide = true;

                switch(chat.chatType)
                {
                case 'users':
                  hide = true;
                  break;
                default:
                  hide = false;
                  break;
                }

                return hide;
          };

          // Check message

          chat.check     = function(event)
          {

              chat.user = chat.USER.getCurrentUser();

              if (chat.user === null)
                   {
                   return;
                   }

              if (event.keyCode !== 13 || event.shiftKey === true)
                   {
                   return;
                   }

              event.preventDefault();

              chat.send(event);

          };

          // Get avatar path

          chat.getAvatarPath = function(message)
          {
              return '/files/avatars/' + (message.user !== null && message.user !== undefined && message.user.uuid !== undefined ? message.user.uuid : '')
          };

          // Send message

          chat.send      = function(event)
          {
              if (chat.fieldData.message === '')
                   {
                   return;
                   }
              chat.DB.call('Chats','store',{},{chat:chat.current,message:chat.fieldData.message}).then(
                function(result)
                {
                    chat.fieldData.message = '';

                    chat.init(true);

                },
                function(errorResult)
                {

                    var message = chat.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                    if(angular.isDefined(errorResult.data)         === true &&
                       angular.isDefined(errorResult.data.message) === true)
                      {
                      message = errorResult.data.message;
                      }

                    chat.ALERT.add({
                        'title':     chat.LANG.getString('Fehler beim Schicken der Nachricht!'),
                        'message':   message,
                        'autoClose': true
                    });
                }
              );
          };

          // Submit button for messages
          chat.submitMessage = function(event)
          {
              event.preventDefault();
              chat.send(event);
          };

          // Mis the the messages
          chat.mix      = function(messages)
          {
              var i = 0;

              if(angular.isUndefined(messages) === true)
                {
                return;
                }

              chat.messagesIds.sort(function(a,b){
                  return b - a;
              });

              messages.sort(function(a,b){
                  return b - a;
              });

              for(i = 0; i < messages.length; i++)
                 {
                 if(chat.hasMessage(messages[i].id) === -1)
                   {
                   chat.messages.unshift(messages[i]);
                   chat.messagesIds.unshift(messages[i].id);
                   chat.messagesAdded++;
                   }
                 }

          };

          // Binary search for uuid search

          chat.hasMessage = function(id)
          {
              var Mini = 1;
              var Maxi = chat.messagesIds.length - 1;
              var i;

              var messages = [].concat(chat.messagesIds);
              return messages.indexOf(id);

          };

          // Clear the messages

          chat.clear     = function()
          {
              chat.messages       = [];
              chat.messagesIds    = [];
          };

          chat.openProfileClass = function()
          {
              if(chat.profile === false)
                {
                return;
                }
              return 'clickable';
          };

          // Open profile

          chat.openProfile = function(event, user)
          {
              event.preventDefault();

              if(chat.profile === false || angular.isDefined(user) === false)
                {
                return;
                }

              chat.createModal({
                  'background' : 'rgba(0,0,0,0.5)',
                  'content':     '<account user-id="' + user.uuid + '" editable="false"></account>'
              },function(){

              });

          };

          // Report message

          chat.reportMessage = function(event,uuid)
          {
            chat.DB.call('Messages','report',uuid,{uuid:uuid}).then(
              function(result)
              {
                var id    = result.data.data.id;
                var index = -1;

                index = chat.messagesIds.indexOf(id);

                chat.ALERT.add({
                    'title':     chat.LANG.getString('Nachricht wurde an den Seitenbetreiber gemeldet!'),
                    'message':   chat.LANG.getString('Die Nachricht wurde erfolgreich an den Seitenbetreiber gemeldet.'),
                    'autoClose': true
                });

                $timeout(function(){
                  $scope.$apply();
                });

              },
              function(errorResult)
              {
                chat.ALERT.add({
                    'title':     chat.LANG.getString('Fehler beim Melden!'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }
            );
          };

          // Delete a chat message

          chat.deleteMessage = function(event,uuid)
          {
            chat.DB.call('Messages','destroy',uuid).then(
              function(result)
              {
                var id    = result.data.data.id;
                var index = -1;

                index = chat.messagesIds.indexOf(id);

                chat.ALERT.add({
                    'title':     chat.LANG.getString('Nachricht gelöscht'),
                    'message':   chat.LANG.getString('Die Nachricht wurde erfolgreich gelöscht.'),
                    'autoClose': true
                });

                // Remove element
                chat.messagesIds.splice(index,1);
                chat.messages.splice   (index,1);

                $timeout(function(){
                  $scope.$apply();
                });

              },
              function(errorResult)
              {
                chat.ALERT.add({
                    'title':     chat.LANG.getString('Fehler beim Löschen der Nachricht'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }
            );
          };

          // Delete all messages for the current user

          chat.deleteMessages = function(event,uuid)
          {
            chat.DB.call('Chats','deleteMessages',uuid,{uuid:uuid}).then(
              function(result)
              {

                chat.ALERT.add({
                    'title':     chat.LANG.getString('Nachrichten wurden erfolgreich gelöscht'),
                    'message':   chat.LANG.getString('Deine Nachrichten wurden rückstandslos gelöscht.'),
                    'autoClose': true
                });

                $timeout(function(){
                  $scope.$apply();
                });

                // Reload all messages

                chat.clear();
                chat.init();

              },
              function(errorResult)
              {
                chat.ALERT.add({
                    'title':     chat.LANG.getString('Fehler beim Löschen!'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }
            );
          };

          chat.exportMessages = function(event,uuid)
          {
            chat.DB.call('Chats','exportMessages',uuid,{uuid:uuid}).then(
              function(result)
              {

                chat.ALERT.add({
                    'title':     chat.LANG.getString('Chat wurde exportiert'),
                    'message':   chat.LANG.getString('Chatverlauf wird heruntergeladen! Bitte beachte, dass die Datei nach dem Download sofort von unserem Server gelöscht wird.'),
                    'autoClose': true
                });

                window.open(result.data.file, 'self');

              },
              function(errorResult)
              {
                chat.ALERT.add({
                    'title':     chat.LANG.getString('Fehler beim Exportieren!'),
                    'message':   errorResult.data.message,
                    'autoClose': true
                });
              }
            );
          };

          // Init method

          chat.init      = function(scrollToNewest,id)
          {

              var params = {};

              if(angular.isUndefined(scrollToNewest) === true)
                {
                scrollToNewest = false;
                }

              switch(chat.mode)
                    {
                       default:

                          if(angular.isUndefined(chat.transferData[chat.game]) === true)
                            {
                              chat.transferData[chat.game] = {
                                total:    0,
                                timestamp:0,
                              };
                            }

                          if (angular.isUndefined(chat.uuid) === true || chat.uuid === '')
                               {
                               params = { 'type':'games','game': chat.game};
                               }
                          else {
                               params = { 'type':'uuid','uuid': chat.uuid};
                               }

                          break;
                    }

              params.elementId = (id !== undefined ? id : null);

              chat.DB.call('Chats','get',params).then(
                function(result)
                {

                    var chatWindow = document.getElementById(chat.id + '_chat_messages');
                    var initEcho   = false;
                    var offsetTop  = 0;
                    var offseti    = 0;
                    var offsetCnt  = 0;

                    chat.messagesAdded = 0;

                    chat.chatType = result.data.type;

                    if(result.data.chat !== chat.current)
                      {
                      chat.clear();
                      initEcho = true;
                      }

                    chat.current = result.data.chat;

                    if(initEcho === true)
                      {
                      chat.listen();
                      }

                    chat.mix(result.data.messages);

                    if(scrollToNewest === true)
                      {
                        $timeout(function()
                        {
                            if($state.current.name === 'app.chat.detail' || $state.current.name === 'app.chat.overview')
                              {
                              chatWindow.scrollBy({top:chatWindow.scrollHeight});
                              }
                        });
                      }
                    else if(params.elementId !== null)
                      {
                      if(chat.messagesAdded > 0)
                          {
                          for (offseti = 0; offseti < chatWindow.childNodes.length; offseti++)
                                {
                                if(chatWindow.childNodes[offseti].nodeName === 'DIV')
                                    {
                                    offsetTop += chatWindow.childNodes[offseti].clientHeight;
                                    offsetCnt++;
                                    if(offsetCnt === chat.messagesAdded)
                                        {
                                        break;
                                        }
                                    }
                                }
                          $timeout(function()
                          {
                              chatWindow.scrollTop = offsetTop;
                          },100);
                          }
                      }

                    // Reset the loading

                    $timeout(function()
                    {
                      chat.loading = false;
                    },250);

                },
                function(errorResult)
                {

                    var message = chat.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                    if (errorResult.statusCode === 401)
                          {
                          return;
                          }

                    if(angular.isDefined(errorResult.data)         === true &&
                       angular.isDefined(errorResult.data.message) === true)
                      {
                      message = errorResult.data.message;
                      }

                    chat.ALERT.add({
                        'title':     chat.LANG.getString('Fehler beim Laden des Chats!'),
                        'message':   errorResult.data.message,
                        'autoClose': true
                    });

                    if(errorResult.statusCode === 403)
                      {
                      $state.go('app.start',{});
                      }

                }
              );
          };

          // Listen to broadcasting events

          chat.listen = function()
          {

            if(chat.current === null)
              {
              return;
              }
            
            console.log('Joining ' + 'chat-' + chat.current);

            Echo.join('chat-' + chat.current)
              .here(function(users) {

                  var i = 0;


                  chat.users    = [];
                  chat.usersIds = [];

                  for (i = 0; i < users.length; i++)
                      {
                      chat.users      [chat.users.length] = users[i];
                      chat.usersIds[chat.usersIds.length] = users[i].id;
                      }

                  $timeout(function()
                  {
                    $scope.$apply();
                  });

              })
              .joining(function(user) {

                  var ind = chat.usersIds.indexOf(user.id);

                  if(ind === -1)
                    {
                      chat.users   [chat.users.length]    = user;
                      chat.usersIds[chat.usersIds.length] = user.id;
                    }

                  $timeout(function()
                  {
                    $scope.$apply();
                  });

              })
              .leaving(function(user){

                  var ind = chat.usersIds.indexOf(user.id);

                  if(ind > -1)
                    {
                    chat.users.splice(ind,1);
                    chat.usersIds.splice(ind,1);
                    }

                  $timeout(function()
                  {
                    $scope.$apply();
                  });
              })
              .listen('.ChatMessage', function(e) {
                 console.log(e);
                 if(e.uuid === chat.current)
                   {
                   chat.init(true);
                   }
              })
              .listen('.ChatMessageRead', function(e) {
                 console.log(e);
                 $rootScope.$broadcast('updateUser',{});
              });

          }

          // Broadcasts

          $rootScope.$on('chooseGame',function(event,args)
          {

                if (angular.isDefined(chat.uuid) === true && chat.uuid !== '')
                   {
                   return;
                   }
                else if(chat.game === store.get('log_choosen_game'))
                  {
                  return;
                  }

                chat.game = store.get('log_choosen_game');
                chat.init(true);
          });

          // Watchers

          $scope.$watch('chat.current', function (newValue,oldValue) {

              if(oldValue !== null)
                {
                Echo.leave('chat-' + oldValue);
                }
          });

          // Stanadard init behavior

          chat.$onInit = function () {

              var scrollElement = null;

              chat.init(true);
              chat.listen();

              // Listener

              $timeout(function(){

                scrollElement = document.getElementById(chat.id + '_chat_messages');

                scrollElement.addEventListener('scroll', function(e) {

                    if(scrollElement.scrollTop <= 10 && chat.loading === false)
                      {
                          chat.loading = true;
                          chat.init(false,chat.messages[0].id);
                      }
                });

                // Set placeholder
                if (chat.mode === 'streams')
                  {
                  chat.writePlaceholder = chat.LANG.getString('Kommentar schreiben');  
                  }

              });

          };

          $rootScope.$on('userLogged',function(event,args){
            chat.user = chat.USER.getCurrentUser();
          });

          $rootScope.$on('updateUser',function(){
            chat.user = chat.USER.getCurrentUser();
          });

     }
]);
