// We use gulp and live reload rather than just webpack
// mostly because I could not work out how to do it with just webpack

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['build-dev']);

gulp.task('build-dev', ['webpack:build-dev'], function() {
  livereload.listen();
  gulp.watch(['app/**/*'], ['webpack:build-dev'], function(){
    gulp.run('webpack:build-dev');
  });
  gulp.watch(['dist/*']).on('change', livereload.changed);
});

// Production build
gulp.task('build', ['webpack:build', 'manifest']);

gulp.task('manifest', function() {
  return gulp
    .src(['app/*', '!app/*.js', '!app/*.css'])
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin());

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', ['manifest'], function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});
