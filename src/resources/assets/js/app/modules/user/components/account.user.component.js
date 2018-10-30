angular.module('user').component('account', {
  templateUrl:  'views/user/account.user.html',
  controller:   'UserAccountCtrl as account',
  bindings:     {
                    userId:   '@?',
                    editable: '=?'
                }
});
