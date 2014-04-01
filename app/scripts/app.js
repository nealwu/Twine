/* global app:true */
'use strict';

var app = angular.module('twineApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/twine.html',
      controller: 'TwineCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
