angular.module('user').component('loginLayout', {
  templateUrl:  'views/user/login.layout.html',
  controller:   'LoginLayoutCtrl as layout'
});

angular.module('user').directive('loginLayoutView', function() {
  return { template: '<login-layout></login-layout>'};
});
