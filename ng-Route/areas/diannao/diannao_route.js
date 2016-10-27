/**
 * Created by Administrator on 2016/5/8.
 */
angular.module("diannao.route",["diannao.controller","ngRoute"])
.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/",{
      controller:"diannao.controller",
      templateUrl:"areas/diannao/diannao.html"
    })
}])
