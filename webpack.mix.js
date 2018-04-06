let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var jsFiles = [
  'resources/assets/js/app/config.js',
  'resources/assets/js/app/*.js',
  'resources/assets/js/app/modules/**/*.module.js',
  'resources/assets/js/app/modules/**/*.config.js',
  'resources/assets/js/app/modules/**/*.routes.js',
  'resources/assets/js/app/modules/**/filter/*.js',
  'resources/assets/js/app/modules/**/components/*.js',
  'resources/assets/js/app/modules/**/services/*.js',
  'resources/assets/js/app/modules/**/controller/*.js',
  'resources/assets/js/app/modules/**/templates/*.js'
];

var jsVendor = [
  'api-check',
  'angular',
  'angular-gettext',
  '@uirouter/angularjs',
  '@fortawesome/fontawesome',
  'angular-formly',
  'ambersive-dbsrv'
];

mix.js('resources/assets/js/app.js', 'public/js')
   .extract(jsVendor).sass('resources/assets/sass/app.scss', 'public/css');

mix.scripts(jsFiles, 'public/js/app.js');
