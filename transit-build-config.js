'use strict';

/* transit-build-config */
(function () {
  var include = require('posthtml-include');
  var expressions = require('posthtml-expressions');
  var htmlbeautify = require('posthtml-beautify');
  var cssnano = require('cssnano');
  
  var htmlbeautifyConfig = {
    rules: {
      blankLines: false
    }
  };
  
  var posthtmlProcessors = [
    include(),
    expressions(require('./source/templates/locals')),
    htmlbeautify(htmlbeautifyConfig),
  ];
  
  var htmllint = {
    rules: {
      'indent-width': 2,
      'class-style': 'bem'
    }
  };
  
  var cssnanoConfig = {
    preset: ['default',
      {
        normalizeWhitespace: false,
        convertValues: false,
        cssDeclarationSorter: true,
        discardUnused: true,
        mergeIdents: false,
        minifyFontValues: false,
        minifyGradients: false,
        minifyParams: false,
        minifySelectors: false,
        normalizeUrl: true,
      }
    ]
  };
  
  var postcssProcessors = [
    cssnano(cssnanoConfig)
  ];
  
  var stylelint = {
    failAfterError: false,
    fix: true,
    reporters: [
      {
        formatter: 'string',
        console: true
      }
    ]
  };
  
  module.exports = {
    stylelint: stylelint,
    posthtml: posthtmlProcessors,
    htmllint: htmllint,
    postcss: postcssProcessors
  };
})();
