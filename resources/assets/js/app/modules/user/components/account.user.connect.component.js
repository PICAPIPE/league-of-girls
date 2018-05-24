angular.module('user').component('userConnect', {
  templateUrl:  'views/user/connect.user.html',
  controller:   'UserConnectCtrl as connect',
  bindings:     {
                    userId:   '@'
                }
});
