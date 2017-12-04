giftAwayApp.controller('loginController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    
    $scope.username = "madhuri2";
    $scope.password = "123456";
    $scope.hidenavs = true;

    $scope.regUsername = "";
    $scope.regPassword = ""
    $scope.regEmail = "";
    $scope.showemailbox = false;
    $scope.forgot_email = "";

    $scope.login = function() {
       apiService.getToken($scope.username, $scope.password);
    }

    $scope.registerUser = function() {
        apiService.register($scope.regUsername, $scope.regPassword, $scope.regEmail);
    }

    $scope.forgotpassword = function() {
        apiService.forgotPassword($scope.forgotEmail).then(function(result) {
            $scope.showemailbox = false;
        });

    }
    	   
}]);


