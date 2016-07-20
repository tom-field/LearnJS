/**
 * Created by Administrator on 2016/6/19.
 */
var router = angular.module("myrouter",["ui.router"])
router.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/route1")

    $stateProvider
        .state('route1', {
            url: "/route1",
            templateUrl: "./partial1/route1.html"
        })
        .state('route1.list', {
            url: "/list",
            templateUrl: "./partial1/route1.list.html",
            controller: "firstController"
            /*function($scope){
             $scope.items = ["A", "List", "Of", "Items"];
             }*/
        })

        .state('route2', {
            url: "/route2",
            templateUrl: "./partial2/route2.html"
        })
        .state('route2.list', {
            url: "/list",
            templateUrl: "./partial2/route2.list.html",
            controller: "secondController"
            /*function($scope){
             $scope.things = ["A", "Set", "Of", "Things"];
             }*/
        })
})