App.controller("UserController", function($scope, $http){
    $scope.user = {};
    $scope.userData = [];

    $http({
        type: "GET",
        url: "http://angular.codeforges.com/api/wp-json/wp/v2/posts"
    }).then(function(res) {
        $scope.userData = res.data;
        $scope.user = res.data[0];
    },(function(res){
        console.log("Error");
    }));

    $scope.testRun = function(){
        alert("!!!!!!!!");
    };
});