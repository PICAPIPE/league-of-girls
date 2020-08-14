angular.module('news').component('newsTwitch', {
  templateUrl:  'views/news/twitch.news.html',
  controller:   'NewsTwitchCtrl as ctrl',
  bindings:     {
                    uuid:   '@'
                }
});
