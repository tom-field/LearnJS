/**
 * Created by Administrator on 2016/5/19.
 */
angular.module("app",[])
    .controller("myctrl", function ($scope) {
        $scope.shuru=""
    })
.directive("hello", function () {
        return {
            restrict:"AEMC",
            template:"<input type='text' ng-model='shuru'/>"+"{{shuru}}",
            replace:true
        }
    })