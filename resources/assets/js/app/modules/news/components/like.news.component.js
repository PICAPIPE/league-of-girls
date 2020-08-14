angular.module('news').component('newsLike', {
  templateUrl:  'views/news/like.news.html',
  controller:   'NewsLikeCtrl as ctrl',
  bindings:     {
                    news:   '='
                }
});
