angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size,modal) {
        if(!size){
            size="";
        }
        if(modal=="firstModal"){
            var firstModal = $uibModal.open({
                animation: $scope.animationsEnabled,
                /*Ä£Ì¬¿ò±³¾°*/
                backdrop:false,
                templateUrl: 'firstModal.html',
                /*??????????????????????????*/
                bindToController:true,
                controller: 'firstModal',
                windowClass:"firstModal",
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            firstModal.opened.then(function (i) {
                console.log(i)
                $log.info("opened");
            })
            firstModal.rendered.then(function () {
                $log.info('rendered');
            })
            firstModal.closed.then(function () {
                $log.info("closed");
            })
            firstModal.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                $log.info("result")
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        if(modal=="secondModal"){
            var secondModal = $uibModal.open({
                animation: $scope.animationsEnabled,
                /*Ä£Ì¬¿ò±³¾°*/
                backdrop:false,
                templateUrl: 'secondModal.html',
                /*??????????????????????????*/
                bindToController:true,
                controller: 'secondModal',
                windowClass:"secondModal",
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            secondModal.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        if(modal=="threeModal"){
            var threeModal = $uibModal.open({
                animation: $scope.animationsEnabled,
                /*Ä£Ì¬¿ò±³¾°*/
                backdrop:false,
                templateUrl: 'threeModal.html',
                /*??????????????????????????*/
                bindToController:true,
                controller: 'threeModal',
                windowClass:"threeModal",
                size: size
            });

            threeModal.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ui.bootstrap.demo').controller('firstModal', function ($scope, $uibModalInstance, items) {
    $scope.items = [1,2,3];
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
angular.module('ui.bootstrap.demo').controller('secondModal', function ($scope, $uibModalInstance, items) {
    $scope.items = [4,5,6];
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
angular.module('ui.bootstrap.demo').controller('threeModal', function ($scope, $uibModalInstance, items) {
    $scope.items = [7,8,9];
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
