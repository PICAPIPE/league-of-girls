appConfig.registerModule('games');

angular.module('games').run([
    'DB',
    function(DB){

            // Register DB - Services

            DB.register('Games','api/games');

        }
    ]);
