angular.module('datalist').controller('DatalistCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$transclude',
     '$element',
     function($scope, $rootScope, $state, $window, $controller,$transclude,$element) {

          var datalist = this;
          angular.extend(datalist, $controller('BaseCtrl', {$scope: $scope}));

          datalist.user  = datalist.USER.getCurrentUser();

          datalist.$postLink = function() {

          };

          // Init

          datalist.$onInit = function () {



          };



     }
]);
