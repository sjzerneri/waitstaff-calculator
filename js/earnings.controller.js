angular.module('tipCalc')
	.controller('earningsCtrl', function ($scope, meal) {
        $scope.tipTotal = meal.tipTotal();
        $scope.mealCount = meal.count();
        $scope.avgTipEarnings = $scope.tipTotal / $scope.mealCount;
    });
