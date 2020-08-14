angular.module('plattforms').component('plattformsCreate', {
  templateUrl:  'views/plattforms/plattforms.create.html',
  controller:   'PlattformsCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@'
                }
});
