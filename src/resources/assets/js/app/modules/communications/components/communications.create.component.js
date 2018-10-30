angular.module('communications').component('communicationsCreate', {
  templateUrl:  'views/communications/communications.create.html',
  controller:   'CommunicationsCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@'
                }
});
