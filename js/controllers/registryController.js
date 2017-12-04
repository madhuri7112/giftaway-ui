giftAwayApp.controller('registryController', ['$scope', '$http', '$location','$routeParams','apiservice',
    function($scope, 
        $http,
        $location,
        $routeParams,
        apiService) {
    

    
    registry_id = $routeParams['registry_id'];
    apiService.fetchRegistryDetails(registry_id).then(function(registryDetails) {
    	$scope.registry = registryDetails;
        console.log(registryDetails);
    });

    $scope.logout = function() {
        apiService.logout();
    }

    $scope.removeItem = function(item_id) {
        apiService.removeItemFromRegistry(registry_id, item_id) ;

        
    }
}]);


