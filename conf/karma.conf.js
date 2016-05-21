const conf = require('./gulp.conf');
const listFiles = require('./karma-files.conf');

module.exports = function (config) {
  const configuration = {
    browsers: [
      'PhantomJS'
    ],
    basePath: '../',
    singleRun: true,
    autoWatch: false,
    logLevel: 'INFO',
    junitReporter: {
      outputDir: 'test-reports'
    },
    frameworks: [
      'phantomjs-shim',
      'mocha',
      'chai',
      'sinon-chai',
      'angular-filesort'
    ],
    files: listFiles(),
    preprocessors: {
      [conf.path.src('**/*.html')]: [
        'ng-html2js'
      ]
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: `${conf.paths.src}/`,
      moduleName: 'app'
    },
    angularFilesort: {
      whitelist: [
        conf.path.tmp('**/!(*.html|*.spec|*.mock).js')
      ]
    },
    plugins: [
      require('karma-mocha'),
      require('karma-chai-plugins'),
      require('karma-junit-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-coverage'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-angular-filesort')
    ]
  };

  config.set(configuration);
};
