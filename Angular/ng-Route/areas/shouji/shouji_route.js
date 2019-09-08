/**
 * Created by Administrator on 2016/5/8.
 */
angular.module("shouji.route",["ngRoute","shouji.controller"])
.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/shouji",{
      controller:"shouji.controller",
      templateUrl:"areas/shouji/shouji.html"
    })
}])
