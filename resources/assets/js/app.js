import Echo from 'laravel-echo';

require('jquery');
require('bootstrap');
require('angular');
require('angular-gettext');
require('@uirouter/angularjs');
require('angular-formly');
require('angular-formly-templates-bootstrap');
require('angular-storage');
require('angular-sanitize');
require('angular-upload');
require('angular-sortable-view');

window.io   = require('socket.io-client');

window.getAppToken = function()
{
    if(window.localStorage                  !== undefined &&
       window.localStorage.getItem('token') !== undefined &&
       window.localStorage.getItem('token') !== null)
      {
      return localStorage.getItem('token').substr(1,localStorage.getItem('token').length - 2);
      }
};

window.EchoHasConnection = false;

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host:        window.location.origin + ':6001',
    auth: {
        headers: {
            'Authorization': 'Bearer ' + window.getAppToken()
        }
    }
});

window.Echo.connector.socket.on('connect', function(){
    window.EchoHasConnection = true;
});
window.Echo.connector.socket.on('disconnect', function(){
    window.EchoHasConnection = false;
});
window.Echo.connector.socket.on('reconnecting', function(attemptNumber){
    window.EchoHasConnection = false;
});
