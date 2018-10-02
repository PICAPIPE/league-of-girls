angular.module('pages').component('pageElementCreate', {
  templateUrl:  'views/pages/pages.elements.create.html',
  controller:   'PagesElementsCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    pageId:    '@',
                    elementId: '@',
                    parent:    '@',
                    onSave:    '&',
                    onAbort:   '&'
                }
});
