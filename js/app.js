var app = angular.module('tipCalc', ['ngAnimate'])


.controller('waitstaffController', function ($scope, $rootScope) {

    var mealcount = 0;

    $scope.submit = function () {
        $scope.submitted = true;
        if ($scope.mealDetailForm.$valid) {
            var subtotal, tip, total;

            subtotal = $scope.input.mealPrice + $scope.input.mealPrice * $scope.input.taxRate / 100;
            tip = subtotal * $scope.input.tipPercentage / 100
            total = subtotal + tip
            mealcount += 1;

            $scope.data = {
                subtotal: subtotal,
                tip: tip,
                total: total,
                mealcount: mealcount
            }
            console.log($scope.data.mealcount);
        }
    };

});
