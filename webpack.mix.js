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
  'angular-formly',
  'angular-formly-templates-bootstrap',
  'angular-storage',
  'angular-sanitize'
];

mix.js('resources/assets/js/app.js', 'public/js')
   .extract(jsVendor).sass('resources/assets/sass/app.scss', 'public/css').sourceMaps();;

mix.scripts(jsFiles, 'public/js/app.js').sourceMaps();

mix.copyDirectory('resources/assets/images', 'public/img');

mix.copyDirectory('resources/assets/vendor/fontawesome/web-fonts-with-css/webfonts', 'public/webfonts');

if (mix.inProduction()) {
    mix.version();
}
