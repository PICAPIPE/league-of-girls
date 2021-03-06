angular.module('core').controller('CoreSiteModalCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     '$http',
     '$sce',
     function($scope, $rootScope, $state, $window, $controller,$timeout,$http,$sce) {

          var modal = this;
          angular.extend(modal, $controller('BaseCtrl', {$scope: $scope}));

          modal.content = '';
          modal.classes = [];
          modal.styles  = {};

          modal.getStyle = function()
          {
              return modal.styles;
          };

          modal.getClass = function()
          {
              return modal.classes.join(' ');
          };

          modal.close = function(e)
          {
              e.preventDefault();

              modal.classes = [];

              $timeout(function()
              {
                  modal.content = '';
              },300);

              $rootScope.$broadcast('$modalIsClosing',{modal:modal});

          };

          // Listen to Request abortion

          $rootScope.$on('$modalCreate', function (event,args) {

              if(modal.content !== '')
                {
                     modal.classes = [];
                }

              $timeout(function()
              {

                  modal.content                       = args.settings.content;
                  modal.classes[modal.classes.length] = 'open';
                  modal.classes                       = modal.classes.concat(args.settings.classes || []);

                  modal.styles                        = {
                      background:   args.settings.background !== undefined ? args.settings.background : '#f4f4f4',
                      height:       document.getElementsByTagName('body')[0].offsetHeight + 'px',
                      'min-height': window.outerHeight + 'px'
                  };

                  // Scroll to top
                  window.scrollTo(0, 0);

                  $scope.$apply();

              },300);

          });

          $rootScope.$on('$modalClose', function (event,args)
          {
                modal.close(event);
          });

     }
]);

angular.module('core').filter('compile',['$sce',
    function($sce){
         return function(input) {
                return $sce.trustAsHtml(input);
          };
    }
]);

angular.module('core').filter('trustUrl', function ($sce) {
    return function(url) {
    return $sce.trustAsResourceUrl(url);
   };
});
