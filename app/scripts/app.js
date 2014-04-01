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
    .when('/edit', {
      templateUrl: 'views/edit.html',
      controller: 'TwineCtrl'
    })
    .when('/view', {
      templateUrl: 'views/view.html',
      controller: 'TwineCtrl'
    })
    .otherwise({
      redirectTo: '/edit'
    });
});
