angular.module('news').component('newsYoutube', {
  templateUrl:  'views/news/twitch.news.html',
  controller:   'NewsYoutubeCtrl as ctrl',
  bindings:     {
                    uuid:   '@'
                }
});
