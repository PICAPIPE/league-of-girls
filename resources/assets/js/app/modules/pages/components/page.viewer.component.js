angular.module('pages').component('pageViewer', {
  templateUrl:  'views/pages/pages.viewer.html',
  controller:   'PagesViewerCtrl as page',
  scope:        true,
  bindings:     {
                    data:    '=',
                    alias:   '@?'
                }
});
