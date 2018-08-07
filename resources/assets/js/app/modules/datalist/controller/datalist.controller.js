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

          datalist.user       = datalist.USER.getCurrentUser();
          datalist.page       = 1;
          datalist.pagination = false;

          datalist.search     = '';
          datalist.searchTS   = null;

          // Checks if the pagination link is disabled or not
          datalist.isDisabled = function(mode)
          {
              if (mode === 'previous')
                   {
                   if (datalist.page === 1)
                         {
                         return true;
                         }
                   }
              else {
                   if (datalist.page === datalist.data.data.last_page)
                         {
                         return true;
                         }
                   }

          };

          // Init
          datalist.$onInit = function () {
              datalist.init();
          };

          // Real init function (handles the db results)
          datalist.init    = function()
          {

            if (angular.isDefined(datalist.data) === true &&
                datalist.data.statusCode         === 200)
                  {
                  datalist.page = datalist.data.data.current_page;
                  // Successful request
                  if (angular.isDefined(datalist.data.data.current_page) === true &&
                      datalist.data.data.last_page !== 1)
                        {
                        datalist.pagination = true;
                        }
                  else  {
                        // Only one page available
                        datalist.pagination = false;
                        }
                  }
            else  {
                  // Error
                  datalist.pagination = false;
                  }

             // Deactivate pagination
             if (datalist.pagination     === true &&
                 datalist.showPagination === false)
                    {
                    datalist.pagination = false;
                    }

          }

          // Handles the next request (pagination)
          datalist.next    = function()
          {
              var fn = null;
              if (angular.isDefined(datalist.onPagination)  === true &&
                  angular.isFunction(datalist.onPagination) === true)
                     {
                     fn = datalist.onPagination();
                     fn('next', datalist.page + 1);
                     }
          };

          // Handles the previous page request (pagination)
          datalist.previous    = function()
          {
            var fn = null;
            if (angular.isDefined(datalist.onPagination)  === true &&
                angular.isFunction(datalist.onPagination) === true)
                   {
                   fn = datalist.onPagination();
                   fn('next', datalist.page - 1);
                   }
          };

          // Handles the search fire event
          datalist.searchNow    = function()
          {
                var fn = null;

                if (angular.isDefined(datalist.searchTS) == true &&
                    datalist.searchTS                    != null)
                       {
                       clearTimeout(datalist.searchTS);
                       }

                datalist.searchTS = setTimeout(function()
                {
                  if (angular.isDefined(datalist.onSearch)  === true &&
                      angular.isFunction(datalist.onSearch) === true)
                         {
                         fn = datalist.onSearch();
                         fn(datalist.search);
                         }
                });
          };

          // Menu actions
          datalist.callAction = function(event,type,entry)
          {
              var fn = null;
              event.preventDefault();

              if (angular.isDefined(datalist.onAction)  === true &&
                  angular.isFunction(datalist.onAction) === true)
                     {
                     fn = datalist.onAction();
                     fn(type,entry);
                     }
          };

          // Watchers
          $scope.$watch('datalist.data', function()
          {
              datalist.init();
          },true);

          $scope.$watch('datalist.search', function()
          {
              datalist.searchNow();
          },true);

     }
]);
