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

// Add a new directive to both bind HTML and compile it, for the purpose of
// enabling links. Based on https://github.com/francisbouvier/ng_html_compile
app.directive('ngBindHtmlCompile', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.ngBindHtmlCompile, function(newValue) {
        element.html(newValue);
        $compile(element.contents())(scope);
      });
    }
  };
});
