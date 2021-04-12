'use strict';

/* final-build */
(function () {
  var gulp = require('gulp');
  var utils = require('./utils');
  
  function cleanFilesInBuild() {
    return utils.cleanFiles('build/**', '!build');
  }
  function copyFilesToBuild() {
    return utils.copyFiles('transit/**', 'build', '!transit/css/*.css');
  }
  
  //
  /*
  var finalBuildPostcssProcessors = [
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    cssnano({
      preset: 'default'
    })
  ];

  gulp.task('post-css', function () {
    return gulp.src('transit/css/*.css')
      .pipe(postcss(finalBuildPostcssProcessors))
      .pipe(gulp.dest('build/css'));
  });
  */
  //
  
  module.exports = gulp.series(cleanFilesInBuild, gulp.parallel(copyFilesToBuild, 'post-css'));
})();
