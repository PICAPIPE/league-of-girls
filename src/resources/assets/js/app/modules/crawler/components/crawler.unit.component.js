angular.module('crawler').component('crawlerUnit', {
  templateUrl:  'views/crawler/crawler.unit.html',
  controller:   'CrawlerUnitCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '='
                }
});
