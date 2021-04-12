'use strict';

/* observer */
(function () {
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
      
  function createServer() {
    browserSync({
      server: {
        baseDir: 'transit'
      }
    });
  }
  
  function reloadBrowsers() {
    return browserSync.reload();
  }
  
  function observeChanges() {
    gulp.watch('source/**').on('change', gulp.series(require('./transit-build'), reloadBrowsers));
  }
  
  module.exports = function () {
    createServer();
    observeChanges();
  };
})();
