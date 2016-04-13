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
