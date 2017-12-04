giftAwayApp.controller('adminController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {
    

    $scope.items = []
    $scope.newItem = {
        "item_code": "",
        "item_name": "",
        "price": "",
        "category": "",
        "colour": ""
    }

    apiService.fetchItems().then(function(response) {
       $scope.items = response['items']
    }) 

    $scope.addItem = function() {
        apiService.addItemToInventory($scope.newItem).then(function(response) {
            alert("Item added succesfully");
        });
    }

    $scope.removeItem = function(item_id) {
        params = {"item_id": item_id};
        apiService.removeItemFromInventory(params).then(function(response) {
            alert("Item Removed succesfully");
        });
    }

    $scope.logout = function() {
        apiService.logout();
    }

    $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
       $('.modal').modal();
    });

    $(document).ready(function() {
       $('select').material_select();
    });
       
}]);


