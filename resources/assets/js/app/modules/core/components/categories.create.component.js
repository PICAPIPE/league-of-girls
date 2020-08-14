angular.module('core').component('categoryCreate', {
  templateUrl:  'views/core/categories.create.html',
  controller:   'CategoryCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@',
                    onSave:  '&',
                    onAbort: '&'
                }
});
