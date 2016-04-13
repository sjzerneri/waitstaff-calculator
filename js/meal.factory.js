angular.module('tipCalc')
	.factory('meal', function(){

		var meals = [];

		return {
			add: add,
			customerCharges: customerCharges,
			count: count,
			tipTotal: tipTotal,
			avgTipPerMeal: avgTipPerMeal
		};

		function add(price, tax, tip){
			var newMeal = {
				mealPrice: price,
				taxRate: tax,
				tipPercentage: tip
			};

			var meal = angular.extend(newMeal, customerCharges(newMeal));

			meals.push(meal);
			return meal;
		}

		function customerCharges(meal){
 			var subtotal = meal.mealPrice + meal.mealPrice * meal.taxRate / 100;
            var tip = subtotal * meal.tipPercentage / 100
            var total = subtotal + tip
            return {
            	subtotal: subtotal,
            	tip: tip,
            	total: total
            };
		}

		function count(){
			return meals.length;
		}

		function tipTotal(){
			var totalTip = 0;
			meals.forEach(function(meal){
				totalTip += meal.tip;
			});
			return totalTip;
		}

		function avgTipPerMeal(){
			return tipTotal() / count();
		}
	});
