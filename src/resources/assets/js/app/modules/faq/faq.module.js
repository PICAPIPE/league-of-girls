appConfig.registerModule('faq');

angular.module('faq').config([
    '$stateProvider',
    function($stateProvider){

            var states = [
                {
                  name:      'app.faq'
                },
                {
                  name:      'app.faq.overview',
                  url:       '/faq',
                  views:     {
                      '!$default.content':{
                        'templateUrl': 'views/faq/faq.overview.html',
                        'controller':  'FaqOverviewCtrl as ctrl'
                      }
                  },
                  roles: []
                },
            ];

            // Loop over the state definitions and register them
            states.forEach(function(state) {
              $stateProvider.state(state);
            });

        }
    ]);
