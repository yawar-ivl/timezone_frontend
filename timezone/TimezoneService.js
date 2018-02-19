'use strict';
angular.module('myApp')
    .service('TimezoneService', ['$http', '$q', 'settings', function($http, $q, settings) {
        var service = {
            timezone: null,
            getTimezone: function(timezoneId) {
                var deferred = $q.defer();
                $http.get("api/Timezone/GetTimeZone?timezoneId="+timezoneId).then(
                    function(response) {                       
                        if(response.data){
                            service.timezones = response.data.timezones;
                            deferred.resolve(response);
                        } else {
                            deferred.reject(response);
                        }                       
                    },
                    function(error) {
                        return $q.reject(error);
                    }
                );
                return deferred.promise;
            },

        };
        return service;
    }]);
