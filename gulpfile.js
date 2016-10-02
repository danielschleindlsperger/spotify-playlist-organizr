let elixir = require('laravel-elixir');

elixir.config.assetsPath = './src';
elixir.config.publicPath = '';
elixir.config.css.outputFolder = 'dist/css';
elixir.config.js.outputFolder = 'dist/js';

elixir(function (mix) {
	// app.js
	mix.scriptsIn('src/js')
		// vendor files
		.combine([
			'./node_modules/angular/angular.min.js',
			'./node_modules/angular-route/angular-route.min.js',
			'./node_modules/angular-spotify/dist/angular-spotify.min.js',
			'./node_modules/angular-aria/angular-aria.min.js',
			'./node_modules/angular-animate/angular-animate.min.js',
			'./node_modules/angular-material/angular-material.min.js',
			'./node_modules/lodash/lodash.min.js',
		], 'dist/js/vendor.js');


	// custom styles
	mix.sass('src/styles/app.scss', 'dist/css/app.css');

	// vendor styles
	mix.styles([
		'node_modules/angular-material/angular-material.min.css',
	], 'dist/css/vendor.css');

	// copy templates
	mix.copy('src/templates', 'dist/templates');

	// copy images
	mix.copy('src/img', 'dist/img');

	mix.browserSync({
		proxy: false,
		server: {
			baseDir: './'
		}
	});
});
