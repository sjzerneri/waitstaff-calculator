var app = angular.module('tipCalc', ['ngAnimate'])


.controller('waitstaffController', function ($scope, $rootScope) {

    var mealCount, tipTotal, avgTipPerMeal;

    mealCount = 0
    tipTotal = 0
    avgTipPerMeal = 0;

    $scope.submit = function () {
        $scope.submitted = true;
        if ($scope.mealDetailForm.$valid) {
            var subtotal, tip, total;

            subtotal = $scope.input.mealPrice + $scope.input.mealPrice * $scope.input.taxRate / 100;
            tip = subtotal * $scope.input.tipPercentage / 100
            total = subtotal + tip
            mealCount += 1
            tipTotal += tip
            avgTipPerMeal = tipTotal / mealCount;

            $scope.data = {
                subtotal: subtotal,
                tip: tip,
                total: total,
                mealCount: mealCount,
                tipTotal: tipTotal,
                avgTipPerMeal: avgTipPerMeal
            }
            console.log($scope.data.mealcount);
        }
    };

});
