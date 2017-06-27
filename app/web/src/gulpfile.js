'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  concat = require('gulp-concat'),
  concatCss = require('gulp-concat-css'),
  stripCss = require('gulp-strip-css-comments'),
  cssMin = require('gulp-cssmin'),

  autoprefixer = require('gulp-autoprefixer'),
  nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var path = require('path');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');

// Dev task
//gulp.task('dev', ['views', 'styles', 'lint', 'browserify', 'watch'], function() {});
gulp.task('default', ['appjs', 'vendorjs', 'minify-css', 'views'], function () {
});

gulp.task('appjs', function () {
  return gulp.src(['*.module.js','**/*.module.js', '*.*.js', '*.*.*.js', 'components/*.js','components/**/*.js','partials/*.js','partials/**/*.js'])
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(ngAnnotate({add: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({compress: {unsafe: true, hoist_vars: true}}).on('error', gutil.log))
    .pipe(gulp.dest('../static'))
});

gulp.task('vendorjs', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-scroll-animate/dist/angular-scroll-animate.js',
    'node_modules/angular-jwt/dist/angular-jwt.js',
    'node_modules/showdown/dist/showdown.js',
    'node_modules/ng-flow/dist/ng-flow-standalone.js',
    'node_modules/ng-showdown/dist/ng-showdown.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/angular-scroll/angular-scroll.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'libs/angulargrid.js',
    'libs/elastic.js',

    'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js',
    'libs/ne-music.js',
    //'libs/angular-matchheight.js',
    'assets/js/jquery.easing.1.3.js',
    'assets/js/waypoints.min.js',
    'assets/js/bootstrap.min.js',
    'assets/js/retina.min.js',
    //'assets/js/jquery.bxslider.min.js',
    'assets/js/jquery.jcarousel.min.js',
    'assets/js/nivo-lightbox.min.js'

  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify({compress: {hoist_vars: true}}).on('error', gutil.log))
    .pipe(gulp.dest('../static'))
  /*    .pipe(closureCompiler({
   // compilerPath is optional, since google-closure-compiler is a dependency
   // compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
   fileName: '../static/vendor.js',
   compilerFlags: {
   closure_entry_point: 'app.module.js',
   compilation_level: 'ADVANCED_OPTIMIZATIONS',
   define: [
   "goog.DEBUG=false"
   ],

   only_closure_dependencies: true,
   // .call is super important, otherwise Closure Library will not work in strict mode.
   output_wrapper: '(function(){%output%}).call(window);',
   warning_level: 'VERBOSE',
   language_in: "ECMASCRIPT5"

   }
   }))*/
});

gulp.task('minify-css', function () {

  return gulp.src(['assets/css/style.css', 'assets/css/responsive.css', 'assets/css/nivo-lightbox.css', 'assets/css/animate.css'])
    .pipe(concatCss('bundle.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('../static/styles'));
});


// JSLint task
gulp.task('lint', function () {
  gulp.src('/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Views task
gulp.task('views', function () {
  // Get our index.html
  // gulp.src('app/index.html')
  // And put it in the public folder
  // .pipe(gulp.dest('../')); //.pipe(htmlmin({collapseWhitespace: true}))

  // Any other view files from app/views
  gulp.src(['**/*.html', '!index.html'])
  // Will be put in the public/views folder
  // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../static'));
});