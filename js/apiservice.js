giftAwayApp.service('apiservice',['$http', function($http){

    this.tokenKey = "giftAwayToken"
    this.userIdKey = "giftAwayUserId"

    this.postMethod = "POST"
    this.getMethod = "GET"

    this.createtokenApi = "createtoken"
    this.registriesApi = "registries"
    this.userfromtokenApi = "userfromtoken"
    this.registryDetails = "getregistry"

    serverUrl = "http://127.0.0.1:8000/giftAway";
    self = this;

    var makeRequest = function(method, params, url, self) {

        if (localStorage.getItem(this.tokenKey) == null) {
            token = ""
        } else {
            token = localStorage.getItem(tokenKey);
        }
        responseData = null;
        return $http({
        
            method: method,
            //url: 'http://127.0.0.1:8000/giftAway/createtoken',
            url: serverUrl+'/'+url,
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            },
            data: params,
            params: params
        }).then(function successCallback(response) {
            responseData = response.data;
            console.log(responseData);
            
            return responseData;
        }, function errorCallback(response) {
            console.log("error");
            console.log(response);
        });
    }

    
    this.getToken = function(username, password) {
          
        localStorage.clear();
        
        params = {"username": username, "password": password}

        responseData = makeRequest(self.postMethod, params, self.createtokenApi).then(function(responseData) {
             console.log(responseData);
             token = responseData['token'];
             userId = responseData['user_id'];
             localStorage.setItem(self.tokenKey, token);
             localStorage.setItem(self.userIdKey, userId);
        });          
          
    }

    this.fetchRegistryDetails = function(registryId) {
        params = {"registry_id": registryId}

        //TODO - remove this hack
        params['user_id'] = 11;

        return makeRequest(self.getMethod, params, self.registryDetails).then(function(responseData) {
             return responseData;
        });  
    }

    this.fetchRegistries = function() {
        
        userId = localStorage.getItem(self.userIdKey)

        //TODO - remove this hack
        //params = {"user_id": userId}
        params = {"user_id": 2}

        return makeRequest(self.getMethod, params, self.registriesApi).then(function(responseData) {
             return responseData;
        });    
    }

}]);