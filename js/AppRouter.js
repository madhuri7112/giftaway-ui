var giftAwayApp = angular.module('giftAwayApp', ['ngRoute']);


giftAwayApp .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'templates/homepage.html',
        controller: 'homepageController'
      })
      .when('/login/', {
      	templateUrl: 'templates/login.html',
        controller: 'loginController'
      })
      .when('/myregistries', {
        templateUrl: 'templates/myregistries.html',
        controller: 'myregistriesController'
      })
      .when('/registryDetails/:registry_id/', {
        templateUrl: 'templates/registryDetails.html',
        controller: 'registryController'
      })
      .otherwise({
        templateUrl: 'templates/notfound.html'
      })
  }]);