app.controller('NavController', ['$scope', '$location', '$mdSidenav', function ($scope, $location, $mdSidenav) {

	$scope.toggleLeftMenu = function () {
		$mdSidenav('left').toggle();
	};

	$scope.changeView = function (view) {
    $location.path(view);
    $mdSidenav('left').close();
	};
}]);
