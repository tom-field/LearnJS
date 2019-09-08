var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/PageTab");

    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "pageTab.html"
        })
        .state("PageTab.Page1", {
            url:"/Page1",
            templateUrl: "page1.html"
        })
        .state("PageTab.Page2", {
            url:"/Page2",
            templateUrl: "page2.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "page3.html"
        });
});