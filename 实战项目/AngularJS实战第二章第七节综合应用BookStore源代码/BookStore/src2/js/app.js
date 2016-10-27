/**
 * Created by Administrator on 2016/8/9.
 */
var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'BookListModule', 'BookDetailModule']);
routerApp.run(function ($rootscope,$state,$stateParams) {
    console.log($state);
    console.log($stateParams);
});
routerApp.config(function ($stateProvider,$urlRouterProvider) {
    console.log($stateProvider);
    console.log($urlRouterProvider);
    
    //设置路由
    $stateProvider.state()
})