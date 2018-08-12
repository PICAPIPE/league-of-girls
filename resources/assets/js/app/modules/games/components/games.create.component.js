angular.module('games').component('gamesCreate', {
  templateUrl:  'views/games/games.create.html',
  controller:   'GamesCreateCtrl as ctrl',
  scope:        true,
  bindings:     {
                    uuid:    '@'
                }
});
