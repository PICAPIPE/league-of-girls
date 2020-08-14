angular.module('forms').component('formMultiSelect', {
  templateUrl:  'views/forms/multiselect.forms.html',
  controller:   'FormsMultiSelectCtrl as ctrl',
  scope:        true,
  bindings:     {
                    items:    '=',
                    callback: '='
                }
});
