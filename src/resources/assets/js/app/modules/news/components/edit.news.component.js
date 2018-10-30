angular.module('news').component('newsEdit', {
  templateUrl:  'views/news/edit.news.html',
  controller:   'NewsEditCtrl as ctrl',
  bindings:     {
                    uuid:   '@'
                }
});
