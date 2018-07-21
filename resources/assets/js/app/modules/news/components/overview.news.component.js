angular.module('news').component('newsOverview', {
  templateUrl:  'views/news/overview.news.html',
  controller:   'NewsOverviewCtrl as ctrl',
  bindings:     {
                    mode:   '@',
                    filter: '@'
                }
});
