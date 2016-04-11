angular.module('tipCalc', ['ngAnimate', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html'
        }).when('/new-meal', {
            templateUrl: 'new-meal.html',
            controller: 'mainController'
        }).when('/my-earnings', {
            templateUrl: 'my-earnings.html',
            controller: 'earningsCtrl'
        })
    })
    .controller('mainController', function ($rootScope, $scope) {

        $scope.data = {};

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

                $rootScope.sharedData = {
                    mealCount: mealCount,
                    tipTotal: tipTotal
                }

                $rootScope.meals.push({
                    subtotal: subtotal,
                    tip: tip
                })
            }
        }
    })
    .controller('earningsCtrl', function ($rootScope, $scope) {
        $scope.tipTotal = 0;
        $scope.mealCount = $rootScope.meals.length;

        $rootScope.meals.forEach(function (meal) {
            $scope.tipTotal += meal.tip;
        })

        $scope.avgTipEarnings = $scope.tipTotal / $scope.mealCount;
    })
    .run(function ($rootScope, $location, $timeout) {
        $rootScope.meals = [];
        $rootScope.$on('$routeChangeError', function () {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $rootScope.isLoading = false;
            }, 1000);
        });
    });
