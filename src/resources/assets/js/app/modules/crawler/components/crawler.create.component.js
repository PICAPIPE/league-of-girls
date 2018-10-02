angular.module('crawler').component('crawlerCreate', {
  templateUrl:  'views/crawler/crawler.create.html',
  controller:   'CrawlerCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@',
                    onSave:  '&',
                    onAbort: '&'
                }
});
