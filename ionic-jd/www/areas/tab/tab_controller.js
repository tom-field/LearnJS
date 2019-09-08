// 引导页的逻辑
angular.module('tab.controller', [])
  .controller('TabCtrl', function($scope,IndexdbJs) {

    $scope.obj_cartCount={
      count:""
    }

    $scope.$on('$ionicView.beforeEnter', function (e) {
      IndexdbJs.getAll("cart",function(data){
        if(data.length>0)
        {
          $scope.obj_cartCount.count="0";
          for(var i =0;i<data.length;i++){
            $scope.obj_cartCount.count=parseInt($scope.obj_cartCount.count)+parseInt(data[i].number);
          }
        }
      },null)
    });




  })
