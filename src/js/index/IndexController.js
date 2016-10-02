app.controller('IndexController', ['$scope', 'Spotify', 'SpotifyService', function ($scope, Spotify, SS) {
	$scope.randomValue = 3123;

  $scope.loggedIn = SS.isLoggedIn();

	$scope.login = function () {
		Spotify.login();
	};
	console.log('index here wahts up' + $scope.randomValue)
	console.log('Logged in: ' + $scope.loggedIn);
}]);
