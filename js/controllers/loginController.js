giftAwayApp.controller('loginController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    
    $scope.username = "madhuri2";
    $scope.password = "123456";
    $scope.hidenavs = true;
console.log($location.path());
    $scope.login = function() {

    alert(100);
       apiService.getToken($scope.username, $scope.password);
    }
    	   
}]);


