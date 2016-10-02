app.controller('PlaylistController', ['$scope', '$rootScope', 'Spotify', 'SpotifyService', function ($scope, $rootScope, Spotify, SS) {

	$scope.playlists = [];
	$scope.playlistsLoaded = false;

	// only get playlists if user is logged in, otherwise wait for log in event
	if ($rootScope.user.id) {
		getAllPlaylists(0);
	}
	$scope.$on('userLoggedIn', function (event, payload) {
		if ($rootScope.user.id && !$scope.playlistsLoaded) {
			getAllPlaylists(0);
		}
	});

	function getAllPlaylists(offset) {
		Spotify.getUserPlaylists($rootScope.user.id, {
			limit: 50,
			offset: offset
		}).then(function (res) {

			$scope.playlists = _.concat($scope.playlists, res.items);
			let length = res.items.length;
			if (length >= 50) {
				getAllPlaylists(offset + 50);
			} else {
				$scope.playlistsLoaded = true;
			}
			console.log($scope.playlists);
		});
	}

}]);
