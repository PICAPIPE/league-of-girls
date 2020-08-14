angular.module('news').component('newsSubmit', {
  templateUrl:  'views/news/submit.news.html',
  controller:   'NewsSubmitCtrl as ctrl',
  bindings:     {
                    uuid:   '@'
                }
});
