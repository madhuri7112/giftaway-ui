giftAwayApp.controller('myregistriesController', ['$scope', '$http', '$location','apiservice',
    function($scope, 
        $http,
        $location,
        apiService) {

    userIdKey = "giftAwayUserId";

    $scope.newregistry = {
        "name": "",
        "public": "True",
        "allowed_users": []
    }
    
    apiService.fetchRegistries().then(function(registries) {
        $scope.myRegistries = registries['self_registries'];
        $scope.otherRegistries = registries['other'];

        for(i=0; i<$scope.otherRegistries.length; i++) {

            registry = $scope.otherRegistries[i];
            items = registry.details.items;

            for (j=0;j<items.length;j++) {
                $scope.otherRegistries[i].details.items[j].show = true;
                $scope.otherRegistries[i].details.items[j].self_assigned = false;

                item = items[0];
                userId = Number(localStorage.getItem(userIdKey));
                console.log(userId);
                console.log(item.assigned_to);
                if (item.assigned_to != null) {

                   if (item.assigned_to == userId) {
                       
                       //It is assigned to the current user.
                       $scope.otherRegistries[i].details.items[j].self_assigned = true;
                   } else {

                       //Assigned to someone else, so hide it from view
                       $scope.otherRegistries[i].details.items[j].show = false; 
                   }                   
                }              
            }
        }

        console.log($scope.otherRegistries);

    });

    $scope.users = []
    apiService.fetchUsers().then(function(response) {
        $scope.users = response['users'];
    })

    $scope.assignItem = function(registry_item_id) {
        apiService.assignItem(registry_item_id);
    }

    $scope.unassignItem = function(registry_item_id) {
        apiService.unassignItem(registry_item_id);
    }

    $scope.logout = function() {
        apiService.logout();
    }

    $scope.addNewRegistry = function() {
        
        if ($scope.newregistry.public!='True') {
            for(i=0;i<$scope.users.length;i++) {
              user = $scope.users[i]
              if (user.isSelected) {
                $scope.newregistry.allowed_users.push(user.id);
                console.log(user.username);
              }
            }
        }
        
        apiService.addNewRegistry($scope.newregistry);
    }

         
}]);


