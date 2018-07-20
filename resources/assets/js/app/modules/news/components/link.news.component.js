angular.module('news').component('newsLink', {
  templateUrl:  'views/news/link.news.html',
  controller:   'NewsLinkCtrl as ctrl',
  bindings:     {
                    uuid:   '@'
                }
});
