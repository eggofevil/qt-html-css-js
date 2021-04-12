'use strict';

/* utils */
(function () {
  var gulp = require('gulp');
  var del = require('del');
  
  function cleanFiles(target, exception) {
    return del([target, exception]);
  }
  function copyFiles(destination, sourcesAndExceptions) {
    return gulp.src(sourcesAndExceptions)
      .pipe(gulp.dest(destination));
  }
  function cleanConsole(done) {
    console.log('\x1Bc');
    done();
  }
  
  module.exports = {
    cleanFiles: cleanFiles,
    copyFiles: copyFiles,
    cleanConsole: cleanConsole
  };
})();
