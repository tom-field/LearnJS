/**
 * Created by Administrator on 2016/6/15.
 */
angular
    .module('DemoApp', ['ui.router', 'ngAnimate'])

    .config(function($stateProvider)
    {
        $stateProvider
            .state('tab1', {
                name: 'tab1',
                url: '/tab1',
                template: '<div class="tab tab1"><p>Caerphilly fromage cheeseburger. Goat fromage frais halloumi melted cheese cheese and biscuits macaroni cheese babybel ricotta. Roquefort croque monsieur babybel fromage frais chalk and cheese bavarian bergkase cream cheese emmental. When the cheese comes out everybody\'s happy camembert de normandie fromage frais ricotta.</p></div>'
            })

            .state('tab2', {
                name: 'tab2',
                url: '/tab2',
                template: '<div class="tab tab2"><p>Airedale hard cheese roquefort. Paneer pepper jack jarlsberg st. agur blue cheese bavarian bergkase macaroni cheese             croque monsieur cauliflower cheese. Bavarian bergkase cheesy grin port-salut taleggio stinking bishop cheese and biscuits rubber cheese blue   castello. Everyone loves.</p></div>'
            })

            .state('tab3', {
                name: 'tab3',
                url: '/tab3',
                template: '<div class="tab tab3"><p>Cheese and biscuits stinking bishop jarlsberg. Boursin melted cheese emmental cheeseburger cheese slices mozzarella cream cheese say cheese. Macaroni cheese fondue mozzarella cheese strings cheese triangles when the cheese comes out everybody\'s happy cheese on toast croque monsieur. Stinking bishop rubber cheese when the cheese comes out everybody\'s happy paneer cheesy feet.</p></div>'
            })

            .state('tab4', {
                name: 'tab4',
                url: '/tab4',
                template: '<div class="tab tab4"><p>Bocconcini hard cheese stinking bishop. Cheesecake gouda cheese and biscuits red leicester airedale cheeseburger say cheese pecorino. St. agur blue cheese cheese triangles emmental pecorino monterey jack cut the cheese emmental cheese slices. Manchego cow cheeseburger airedale who moved my cheese cottage cheese airedale feta. Parmesan.</p></div>'
            });
    })

    .controller('DemoController', function( $scope, $window, $state )
    {
        $scope.transition = 'slide-left';
        $scope.tabs = ['tab1', 'tab2', 'tab3', 'tab4'];
        $scope.currentIndex = -1;
        $scope.maxIndex = $scope.tabs.length;
        $scope.left = false;

        next();

        function next()
        {
            $scope.currentIndex = $scope.currentIndex+1 < $scope.maxIndex ? $scope.currentIndex+1 : 0;
            var name = $scope.tabs[$scope.currentIndex];
            $state.go( name );
        }

        $scope.left = function()
        {
            $scope.transition = 'slide-left';
            next();
        }

        $scope.right = function()
        {
            $scope.transition = 'slide-right';
            next();
        }

        $scope.top = function()
        {
            $scope.transition = 'slide-top';
            next();
        }

        $scope.bottom = function()
        {
            $scope.transition = 'slide-bottom';
            next();
        }
    })
;