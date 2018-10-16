appConfig.registerModule('forms');

angular.module('forms').config([
    '$stateProvider',
    function($stateProvider){

            var states = [
                
            ];

            // Loop over the state definitions and register them
            states.forEach(function(state) {
              $stateProvider.state(state);
            });

        }
    ]);
