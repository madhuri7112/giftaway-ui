giftAwayApp.service('apiservice',['$http', '$location', function($http, $location){

    this.tokenKey = "giftAwayToken"
    this.userIdKey = "giftAwayUserId"

    this.postMethod = "POST"
    this.getMethod = "GET"

    this.loginApi = "login"
    this.logoutApi = "logout"
    this.registriesApi = "registries"
    this.userfromtokenApi = "userfromtoken"
    this.registryDetailsApi = "getregistry"
    this.registerApi = "newuser"
    this.userdetailsApi = "userdetails"
    this.changepasswordApi = "changepassword"

    serverUrl = "http://127.0.0.1:3000/giftRegistry";
    STATUS_SUCCESS = "SUCCESS"
    STATUS_FAILED = "FAIL"

    LOGIN_URL = "/login"
    MY_REGISTRIES_URL = "/myregistries"

    self = this;

    var makeRequest = function(method, params, url) {

        if (localStorage.getItem(self.tokenKey) == null) {
            token = ""
            
            console.log(url);
        } else {
            token = localStorage.getItem(self.tokenKey);
            
            console.log(url);
            console.log(token);
        }

        headers = {
               'Content-Type': 'application/json'
        }

        if (token == "") {
            if (url == self.loginApi) {
            } else {              
                $location.url('/login');
            }
        } else {
            headers['Authorization'] = token
        }
        // if (token == "" && url != this.loginApi){
        //     $location.url('/login');
        // } else {
        //     headers['Authorization'] = "aa20f8404d57fe9329f290a8e4cdc4ba06aca505"
        // }
        responseData = null;
        return $http({
        
            method: method,
            //url: 'http://127.0.0.1:8000/giftAway/createtoken',
            url: serverUrl+'/'+url,
            headers: headers,
            data: params,
            params: params
        }).then(function successCallback(response) {
            responseData = response.data;
            //console.log(responseData);
            
            return responseData;
        }, function errorCallback(response) {
            console.log("error");
            console.log(response);
        });
    }

    
    this.getToken = function(username, password) {
          
        localStorage.clear();
        
        params = {"username": username, "password": password}

        responseData = makeRequest(self.postMethod, params, self.loginApi)
        .then(function(responseData) {

             if (responseData != null && ("status" in responseData) && responseData['status'] == STATUS_FAILED) {
                   alert("Incorrect username and password.Please try again");
             } else {
                   //console.log(responseData);
                   token = responseData['token'];
                   userId = responseData['user_id'];
                   localStorage.setItem(self.tokenKey, token);
                   localStorage.setItem(self.userIdKey, userId);
                   $location.url(MY_REGISTRIES_URL);
             }
             
        });          
          
    }

    this.logout = function() {
        userId = localStorage.getItem(self.userIdKey);
        if (userId != null) {
            params = {"user_id":userId};

            return makeRequest(self.postMethod, params, self.logoutApi).then(function(responseData) {
             localStorage.clear();
             $location.url(LOGIN_URL);
             return;
            }); 

        } 

        $location.url(LOGIN_URL);
    }

    this.fetchRegistryDetails = function(registryId) {
        params = {"registry_id": registryId}
        userId = localStorage.getItem(self.userIdKey)

        if (userId === null) {
            $location.url(LOGIN_URL);
        } else {
        //TODO - remove this hack
            params['user_id'] = userId;

            return makeRequest(self.getMethod, params, self.registryDetailsApi).then(function(responseData) {
                 return responseData;
            }); 
        } 
    }

    this.fetchRegistries = function() {
        
        userId = localStorage.getItem(self.userIdKey)

        if (userId === null) {
            $location.url(LOGIN_URL);
        } else {
            params = {"user_id":userId};

             return makeRequest(self.getMethod, params, self.registriesApi).then(function(responseData) {
             return responseData;
            });    
        }       
    }

    this.register = function(username, password, email) {
        params = {
            "username" : username,
            "password" : password,
            "email" : email
        }

        return makeRequest(self.postMethod, params, self.registerApi).then(function(responseData) {
             if (("status" in responseData) && responseData['status'] == STATUS_FAILED) {
                   alert($responseData['message']);
             } else {
                   alert("User succesfully created.Please login");
             }
        });  

    }

    this.fetchUserDetails = function() {
        params = {}
        return makeRequest(self.getMethod, params, self.userdetailsApi).then(function(responseData) {
             return responseData;
        });  
    }

    this.changepassword = function(password) {
        params = {"password" : password}

        return makeRequest(self.postMethod, params, self.changepasswordApi).then(function(responseData) {
             if (("status" in responseData) && responseData['status'] == STATUS_FAILED) {
                   alert($responseData['message']);
             } else {
                   alert("password succesfully changed");
             }
        });  
    }

}]);