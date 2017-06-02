'use strict';

/***** start of Gulp plugins *****/
const gulp = require('gulp'),
  path = require('path'),
  less = require('gulp-less'),
  connect = require('gulp-connect'),
  pug = require('gulp-pug');
  /***** end of Gulp plugins *****/


/***** start of Project paths *****/
var baseDir = __dirname;

/***** start of Input paths *****/
var frontend = path.resolve(baseDir, './frontend'),
  inputStyles = path.resolve(frontend, './styles/**/main.less'),
  inputAssets = path.resolve(frontend, './assets'),
  inputLayouts = path.resolve(frontend, './components/Main/index.pug');
/***** end of Input paths *****/

/***** start of Output paths *****/
var build = path.resolve(baseDir, './build'),
  outputStyles = path.resolve(build, './styles'),
  outputAssets = path.resolve(build, './assets');
/***** end of Output paths *****/
/***** end of Project paths *****/


/***** start of Styles task *****/
// all stuff with styles, less, css and others in here
gulp.task('styles', () => {

  return gulp.src(inputStyles)
    .pipe(less())
    .pipe(gulp.dest(path.resolve(build, 'styles/')));
});
/***** end of Styles task *****/


/***** start of Pics task *****/
// all stuff with pics, imgs maybe gifs in here
gulp.task('pics', () => {
  return gulp.src(`${inputAssets}/imgs/**/*.*`)
    .pipe(gulp.dest(path.resolve(outputAssets, './imgs')));
});
/***** end of Pics task *****/

/***** start of Layouts task *****/
// all stuff for layouts, markup etc. in here
gulp.task('layouts', () => {
  return gulp.src(inputLayouts)
    .pipe(pug())
    .pipe(gulp.dest(build));
});
/***** end of Layouts task *****/


/***** start of Connect task *****/
// up and run local server
gulp.task('connect', () => {
  connect.server({
    root: build,
    port: 3000
  });
});
/***** end of Connect task *****/

gulp.task('default', gulp.series(gulp.parallel('styles', 'pics', 'layouts'), 'connect'), (done) => {
  done();
});







// just for testing purposes
/*
function hello() {
  console.log('Hello');
  console.log(frontend);

  console.log(baseDir);
  console.log(frontend);
  console.log(styles);
}
*/
