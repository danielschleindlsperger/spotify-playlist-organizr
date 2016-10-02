app.factory('SpotifyService', ['Spotify', function (Spotify) {
	return {
		isLoggedIn: function () {
			let token = localStorage.getItem('spotify-token');
			let expires = localStorage.getItem('spotify-token-expires');
			return (token && (expires > Date.now()));
		},
		user: function () {
			return Spotify.getCurrentUser();
		}
	};
}]);
