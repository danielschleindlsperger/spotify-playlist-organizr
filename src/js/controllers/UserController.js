app.controller('UserController', ['$scope', '$rootScope', 'Spotify', 'SpotifyService', function ($scope, $rootScope, Spotify, SS) {

	$scope.userLoggedIn = SS.isLoggedIn();
	$rootScope.user = {};

	SS.user().then(function (res) {
		$rootScope.user = res;
		$rootScope.$broadcast('userLoggedIn', 'Hooraaay');
	});

	$scope.login = function () {
		Spotify.login();
	};
}]);
