angular.module('forms').controller('FormsMultiSelectCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     'store',
     function($scope, $rootScope, $state, $window, $controller, store) {

          var ctrl = this;
          angular.extend(ctrl, $controller('BaseCtrl', {$scope: $scope}));

          ctrl.label  = ctrl.LANG.getString('-');
          ctrl.open   = false;
          ctrl.filter = [];

          ctrl.$onInit = function () 
          {
              // Do init stuff here
          };

          // Open the menu items
          ctrl.toggle   = function(event) 
          {
               event.preventDefault();

               if (ctrl.open === false && ctrl.items.length === 0)
                     {
                     ctrl.open = false;
                     return;
                     }
               
               ctrl.open = !ctrl.open;
          };

          // Get styling
          ctrl.getClass = function() 
          {
               if (ctrl.open === true)
                     {
                     return 'open';
                     }

               return 'closed';
          };

          // Return the values to the parent element
          ctrl.setItems = function(filters)
          {
               var labels         = [];
               var i              = 0;
               var labelForSearch = [];

               if (angular.isDefined(ctrl.callback)  === false ||
                   angular.isFunction(ctrl.callback) === false)
                    {
                    return;
                    }

               for (i = 0; i < filters.length; i++)
                     {
                     labelForSearch = ctrl.items.filter(function(item){
                            if (item.id === filters[i])
                                  {
                                  return item;
                                  }
                     });
                     if (labelForSearch.length > 0)
                          {
                          labels.push(labelForSearch[0].label);
                          }
                     }

               if (labels.length === 0)
                     {
                     ctrl.label  = ctrl.LANG.getString('-');
                     }
              else   {
                     ctrl.label  = labels.join(', ');
                     }

               ctrl.callback(filters);
                    
          };

          // Watchers
          $scope.$watch('ctrl.items', function(newValue)
          {
              var i = 0;

              if (angular.isUndefined(newValue) === true)
                   {
                   return;
                   }

              ctrl.filter = [];

              for (i = 0; i < newValue.length; i++)
                    {
                    if (newValue[i].checked === true && angular.isDefined(newValue[i].id) === true)
                          {
                          ctrl.filter.push(newValue[i].id);
                          }
                    }
              
               ctrl.setItems(ctrl.filter);
          },true);

     }
]);
