const gulp = require('gulp');
const path = require('path');
const childProcess = require('child_process');
const protractor = require("gulp-protractor").protractor;
const angularProtractor = require('gulp-angular-protractor');

function getProtractorBinary(binaryName) {
  const winExt = /^win/.test(process.platform) ? '.cmd' : '';
  const pkgPath = require.resolve('protractor');
  const protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));

  return path.join(protractorDir, '/', binaryName, winExt);
}

gulp.task('protractor-install', protractorInstall);
gulp.task('protractor-run', protractorRun);
gulp.task('protractor-test', protractorTest);

function protractorInstall(done) {
  return childProcess.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
    stdio: 'inherit'
  }).once('close', done);
}

function protractorRun(done) {
  const argv = process.argv.slice(3);

  return childProcess.spawn(getProtractorBinary('protractor'), argv, {
    stdio: 'inherit'
  }).once('close', done);
}

// function protractorTest() {
//   return gulp.src(['./e2e/specs/*.js'])
//     .pipe(protractor({
//       configFile: './e2e/protractor.config.js',
//       args: ['--baseUrl', 'http://127.0.0.1:8000']
//     }));
// }

function protractorTest() {
  return gulp.src(['./e2e/specs/*.js'])
    .pipe(angularProtractor({
      'configFile': './e2e/protractor.config.js',
      'debug': true,
      'autoStartStopServer': true
    }));
}
