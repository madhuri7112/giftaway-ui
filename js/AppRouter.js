var giftAwayApp = angular.module('giftAwayApp', ['ngRoute']);


giftAwayApp .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'templates/homepage.html',
        controller: 'homepageController'
      })
      .when('/login', {
      	templateUrl: 'templates/login.html',
        controller: 'loginController'
      })
  }]);