// 商品列表功能
angular.module('goodsList.controller', ['goodsList.service'])
  .controller('GoodsListCtrl', function ($scope, $window, GoodsListFty, $stateParams,$ionicLoading,$ionicHistory) {

    $scope.$on('$ionicView.beforeEnter', function (e) {
      $scope.func_refreshGoodsList();
    });

    // 商品列表数据
    $scope.obj_goodsListData =[];
    $scope.pms_isMoreItemsAvailable=true;
    // 分页查询对象
    $scope.obj_pagingInfo = {
      amountMax: "",
      amountMin: "",
      billNum: "",
      createUser: "",
      dateFrom: "",
      dateTo: "",
      deptID: "",
      deptName: "",
      keyWord: "",
      loginName: "",
      billType: "",
      pageNum: 1,
      pageSize: 10,
      sortFlag: "0",
      sortType: "desc",
      typeNumber:""
    };


    // 刷新获取最新的数据
    $scope.func_refreshGoodsList = function () {

      $scope.obj_pagingInfo.pageNum=1;
      $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
      var message=JSON.stringify($scope.obj_pagingInfo.pageNum)

      var promise = GoodsListFty.refreshGoodsList(message);
      promise.then(
        function (result) {
          if(result!=null){
            $scope.obj_goodsListData = result;
            $scope.pms_isMoreItemsAvailable=true;
          }else{
            $scope.pms_isMoreItemsAvailable=false;
          }

        },
        function (reason) {
          alert(reason);
        }
      ).finally(function () {
        // 停止广播ion-refresher
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    // 获取更多数据列表
    $scope.func_loadMoreGoodsList=function(){
      $ionicLoading.show({
        template: "正在载入数据，请稍后..."
      });
      $scope.obj_pagingInfo.pageNum=$scope.obj_pagingInfo.pageNum+1;
      $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
      var message=JSON.stringify($scope.obj_pagingInfo)

      var promise = GoodsListFty.loadMoreGoodsList(message);
      promise.then(
        function (result) {

          if($scope.obj_pagingInfo.pageNum==4){
            $scope.pms_isMoreItemsAvailable=false;
          }

          if(result!=null){
            $.each(result,function(i,item){
              $scope.obj_goodsListData.push(item);
            });
          }else{
            $scope.pms_isMoreItemsAvailable=false;
          }
        },
        function (reason) {
          alert(reason);
        }
      ).finally(function () {
        // 停止广播infiniteScroll
        $scope.$broadcast('scroll.infiniteScrollComplete');
        setTimeout(function(){
          $ionicLoading.hide();
        },1000)
      });
    }

    // 返回前一个页面
    $scope.goBack=function(){
      $ionicHistory.goBack();
    }

  })




