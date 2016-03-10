var app = angular.module('tipCalc', ['ngAnimate'])

app.constant('VERSION', "1")
app.run(function (VERSION, $rootScope) {
    $rootScope.version = VERSION;

    var initialContent = {
        total: 0,
        meals: 0,
        average: 0
    };

    var init = function () {
        $rootScope.earnings = angular.copy(initialContent);
    };

    init();
})

.controller('formCtrl', function ($scope, $rootScope) {

    $scope.submit = function () {
        $scope.submitted = true;
        if ($scope.mealDetailForm.$valid) {
            var subtotal, tip;

            subtotal = $scope.input.mealPrice + $scope.input.mealPrice * $scope.input.taxRate / 100;
            tip = subtotal * $scope.input.tipPercentage / 100

            data = {
                subtotal: subtotal,
                tip: tip
            }

            console.log(
                data.subtotal,
                data.tip);

            $rootScope.$broadcast('displayContent', data);

            init();
        }
    };

    var init = function () {
        $scope.submitted = false;
        $scope.input = {
            "mealPrice": "",
            "tipPercentage": "",
            "taxRate": ""
        }
    };

    $scope.cancel = function () {
        $scope.mealPrice = "";
        $scope.taxRate = "";
        $scope.tipPercentage = "";
    };

    init();
})

.controller('displayCtrl', function ($scope, $rootScope) {
    var initialContent = {
        subtotal: 0,
        tip: 0,
        total: 0
    };

    var init = function () {
        $scope.data = angular.copy(initialContent);
    };

    $scope.$on('displayContent', function (event, data) {
        $scope.data.subtotal = data.subtotal;
        $scope.data.tip = data.tip;
        $scope.data.total = data.subtotal + data.tip;
        $rootScope.earnings.meals += 1;
        $rootScope.earnings.total += data.tip;
        $rootScope.earnings.average = $rootScope.earnings.total / $rootScope.earnings.meals;
    });

    init();


})

.controller('reset', function ($scope, $rootScope) {
    $scope.reloadPage = function () {
        console.log("reload");
        window.location.reload();
    }
});
