/**
 * Created by Administrator on 2016/6/16.
 */
angular.module("firstContrl",[])
    .controller("firstController",["$scope", function ($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
    }])
