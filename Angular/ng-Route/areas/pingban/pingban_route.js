/**
 * Created by Administrator on 2016/5/8.
 */
angular.module("pingban.route",["ngRoute","pingban.controller"])
.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/pingban",{
      controller:"pingban.controller",
      templateUrl:"areas/pingban/pingban.html"
    })
}])
