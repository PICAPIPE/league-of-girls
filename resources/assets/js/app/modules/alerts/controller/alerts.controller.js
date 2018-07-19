angular.module('alerts').controller('AlertCtrl',[
     '$scope',
     '$rootScope',
     '$state',
     '$window',
     '$controller',
     '$timeout',
     function($scope, $rootScope, $state, $window, $controller,$timeout) {

          var alerts = this;

          // Variables

          alerts.listItemOpen = [];
          alerts.list         = [];

          alerts.types        = [
            'default',
            'success',
            'error',
            'warning',
            'info'
          ];

          // Method to dismiss an alert

          alerts.dismiss = function(index,event)
          {

              var elementi    = 0;
              var everyClosed = true;

              if(angular.isDefined(event) === true)
                {
                    event.preventDefault();
                }

              alerts.listItemOpen[index] = false;

              $timeout(function(){

                  // Check if every alert is closed

                  for (elementi = 0; elementi < alerts.listItemOpen.length; elementi++)
                      {
                           if(alerts.listItemOpen[elementi] === true)
                             {
                                everyClosed = false;
                                break;
                             }
                      }

                  if(everyClosed === true)
                    {
                        // Reset

                        $timeout(function()
                        {
                          alerts.listItemOpen = [];
                          alerts.list         = [];
                        },1000)

                    }

                  $scope.$apply();

              });

          };

          // Add method to call an alert

          alerts.add    = function(alert)
          {

              var index       = alerts.listItemOpen.length;

              alerts.listItemOpen[index] = false;
              alerts.list        [index] = alert;

              $timeout(function()
              {

                  $scope.$apply();

                  $timeout(function()
                  {

                      alerts.listItemOpen[index] = true;
                      $scope.$apply();

                  },500);

              });

          };

          // Returns the the current the class of an alert

          alerts.getClass = function(element,index)
          {

              var classAdd = '';

              if(alerts.listItemOpen[index] === true)
                {
                   classAdd = ' open';
                }

              return 'alerts-' + element.type + classAdd;

          };

          // Calculates the z-index and the top position of the alert

          alerts.getStyle = function(index)
          {

              var top       = 0;
              var elementi  = 0;

              var elements = document.getElementsByClassName("alerts-element");

              // Calculate the top position

              for(elementi = 0; elementi < index + 1; elementi++)
                 {

                    if(elementi < index && alerts.listItemOpen[elementi] === false)
                       {
                           continue;
                       }

                    if(alerts.listItemOpen[elementi] === true && elementi === index)
                      {
                         break;
                      }

                    top += elements[elementi].clientHeight;

                 }


              if(alerts.listItemOpen[index] === false)
                {
                    top = top * -1;
                }

              return {
                 'z-index': (99999 - index),
                 'top'    : top + 'px'
              };
          };

          // Returns the css classes of a footer btn. Attr cssClass = array

          alerts.getClassesForBtn = function(btn)
          {

              var classes = [
                  'alerts-btn'
              ];

              if(angular.isDefined(btn.cssClass) === true)
                {
                    classes = classes.concat(btn.cssClass);
                }

              return classes.join(' ');
          }

          // Init method with init of the button methods

          alerts.initBtn = function(btn,index)
          {

              btn.pid     = index;
              btn.methods = {};

              btn.methods.getPid  = function()
              {
                 return btn.pid;
              }

              btn.methods.dismiss = function()
              {
                  alerts.dismiss(this.getPid());
              };

          };

          // Callback function for the button

          alerts.callBtn = function(e,alertElement,btn)
          {

              e.preventDefault();

              if(angular.isUndefined(btn.callback) === true)
                {
                    btn.methods.dismiss();
                }

              if(angular.isDefined(btn.callback) === true)
                {
                    btn.callback(e,alertElement,btn,alertElement.params);
                }

          };

          // Alert init method will be called every time an element is added to alerts list

          alerts.init = function(element,index)
          {

                var ts = element.autoCloseTime !== undefined && isNaN(element.autoCloseTime) === false ? element.autoCloseTime : 2000;

                // Set data

                element.index = index;

                // Auto close the alert

                if(angular.isDefined(element.autoClose) === true && element.autoClose === true)
                  {
                      $timeout(function(){
                          alerts.dismiss(index);
                      },ts)
                  }

          };

          // Watchers

          $rootScope.$on('AlertAdd',function(event,args){

              var type          = args.data.type          !== undefined && alerts.types.indexOf(args.data.type) > -1 ? args.data.type : 'default';
              var title         = args.data.title         !== undefined ? args.data.title    : '';
              var message       = args.data.message       !== undefined ? args.data.message  : '';
              var callback      = args.data.callback      !== undefined ? args.data.callback : '';
              var params        = args.data.params        !== undefined ? args.data.params   : {};
              var buttons       = args.data.buttons       !== undefined ? args.data.buttons  : [];
              var autoCloseTime = args.data.autoCloseTime !== undefined ? args.data.autoCloseTime : 5000;
              var autoClose     = args.data.autoClose     !== undefined ? args.data.autoClose : false;

              alerts.add({
                  type:          type,
                  title:         title,
                  message:       message,
                  callback:      callback,
                  params:        params,
                  buttons:       buttons,
                  autoClose:     autoClose,
                  autoCloseTime: autoCloseTime
              });

          });

     }
]);
