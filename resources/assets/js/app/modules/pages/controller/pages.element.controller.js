angular.module('pages').controller('PagesElementCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     function($scope, $rootScope, $state, $window, $controller) {

          var element = this;
          angular.extend(element, $controller('BaseCtrl', {$scope: $scope}));

          element.currentUser = element.USER.getCurrentUser();

          // Check if the element is allowed
          element.check   = function(area)
          {
              var check = true;
              if (angular.isUndefined(area)               === true ||
                  angular.isUndefined(element.data[area]) === true ||
                  element.data[area]                      === '')
                     {
                     check = false;
                     return check;
                     }

              switch(area)
                    {
                    case 'headline':
                        if (element.data.type !== 'headline' &&
                            element.data.type !== 'text')
                              {
                              check = false;
                              }
                        break;
                    }

              return check;
          };

          // Get the outer css class for the element
          element.getClass = function()
          {
              var classNames = [];
              if (element.currentUser.permissions.indexOf('Admin') > -1)
                    {
                    classNames.push('show-lines');
                    if(element.data.published === false)
                         {
                         classNames.push('unpublished');
                         }
                    }
              return classNames.join(' ');
          };


          // Edit button
          element.edit = function(e)
          {
              $rootScope.$broadcast('element-edit', {uuid: element.data.uuid});

          };

          // Remove element
          element.remove = function()
          {
              element.DB.call('Elements','destroy',element.data.uuid).then(
                  function(data)
                  {
                    $rootScope.$broadcast('page-reload');
                  },
                  function(errorResult)
                  {
                    var message = element.LANG.getString('Es leider ein Fehler aufgetreten. Bitte probiere es erneut.');

                    if(angular.isDefined(errorResult.data)         === true &&
                       angular.isDefined(errorResult.data.message) === true)
                      {
                      message = errorResult.data.message;
                      }

                    element.ALERT.add({
                        'title':     element.LANG.getString('Fehler beim Löschen des Datensatzes'),
                        'message':   message,
                        'autoClose': true
                    });
                  }
              );
          };

          // Returns the headline html
          element.getHeadline = function()
          {
              return '<' + (element.data.headlineSize || 'h1') + '>' + (element.data.headline || '') + '</' + (element.data.headlineSize || 'h1') + '>';
          };

     }
]);
