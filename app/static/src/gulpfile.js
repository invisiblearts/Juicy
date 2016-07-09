'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  refresh = require('gulp-livereload'),
  nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var templates = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var path = require('path');
var paths = gulp.paths;
var babel = require('gulp-babel');
var $ = require('gulp-load-plugins')();
var cleanCSS = require('gulp-clean-css');


// Dev task
//gulp.task('dev', ['views', 'styles', 'lint', 'browserify', 'watch'], function() {});
gulp.task('dev', ['appjs','vendorjs','minify-css','views'], function() {});

gulp.task('appjs', function () {
  return gulp.src(['app/*.module.js','app/*.js','app/**/*.module.js','app/**/*.js'])
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(ngAnnotate({add: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('../'))
});

gulp.task('vendorjs', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/materialize-css/dist/js/materialize.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-jwt/dist/angular-jwt.js',
    'node_modules/showdown/dist/showdown.js',
    'node_modules/ng-flow/dist/ng-flow-standalone.js',
    'node_modules/ng-showdown/dist/ng-showdown.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/angular-scroll/angular-scroll.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'libs/angulargrid.js',
    'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js',
    'libs/angular-materialize.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('../'))
});

gulp.task('minify-css', function() {
  return gulp.src(['app/styles/*.css','node_modules/materialize-css/dist/css/materialize.min.css','node_modules/angular-materialize/css/style.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('../styles'));
});

// JSLint task
gulp.task('lint', function() {
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
 // gulp.src('app/index.html')
  // And put it in the public folder
   // .pipe(gulp.dest('../')); //.pipe(htmlmin({collapseWhitespace: true}))

  // Any other view files from app/views
  gulp.src(['app/**/*.html','!app/index.html'])
  // Will be put in the public/views folder
    .pipe(gulp.dest('../'));
});

gulp.task('watch', ['serve', 'lint'], function() {
  // Start live reload server
  refresh.listen();

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['app/**/*.js', 'app/*.js'],[
    'lint',
    'browserify'
  ]);

  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss','app/styles/**/*.css'], [
    'styles'
  ]);

  // Watch view files
  gulp.watch(['app/**/*.html'], [
    'views'
  ]);

  gulp.watch('./public/**').on('change', refresh.changed);

});

gulp.task('default', ['dev']);