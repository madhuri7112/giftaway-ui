giftAwayApp.controller('additemController', ['$scope', '$http', '$location','apiservice','$routeParams',
    function($scope, 
        $http,
        $location,
        apiService,
        $routeParams) {
    
    registry_id = $routeParams['registry_id'];
    $scope.items = []
    fetchItems = function() {
         apiService.fetchItems().then(function(result) {
               $scope.items = result['items'];
         }); 
    }
    
    $scope.searchText = {}
    //$scope.searchText.colour = "bl"
    $scope.orderColumn = "price"
    fetchItems();

    $scope.sortByColumn = function(columnName) {
         $scope.orderColumn = columnName;
    }

    $scope.addItem = function(itemId) {
         apiService.addItemToRegistry(registry_id, itemId);
    }

    $scope.removeItem = function(registry_id, item_id) {
        apiService.removeItemFromRegistry(registry_id, item_id)
    }
}]);




