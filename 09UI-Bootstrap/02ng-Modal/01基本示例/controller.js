angular.module('myApp',['ui.bootstrap']).controller('modalDemo',function($scope,$modal,$log){ //
    $scope.items = ['html5','jq','FE-演示平台'];
    $scope.open = function(size){  //打开模态
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',  //指向上面创建的视图
            controller : 'ModalInstanceCtrl',// 初始化模态范围
            size : size, //大小配置
            resolve : {
                itemsss : function(){
                    return $scope.items;
                },
                hahahah: function () {
                    return {'name':'xuhui'}
                }
            }
        })
        modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
        },function(){
            $log.info('Modal dismissed at: ' + new Date())
        })
    }
})
angular.module('myApp').controller('ModalInstanceCtrl',function($scope,$modalInstance,itemsss,hahahah){ //依赖于modalInstance
    $scope.items = itemsss;
    console.log(hahahah);
    $scope.selected = {
        item : $scope.items[0]
    };
    $scope.ok = function(){
        $modalInstance.close($scope.selected.item); //关闭并返回当前选项
    };
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel'); // 退出
    }
})
