/**
 * Created by Administrator on 2016/5/19.
 */
angular.module("app",[])
    .controller("app1", function ($scope) {
        $scope.load1= function () {
            alert("app1控制器")
        }
    })
    .controller("app2", function ($scope) {
    $scope.load2= function () {
        alert("app2控制器")
    }
})
    .directive("mydir", function () {
        return {
            replace:false,
            transclude:true,
            template:"template"+"<div ng-transclude></div>",
            restrict:"AE",
            link: function (scope,ele,attr) {
                ele.bind("mouseenter", function () {
                    scope.$apply(attr.nghello())
                })
            }
        }
    })