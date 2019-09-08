var app = angular.module('plunker', []);
function createDirective(name){
  return function(){
    return {
      restrict: 'E',
      compile: function(tElem, tAttrs){
        console.log(name + ': compile => ' + tElem.html());
        return {
          pre: function(scope, iElem, iAttrs){
            console.log(name + ': pre link => ' + iElem.html());
          },
          post: function(scope, iElem, iAttrs){
            console.log(name + ': post link => ' + iElem.html());
          }
        }
      }
    }
  }
}
app.directive('levelOne', createDirective('levelOne'));
app.directive('levelTwo', createDirective('levelTwo'));
app.directive('levelThree', createDirective('levelThree'));