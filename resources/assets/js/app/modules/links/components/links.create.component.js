angular.module('links').component('linksCreate', {
  templateUrl:  'views/links/links.create.html',
  controller:   'LinksCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@'
                }
});
