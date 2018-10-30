angular.module('news').component('newsTwitter', {
  templateUrl:  'views/news/twitter.news.html',
  controller:   'NewsTwitterCtrl as ctrl',
  bindings:     {
                    uuid:   '@'
                }
});
