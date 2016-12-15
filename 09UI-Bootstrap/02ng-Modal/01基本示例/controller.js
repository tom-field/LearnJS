angular.module('myApp',['ui.bootstrap']).controller('modalDemo',function($scope,$modal,$log){ //
    $scope.items = ['html5','jq','FE-��ʾƽ̨'];
    $scope.open = function(size){  //��ģ̬
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',  //ָ�����洴������ͼ
            controller : 'ModalInstanceCtrl',// ��ʼ��ģ̬��Χ
            size : size, //��С����
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
angular.module('myApp').controller('ModalInstanceCtrl',function($scope,$modalInstance,itemsss,hahahah){ //������modalInstance
    $scope.items = itemsss;
    console.log(hahahah);
    $scope.selected = {
        item : $scope.items[0]
    };
    $scope.ok = function(){
        $modalInstance.close($scope.selected.item); //�رղ����ص�ǰѡ��
    };
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel'); // �˳�
    }
})
