'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var gutil = require("gulp-util");
var webpack = require("webpack");


gulp.task('iui.js', function () {
    return gulp.src('./src/js/iui.js')
        //.pipe(sourcemaps.init())
        .pipe(gulp.dest('dist'))
        .pipe(plugins.babel({
            presets: ['latest']
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rename("iui.min.js"))
        //.pipe(sourcemaps.write('../maps/less'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
    //gulp.start('build');
    // appConfig.domain=appConfig.productionDomain;
    gulp.start('iui.js');
});

gulp.task('sass', function () {
    return gulp.src([`./src/css/*.scss`])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compact'}).on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(`./src/css`));
});

gulp.task('babel', () => {
    return gulp.src('./src/js/iui.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['latest']
        }))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task("watch:dev", ['babel'], function(){
    gulp.watch([`./src/css/**/*.scss`], ['babel']);
    gulp.watch([`./src/js/**/*.js`], ['babel']);

});



gulp.task("iui:dev", function(callback) {

    // run webpack
    var webpackConfig=require('./webpack.config.dev.js');

    webpack( webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        //gutil.log("[webpack]", "Gonna sit around and watch for file changes. CTRL^C to kill me");
        //callback();
    });
});

gulp.task("iui.v2", function(callback) {

    var webpackConfig=require('./webpack.config.js');
    return gulp.src('./entry.js')
        .pipe(webpackStream( webpackConfig ))
        .pipe(gulp.dest('hb.jsv2/'))
        .pipe(plugins.rename("hb.min.js"))
        .pipe(gulp.dest('hb.jsv2/dist'))
        ;
});

