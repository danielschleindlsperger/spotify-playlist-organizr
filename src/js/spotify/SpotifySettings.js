app.config(function (SpotifyProvider) {
	SpotifyProvider.setClientId('b1e615f3f904451aafac5255490cc6f3');
	SpotifyProvider.setRedirectUri('http://localhost:3000/callback.html');
	SpotifyProvider.setScope('user-read-private user-read-email user-library-read playlist-read-private user-top-read');
	let expires = localStorage.getItem('spotify-token-expires');
	if (expires > Date.now()) {
		SpotifyProvider.setAuthToken(localStorage.getItem('spotify-token'));
	}
});
