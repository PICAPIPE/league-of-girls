angular.module('datalist').component('datalist', {
  templateUrl:  'views/datalist/datalist.html',
  controller:   'DatalistCtrl as datalist',
  transclude: {
    'main':    '?datalistMain',
    'actions': '?datalistActions'
  },
  scope:        true,
  bindings:     {
                    options:        '=',
                    data:           '<',
                    showPagination: '=',
                    showActions:    '='
                }
});
