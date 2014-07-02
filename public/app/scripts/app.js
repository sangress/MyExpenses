'use strict';

angular.module('myExpensesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'meServices',
  'ui.bootstrap',
  'meFilters',
  'ngAnimate'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/expenses.html',
        controller: 'ExpensController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
