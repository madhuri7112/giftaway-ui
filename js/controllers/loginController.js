giftAwayApp.controller('loginController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    
    $scope.username = "";
    $scope.password = "";
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

    $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
       $('.modal').modal();
    });
    	   
}]);


