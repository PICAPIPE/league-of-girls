angular.module('alerts').factory('AlertService', [
    '$rootScope',
    function($rootScope) {

        var service     = this;

        service.add     = function(data)
        {
            $rootScope.$broadcast('AlertAdd',{data:data});
        };

        return service;

    }
]);
