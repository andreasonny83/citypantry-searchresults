const path = require('path');

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([
  'gulp_tasks/misc.js',
  'gulp_tasks/browsersync.js',
  'gulp_tasks/karma.js',
  'gulp_tasks/protractor.js',
  'gulp_tasks/inject.js',
  'gulp_tasks/build.js',
  'gulp_tasks/scripts.js',
  'gulp_tasks/styles.js',
  'gulp_tasks/partials.js'
]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('inject', gulp.series(gulp.parallel('styles', 'scripts'), 'inject'));
gulp.task('build', gulp.series('clean', 'partials', gulp.parallel('inject', 'other'), 'build'));
gulp.task('test', gulp.series('scripts', 'karma:single-run'));
gulp.task('test:auto', gulp.series('watch', 'karma:auto-run'));
gulp.task('serve', gulp.series('clean', 'inject', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function watch(done) {
  gulp.watch([
    path.join(conf.paths.src, 'index.html'),
    'bower.json'
  ], gulp.parallel('inject'));

  gulp.watch(path.join(conf.paths.src, 'app/**/*.html'), browserSync.reload);
  gulp.watch([
    path.join(conf.paths.src, '**/*.scss'),
    path.join(conf.paths.src, '**/*.css')
  ], gulp.series('styles'));
  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), gulp.series('inject'));
  done();
}
