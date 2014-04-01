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

app.directive('ngHtmlCompile', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.ngHtmlCompile, function(newValue) {
        element.html(newValue);
        $compile(element.contents())(scope);
      });
    }
  };
});
