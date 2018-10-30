angular.module('pages').component('pageElement', {
  templateUrl:  'views/pages/pages.element.html',
  controller:   'PagesElementCtrl as element',
  scope:        true,
  bindings:     {
                    data:    '='
                }
});
