

var guessApp = angular.module('guessApp', ['ngRoute']);

guessApp.config(['$routeProvider',

	function($routeProvider) {

		$routeProvider.
		when('/', {
			templateUrl: 'view.html',
			controller: 'viewCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

guessApp.controller('mainCtrl', function($scope, $http, $routeParams, $timeout){
	$scope.expense = {};
	$scope.result = {display: false};
	$scope.name = $routeParams.name;
	$scope.expense.name = $scope.name;

	var newDate = new Date();
	$scope.expense.day = newDate.getDate();
	$scope.expense.month = newDate.getMonth() + 1;
	$scope.expense.year = newDate.getFullYear();

	$scope.closeAlert = function() {
		$scope.result.display = false;
	};

	$scope.clean = function() {
		$scope.result.display = false;
	};

	$scope.save = function() {
		$scope.expense.datePaid = $scope.expense.year + "-" + $scope.expense.month + "-" + $scope.expense.day + " 12:00:00";

		$http.post('/api/expense', $scope.expense).success(function(data) {
			delete $scope.expense.price;
			$scope.result.display = true;
			$scope.result.success = true;
			$scope.result.message = data.message;
			$('#expenseInput').focus();
			$timeout(function() {$scope.closeAlert();}, alertTimeout);

		}).error(function(data) {
			$scope.result.display = true;
			$scope.result.success = false;
			$scope.result.message = data.message;
		});
	};
});

guessApp.controller('viewCtrl', function($scope, $http, $routeParams, $timeout){
	$scope.rightNumber = 3.23;
	console.log($scope.rightNumber);

	$scope.number = 0;
	$scope.result = "";
	$scope.showHint = false;

	$scope.check = function(number) {

		if(number < $scope.rightNumber) {
			$scope.result = "Število " + number + " je premajhno :(";

		} else if(number > $scope.rightNumber) {
			$scope.result = "Število " + number + " je preveliko :(";

		} else {
			$scope.result = "To je to ;) Preberi kaj piše spodaj.";
			$scope.showHint = true;
		}
	};
});