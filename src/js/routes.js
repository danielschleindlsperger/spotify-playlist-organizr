const templateDir = '/dist/templates/';

app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: `${templateDir}index.htm`,
			controller: 'IndexController',
			controllerAs: 'index'
		})
		.otherwise({
			templateUrl: `${templateDir}error.htm`
		});
});
