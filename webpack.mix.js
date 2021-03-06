let mix               = require('laravel-mix');
let webfontsGenerator = require('webfonts-generator');
let path              = require('path');

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
  'resources/assets/js/app/variables.js',
  'resources/assets/js/app/*.js',
  'resources/assets/js/app/modules/**/*.module.js',
  'resources/assets/js/app/modules/**/*.config.js',
  'resources/assets/js/app/modules/**/*.routes.js',
  'resources/assets/js/app/modules/**/filter/*.js',
  'resources/assets/js/app/modules/**/components/*.js',
  'resources/assets/js/app/modules/**/services/*.js',
  'resources/assets/js/app/modules/**/controller/*.js',
  'resources/assets/js/app/modules/**/templates/*.js',
  'resources/assets/vendor/extra/*.js'
];

var i        = 0;
var files    = [];

var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

var icons = [
  {
    name:         'icons-standard',
    filePath:     'resources/assets/images/icons/standard/',
    dest:         'public/webfonts/',
    cssDest:      path.join(__dirname,'resources/assets/sass/components/icons-standard.scss'),
    template:     {
                    classPrefix:  'log-icon-',
                    baseSelector: '.log-icon'
                  }
  },
  {
    name:         'icons-avatar',
    filePath:     'resources/assets/images/avatars/',
    dest:         'public/webfonts/',
    cssDest:      path.join(__dirname,'resources/assets/sass/components/icons-avatar.scss'),
    template:     {
                    classPrefix:  'log-avatar-',
                    baseSelector: '.log-avatar'
                  }
  }
];

// Fonts

for(i = 0; i < icons.length; i++)
   {

     files = walkSync(icons[i].filePath);

     files = files.map(function(item)
     {
        item = icons[i].filePath + item;
        return item;
     });

     if(webfontsGenerator === undefined)
       {
       continue;
       }

     webfontsGenerator({
       fontName:     icons[i].name,
       files:        files,
       dest:         icons[i].dest,
       cssDest:      icons[i].cssDest,
       cssFontsUrl: '../../../public/webfonts',
       cssTemplate:  path.join(__dirname,'resources/assets/hbs/icons.hbs'),
       templateOptions:  Object.assign({
          'css':'resources/assets/sass/components/icons.scss'
       },icons[i].template),
       types: ['ttf', 'woff', 'woff2', 'eot', 'svg']
     }, function(error) {

       if (error) {
         console.log('Fail!', error);
       } else {
         console.log('Done!');
       }
     });
   }

mix.js('resources/assets/js/app.js', 'public/js');

mix.sass('resources/assets/sass/app.scss', 'public/css').sourceMaps();

mix.scripts(jsFiles, 'public/js/application.js').sourceMaps();

mix.copyDirectory('resources/assets/images', 'public/img');

if (mix.inProduction()) {
    mix.version();
}
