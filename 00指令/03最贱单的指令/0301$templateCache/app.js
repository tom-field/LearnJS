/**
 * Created by Administrator on 2016/5/19.
 */
angular.module("app",[])
    .run(function ($templateCache) {
        //$templateCache.put("a","<div>hello every body</div>")
        //$templateCache.put("a","hello.html")不能这样用
    })
.directive("hello", function ($templateCache) {
        return {
            restrict:"AEMC",
            template:$templateCache.get("a"),
            replace:true
        }
    })