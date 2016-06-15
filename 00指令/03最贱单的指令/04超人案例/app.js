angular.module("app",[])
.directive("superman", function () {
        return {
            scope:{},
            restrict:"AE",
            controller: function ($scope) {
                $scope.ablities=[];
                this.addStrength= function () {
                    $scope.ablities.push("addStrength");
                }
                this.addSpeed= function () {
                    $scope.ablities.push("addSpeed");
                }
                this.addLight= function () {
                    $scope.ablities.push("addLight");
                }
            },
            link: function (scope,ele,attr) {
                ele.addClass("btn");
                ele.bind(mouseover, function () {
                    console.log(scope.ablities);
                })
            }
        }
    })
.directive("addStrength", function () {
        return{
            require:"^superman",
            link: function (scope,ele,attr,supermanctrl) {
                supermanctrl.addStrength()
                ele.on(mouseover, function () {
                    console.log(scope.ablities);
                })
            }
        }
    })