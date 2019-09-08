/**
 * Created by Administrator on 2016/5/8.
 */
angular.module("route",["diannao.route","pingban.route","shouji.route"])
  .config(function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo:"/"
    })
  })

