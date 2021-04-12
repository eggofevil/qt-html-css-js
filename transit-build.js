'use strict';

/* transit-build */
(function () {
  var gulp = require('gulp');
  var utils = require('./utils');
  var config = require('./transit-build-config');
  var posthtml = require('gulp-posthtml');
  var htmllint = require('gulp-htmllint');
  var less = require('gulp-less');
  var postcss = require('gulp-postcss');
  var jsbeautify = require('gulp-jsbeautifier');
  var stylelint = require('gulp-stylelint');
  var imagemin = require('gulp-imagemin');
  
  function cleanFilesInTransit() {
    return utils.cleanFiles('transit/**', '!transit');
  }

  function copyFilesToTransit() {
    return utils.copyFiles('transit', ['source/**', '!source/*.html', '!source/css/*.less', '!source/img/**', '!source/templates/**']);
  }
  
  function processHtml() {
    return gulp.src('source/index.html')
      .pipe(posthtml(config.posthtml))
      .pipe(htmllint(config.htmllint))
      .pipe(gulp.dest('transit'));
  }

  function processCss() {
    return gulp.src('source/css/style.less')
      .pipe(less())
      .pipe(postcss(config.postcss))
      .pipe(jsbeautify())
      .pipe(stylelint(config.stylelint))
      .pipe(gulp.dest('transit/css'));
  }
  
  function processImg() {
    return gulp.src('source/img/**')
      .pipe(imagemin())
      .pipe(gulp.dest('transit/img'));
  }

  module.exports = gulp.series(gulp.parallel(utils.cleanConsole, cleanFilesInTransit), gulp.parallel(copyFilesToTransit, processHtml, processCss, processImg));
})();
