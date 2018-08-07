angular.module('pages').component('pageCreate', {
  templateUrl:  'views/pages/pages.create.html',
  controller:   'PagesCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    pageId:    '@',
                    onSave:    '&',
                    onAbort:   '&'
                }
});
