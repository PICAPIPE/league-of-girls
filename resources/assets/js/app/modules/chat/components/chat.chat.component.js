angular.module('chat').component('chat', {
  templateUrl:  'views/chat/control.chat.html',
  controller:   'ChatCtrl as chat',
  bindings:     {
                    id:        '@',
                    uuid:      '@',
                    mode:      '@',
                    profile:   '@'
                }
});
