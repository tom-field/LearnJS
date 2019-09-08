var app = angular.module('app', []);

    app.controller('ctrl', function ($scope, $location, $rootScope) {  
    }) 
    app.directive("parentDirective", function () {  
    return {  
        restrict: 'A',  
        require: ['form'],  
        controller: function () {  
            // nothing here  
        },  
        link: function (scope, ele, attrs, controllers) {  
            var formCtrl = controllers[0];  
        }  
    };  
    }).directive('input', function () {  
    return {  
        restrict: 'E',  
        priority: -1000,  
        require: ['^?parentDirective', '^?angularValidator'],  
        link: function (scope, elm, attr, ctrl) {  
            if (!ctrl) {  
                return;  
            }  
  
            elm.on('focus', function () {  
                elm.addClass('apply-focus');  
  
                scope.$apply(function () {  
                    ctrl.hasFocus = true;  
                });  
            });  
  
            elm.on('blur', function () {  
                elm.removeClass('apply-focus');  
                elm.addClass('apply-visited');  
  
                scope.$apply(function () {  
                    ctrl.hasFocus = true;  
                    ctrl.hasVisited = true;  
  
                });  
            });  
  
        }  
    };  
});  