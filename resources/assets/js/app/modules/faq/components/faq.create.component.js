angular.module('faq').component('faqCreate', {
  templateUrl:  'views/faq/faq.create.html',
  controller:   'FaqCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@',
                    onSave:  '&',
                    onAbort: '&'
                }
});
