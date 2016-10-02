let elixir = require('laravel-elixir');

elixir.config.assetsPath = './src';
elixir.config.publicPath = '';
elixir.config.css.outputFolder = 'dist/css';
elixir.config.js.outputFolder = 'dist/js';

elixir(function (mix) {
	// app.js
	mix.scriptsIn('./src/js')
		// vendor files
		.combine([
			'./node_modules/angular/angular.min.js',
			'./node_modules/angular-route/angular-route.min.js',
		], './dist/js/vendor.js');

	mix.sass('./src/styles/app.scss', './dist/css/app.css');

  mix.copy('./src/templates', './dist/templates');

	mix.browserSync({
		proxy: false,
		server: {
			baseDir: './'
		}
	});
});
