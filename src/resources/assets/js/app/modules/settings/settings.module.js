appConfig.registerModule('settings');

angular.module('settings').config([
    '$rootScopeProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'gettext',
    function ($rootScopeProvider,$stateProvider, $urlRouterProvider,$locationProvider,gettext) {

        var states = [
            {
              name:      'app.settings'
            },
            {
              name:      'app.settings.overview',
              url:       '/settings',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/settings/settings.overview.html',
                    'controller':  'SettingsOverviewCtrl as ctrl'
                  }
              },
              roles: ['Admin']
            },
            {
              name:      'app.settings.games',
              label:     gettext('Spiele'),
              url:       '/settings/games',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/settings/settings.area.html',
                    'controller':  'SettingsAreaCtrl as setting'
                  }
              },
              datalist:{
                  'DB':       'Games',
                  'template' :'{{$parent.entry.name}}',
                  'component':'games-create'
              },
              showAtSettings: true,
              roles: ['Admin']
            },
            {
              name:      'app.settings.plattforms',
              label:     gettext('Plattformen'),
              url:       '/settings/plattforms',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/settings/settings.area.html',
                    'controller':  'SettingsAreaCtrl as setting'
                  }
              },
              datalist:{
                  'DB':       'Plattforms',
                  'template' :'{{$parent.entry.name}}',
                  'component':'plattforms-create'
              },
              showAtSettings: true,
              roles: ['Admin']
            },
            {
              name:      'app.settings.communications',
              label:     gettext('Kommunikationsmethoden'),
              url:       '/settings/communications',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/settings/settings.area.html',
                    'controller':  'SettingsAreaCtrl as setting'
                  }
              },
              datalist:{
                  'DB':       'Communications',
                  'template' :'{{$parent.entry.name}}',
                  'component':'communications-create'
              },
              showAtSettings: true,
              roles: ['Admin']
            },
            {
              name:      'app.settings.links',
              label:     gettext('Links'),
              url:       '/settings/links',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/settings/settings.area.html',
                    'controller':  'SettingsAreaCtrl as setting'
                  }
              },
              datalist:{
                  'DB':       'Links',
                  'template' :'{{$parent.entry.name}}',
                  'component':'links-create'
              },
              showAtSettings: true,
              roles: ['Admin']
            },
            {
              name:      'app.settings.crawler',
              label:     gettext('Crawler'),
              url:       '/settings/crawler',
              views:     {
                  '!$default.content':{
                    'templateUrl': 'views/settings/settings.area.html',
                    'controller':  'SettingsAreaCtrl as setting'
                  }
              },
              datalist:{
                  'DB':       'Crawler',
                  'template' :'<crawler-unit uuid="$parent.entry.uuid"></crawler-unit>',
                  'component':'crawler-create'
              },
              showAtSettings: true,
              roles: ['Admin']
            }
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
          $stateProvider.state(state);
        });


    }]);
