angular.module('core').controller('CoreStartCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller,store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.featured   = {};
          ctrl.storageKey = 'log_choosen_game';


       ctrl.introText = [
         {
           'question': 'Du möchtest E-Sportlerin werden? Du suchst nach Mentor*innen, Insider*innen oder möchtest dich mit Gleichgesinnten austauschen? Du bist schon länger in der deutschsprachigen E-Sport & Gaming Szene, möchtest deine Erfahrungen teilen und neue Leute kennenlernen? Du bist Journalist*in, Forscher*in oder anderweitig am Thema E-Sport interessiert und suchst nach Kontakten in der Szene?',
           'answer': 'Erstelle dir ein League of Girls Meet Profil und vernetze dich!'
         },
         {
           'question': 'Du bist Gamerin und streamst auch Twitch oder führst einen YouTube Kanal? Du kennst einen spannenden Blog-Beitrag rund um Gender, Diversity, E-Sport & Gaming?',
           'answer': 'Schlag deinen Twitch Channel, Social Media Kanal oder einen Artikel für unseren News Stream vor!'
         },
         {
           'question': 'Du möchtest dich rund um E-Sport, den wichtigsten Games oder den Beiträgen in unserem News Channel austauschen?',
           'answer': 'Nutze unsere Chat Funktion!'
         },
         {
           'question': 'Du möchtest dich für mehr Diversität in der E-Sport & Gaming Szene einsetzen?',
           'answer': 'Werde Teil der League of Girls Community!'
         },
       ];
       
       

          ctrl.activeText = 0;

          ctrl.nextText = function() {
            ctrl.activeText = ctrl.activeText+1 < ctrl.introText.length ? ctrl.activeText+1 : 0;
          }
          ctrl.prevText = function() {
            ctrl.activeText = ctrl.activeText-1 >= 0 ? ctrl.activeText-1 : ctrl.introText.length-1;
          }

          // Init function

          ctrl.$onInit = function()
          {
              var params = {};
              var game   = store.get(ctrl.storageKey);

              if (angular.isDefined(game) === true)
                   {
                   params['game'] = game;
                   }

              ctrl.DB.call('Streams','featured',params).then(
                function(result)
                {
                ctrl.featured = result.data.data;

                switch(ctrl.featured.type)
                      {
                      case 'twitch':
                        ctrl.featured.stream = '<div class="embed-responsive embed-responsive-16by9"><iframe src="http://player.twitch.tv/?channel=' + ctrl.featured.channel + '&muted=false" height="720" width="1280" frameborder="0" scrolling="no" allowfullscreen="false"></iframe></div>';
                        break;
                      case 'youtube':
                        ctrl.featured.stream = '<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315" src="'+ ctrl.featured.url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';
                        break;
                      default:
                        break;
                      }

                },
                function(errorResult)
                {
                ctrl.featured = {};
                }
              );
          };

          $rootScope.$on('chooseGame',function(event,args){

               // Other game identified
               if (store.get(ctrl.storageKey) !== args.id)
                     {
                     ctrl.featured = {};
                     }

               ctrl.$onInit();
          });

     }
]);
