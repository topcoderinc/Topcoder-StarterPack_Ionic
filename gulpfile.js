/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents the gulp file for this ionic application
 *
 * @author TCDEVELOPER
 * @version 1.0
 */
'use strict';

var gulp = require('gulp');
gulp.modules = process.env.ANGULAR_MODULES || "'ionic','ngResource','ya.nouislider', 'ngCordova', 'ngCordovaOauth', 'ngTwitter'";
gulp.paths = {
  src: 'src',
  dist: 'www',
  bower: 'www/lib'
};
var path = require('path');
var sort = require('gulp-sort');
var gulpNgConfig = require('gulp-ng-config');
var bower = require('bower');
var wiredep = require('wiredep').stream;
var sh = require('shelljs');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'del']
});
var paths = gulp.paths;


gulp.task('clean', function (done) {
  $.del([paths.dist + '/'], done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.dist +'/css/'))
    .on('end', done);
});

gulp.task('ng-config', function () {
  gulp.src('config.json')
    .pipe(
      gulpNgConfig('app', {
        wrap: true,
        createModule: false,
        environment: process.env.BUILD_ENV || 'dev'
      }))
    .pipe(gulp.dest(paths.dist+'/js'))
});

gulp.task('menu', function () {
  var menuInjectFiles = gulp.src(paths.src + '/components/**/menu*.html').pipe(sort(
    {
      // sort asc with index number in filename
      comparator: function(file1, file2) {
        var index1 = Number(path.basename(file1.path,'.html').substring(5));
        var index2 = Number(path.basename(file2.path,'.html').substring(5));
        return index1-index2;
      }
    }
  ));
  var menuInjectOptions = {
    starttag: '<!-- inject:menu -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  };
  return gulp.src(paths.src + '/templates/menu.html')
    .pipe($.inject(menuInjectFiles, menuInjectOptions))
    .pipe(gulp.dest(paths.dist + '/templates/'));
});
gulp.task('copy-files', function () {
  gulp.src(paths.src + '/*.html')
    .pipe(gulp.dest(paths.dist));
  gulp.src(paths.src + '/js/*.js')
    .pipe(gulp.dest(paths.dist+ '/js'));
  gulp.src(paths.src + '/img/**')
    .pipe(gulp.dest(paths.dist+ '/img'));
  gulp.src(paths.src + '/css/*.css')
    .pipe(gulp.dest(paths.dist+ '/css'));
  gulp.src(paths.src + '/components/**')
    .pipe(gulp.dest(paths.dist+ '/components'));
});
gulp.task('inject', ['sass', 'ng-config', 'menu','copy-files'], function () {
    gulp.src(paths.dist+ '/js/app.js')
    .pipe($.replace(/'<!--replace modules-->'/g, gulp.modules))
    .pipe(gulp.dest(paths.dist+ '/js'));

  var injectStyles = gulp.src([
    paths.dist + '/{css,components}/**/*.css',
    paths.dist + '/css/*.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.dist + '/{js,components}/**/*.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.dist],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: paths.bower,
    exclude: [/angular\.js/]
  };
  return gulp.src(paths.dist + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default',  ['inject']);
