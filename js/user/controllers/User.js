App.controller("UserController", function($scope, $http){
    $scope.formData = {};
    $scope.userData = {};

    $scope.login = function () {
        if (!$scope.validate()) alert("Error form data");

        //validate to know if this is admin or user
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var admin = re.test($scope.formData.email);

        admin ? $scope.getAdminToken() : $scope.loginUser();
    };

    $scope.validate = function(){
        return true;
    };
    //login as admin
    $scope.getAdminToken = function () {
        $http({
            "url": "http://fitness.dev/api/login",
            "method": "POST",
            "data": $scope.formData
        }).then(function(res) {
            console.log("Auth.signin.success!");
            console.log(res);
            $scope.token = res.data;
            //get data for admin
            $scope.getAdminData()
        }, (function(res){
            console.log("Error");
            console.log(res);
        }));
    };
    //get admin data with success token
    $scope.getAdminData = function () {
        $http({
            "url": "http://fitness.dev/api/get_user_details",
            "method": "POST",
            "data": {"token": $scope.token}
        }).then(function(res) {
            console.log("Get admin.success!");
            console.log(res);
            $scope.userData = res.data;
            $scope.userData.events = JSON.parse($scope.userData.events);
        }, (function(res){
            console.log("Error");
            console.log(res);
        }));
    };
    //get user data
    $scope.loginUser = function () {
        $http({
            "url": "http://fitness.dev/api/login",
            "method": "POST",
            "data": $scope.formData
        }).then(function(res) {
            console.log("Auth.signin.success!");
            $scope.userData = res.data;
        }, (function(res){
            console.log("Error");
            console.log(res);
        }));
    }
});