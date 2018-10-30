angular.module('pages').component('videoPlayer', {
  templateUrl:  'views/pages/pages.video.player.html',
  controller:   'PagesVideoPlayerCtrl as video',
  scope:        true,
  bindings:     {
                    source:      '@?', // video source name
                    loop:        '@?', // boolean
                    loopStart:   '@?', // sec
                    playerClass: '@?', // css class
                    id:          '@?', // id
                    settings:    '=?', // Einstellungen können übernommen werden.
                }
});
