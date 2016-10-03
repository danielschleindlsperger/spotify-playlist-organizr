const templateDir = '/dist/templates/';

app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: `${templateDir}index.htm`,
			controller: 'IndexController',
			controllerAs: 'index'
		})
    .when("/playlists", {
			templateUrl: `${templateDir}playlists.htm`,
			controller: 'PlaylistController',
			controllerAs: 'playlist'
		})
    .when("/playlists/:owner_id/:playlist_id", {
			templateUrl: `${templateDir}playlist-detail.htm`,
			controller: 'PlaylistDetailController',
			controllerAs: 'playlist'
		})
		.otherwise({
			templateUrl: `${templateDir}error.htm`
		});
});
