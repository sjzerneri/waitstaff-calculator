angular.module('tipCalc')
	.controller('mainController', function ($scope, meal) {

        $scope.data = {};

        var mealCount, tipTotal, avgTipPerMeal;

        mealCount = 0
        tipTotal = 0
        avgTipPerMeal = 0;

        $scope.submit = function () {

            $scope.submitted = true;

            if ($scope.mealDetailForm.$valid) {

            	var mealDetails = meal.add($scope.input.mealPrice, $scope.input.taxRate, $scope.input.tipPercentage);

                $scope.data = {
                    subtotal: mealDetails.subtotal,
                    tip: mealDetails.tip,
                    total: mealDetails.total
                }
            }
        }
    });
