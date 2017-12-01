giftAwayApp.controller('myregistriesController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    
    apiService.fetchRegistries().then(function(registries) {
        $scope.myRegistries = registries['self_registries'];
        $scope.otherRegistries = registries['other'];

        
    });

    $scope.logout = function() {
        apiService.logout();
    }
         
}]);


