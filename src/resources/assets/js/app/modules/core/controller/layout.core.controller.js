angular.module('core').controller('CoreLayoutCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var layout = this;
          angular.extend(layout, $controller('BaseCtrl', {$scope: $scope}));

          layout.getHeaderClass = function()
          {
            return layout.getClassByArea('header');
          };

          layout.getContainerClass = function()
          {
            return layout.getClassByArea('container');
          };    
          
          // Returns the css class for a specific area in the layout
          layout.getClassByArea = function(area)
          {
             if (angular.isUndefined($state.current.data) === true)
                  {
                  return '';
                  }
             return $state.current.data[area + 'Class'];
          };

     }
]);
