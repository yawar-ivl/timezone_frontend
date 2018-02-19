'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  // 'myApp.view1',
  // 'myApp.view2',
  'myApp.version'
]);
app.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  // $locationProvider.hashPrefix('!');
  // $routeProvider.otherwise({redirectTo: '/view1'});
  $httpProvider.interceptors.push('$q', 'settings', function($q, settings) {
        return {
            'request': function(config) {
            	if (config.url.indexOf(".html") < 0 && config.url.indexOf(".json") < 0) { // if this is not a template load request
                    if (config.url.indexOf("http") != 0) { //skip modifying full qualified paths
                        config.url = settings.baseUrl + config.url;
                    }
                }
                return config;
            },
            // optional method
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },
            // optional method
            'response': function(response) {
                return response;
            },
            // optional method
            'responseError': function(rejection) {
                return $q.reject(rejection);
            }
        }
    });
}]);
app.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {
        baseUrl: "http://localhost:53767/",
    };
    return settings;
}]);