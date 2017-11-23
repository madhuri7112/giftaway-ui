giftAwayApp.controller('loginController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    
    $scope.username = "madhuri2";
    $scope.password = "123456"

    $scope.login = function() {
       apiService.getToken($scope.username, $scope.password);
    }
    	   
}]);
















// giftAwayApp.controller('loginController',function($scope, $http, 'apiService') {
      
    
    
// });


