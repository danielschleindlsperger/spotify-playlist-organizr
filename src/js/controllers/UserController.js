app.controller('UserController', ['$scope', '$rootScope', 'Spotify', 'SpotifyService', function ($scope, $rootScope, Spotify, SS) {

	$scope.userLoggedIn = SS.isLoggedIn();
	$rootScope.user = {};

	SS.user().then(function (res) {
		$rootScope.user = res.data;
		$rootScope.$broadcast('userLoggedIn', 'Hooraaay');
		console.log('user is logged in.')
	});

	$scope.login = function () {
		Spotify.login();
	};
}]);
