giftAwayApp.controller('myaccountController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    
    $scope.passwordChange = false;
    apiService.fetchUserDetails().then(function(userdetails) {
        $scope.username = userdetails.username;
        $scope.email = userdetails.email;
        $scope.password = "";
    });

    $scope.updatePassword = function() {
        $scope.passwordChange = false;
        apiService.changepassword($scope.password).then(function(result) {

        });
        
    }  
    $scope.logout = function() {
        apiService.logout();
    }       
}]);


