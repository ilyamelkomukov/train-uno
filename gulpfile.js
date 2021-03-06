'use strict';

// TODO: check the jquery cdn falldown
// ans: checked, need create separate script that adds jquery.js file and
  // script tag before main.js
  // done
// TODO: check the "jumping" Billboard text when navbar toggle clicked
// ANS: checked, browser rendering, in Chrome and FF it`s ok, in
// Opera sometimes a little bit blur
// TODO: fix the middle dash in navbar transition, make navbar responsive
// ANS: middle dash fixed (added delay)
// TODO: decide is need to show menu items (usually they are hidden at start)
// ANS: menu items should be hidden at start (like on other resources)
// TODO: explore usage of bower for normalize.css
// ANS: it`s more usefull to use cdn
// TODO: decide about normalize or reset, pay attention at -webkit-margin-before:
// ANS: normalize.css contains more rules and sometimes maintained
// unlike of reset.css. However nor normalize.css or reset.css
// contains rules for -webkit-margin-before or like this
// TODO: make the navbar items showing-up suitable on small screens
// ANS: in progress, decide to manipulate the ul height (first, to set it)
// TODO: make clearfix through adding class clearfix, not to adding rules to
// existing classes
// ANS: done
// TODO: finded out that css transitions doesn`t support by IE9,
// so we need to use the anime.css or GSAP for all animations
// ANS: anime.js is lightweight, but perfomance is almost like jQuery,
// gsap is something 60-70kb, but is perfarmant and we can chooze what to
// download
// TODO: TEst in IE (margins ul, boldness when transforming, fonts loading, etc.)

var isDev = process.env.NODE_ENV == 'development';

/***** start of Gulp plugins *****/
const gulp = require('gulp'),
  less = require('gulp-less'),
  connect = require('gulp-connect'),
  pug = require('gulp-pug'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpIf = require('gulp-if'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  uglify = require('gulp-uglify'),
  gulpWebpack = require('gulp-webpack'),
  webpack = require('webpack');
  /***** end of Gulp plugins *****/


/***** start of Project paths *****/
var baseDir = __dirname;

/***** start of Input paths *****/
var frontend = `${baseDir}/frontend/`,
  inputStyles = `${frontend}/styles/`,
  inputAssets = `${frontend}/assets/`,
  inputLayouts = `${frontend}/components/index.pug`,
  inputScripts = `${frontend}/scripts/`;
/***** end of Input paths *****/

/***** start of Output paths *****/
var build = `${baseDir}/build`,
  outputStyles = `${build}/styles/`,
  outputAssets = `${build}/assets/`,
  outputScripts = `${build}/scripts/`
/***** end of Output paths *****/
/***** end of Project paths *****/


/***** start of Styles task *****/
// all stuff with styles, less, css and others in here
gulp.task('styles', () => {

  return gulp.src(`${inputStyles}/main.less`)
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(less())
    .pipe(postcss())
    .pipe(gulpIf(isDev, sourcemaps.write('./')))
    .pipe(gulp.dest(outputStyles));
});
/***** end of Styles task *****/


/***** start of Pics task *****/
// all stuff with pics, imgs maybe gifs in here
gulp.task('pics', () => {
  return gulp.src(`${inputAssets}/imgs/**/*.*`, {since: gulp.lastRun('pics')})
    .pipe(newer(`${outputAssets}/imgs/`))
    .pipe(imagemin())
    .pipe(gulp.dest(`${outputAssets}/imgs/`));
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


/***** start of Fonts task *****/
gulp.task('fonts', () => {

  return gulp.src(`${inputAssets}/fonts/*.*`, {since: gulp.lastRun('fonts')})
    .pipe(newer(`${outputAssets}/fonts/`))
    .pipe(gulp.dest(`${outputAssets}/fonts/`));
});
/***** end of Fonts task *****/


/***** start of Clean task *****/
// delete the directory for build with all of its content
gulp.task('clean', () => {
  return del([`${build}/**/*.*`]);
});
/***** end of Clean task *****/


/***** start of Scripts task *****/
gulp.task('scripts', () => {

  gulp.src(`${inputScripts}/jquery.js`, {since: gulp.lastRun('scripts')})
    .pipe(gulp.dest(outputScripts));

    gulp.src(`${inputScripts}/other/jqueryFalldown.js`, {since: gulp.lastRun('scripts')})
      .pipe(gulp.dest(outputScripts));



  return gulp.src(`${inputScripts}/main.js`)
    .pipe(gulpWebpack({
      devtool: isDev ? 'cheap-eval-source-map' : false,
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                ["env", {
                  "targets": {
                    "browsers": [">1%", "last 10 versions", "IE 9"]
                  }
                }]
              ]
            }
          }
        ]
      },
      output: {
        filename: isDev ? '[name].js' : '[name]-[hash].js'
      }
    }, webpack))
    // .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulp.dest(outputScripts));
});
/***** end of Scripts task *****/


/***** start of Connect task *****/
// up and run local server
gulp.task('connect', (done) => {
  connect.server({
    root: build,
    port: 3000
  });
  done();
});
/***** end of Connect task *****/


gulp.task('watch', (done) => {
  gulp.watch([`${frontend}/components/**/*.less`, `${inputStyles}/**/*.less`], gulp.series('styles'));
  gulp.watch(`${frontend}/components/**/*.pug`, gulp.series('layouts'));
  gulp.watch(`${inputAssets}/fonts/**/*.*`, gulp.series('fonts'));
  gulp.watch(`${inputAssets}/imgs/**/*.*`, gulp.series('pics'));
  gulp.watch([`${inputScripts}`, `${frontend}/components/**/*.js`], gulp.series('scripts'));
  done();
});


gulp.task('default', gulp.series(
  'clean',
    gulp.parallel('styles', 'layouts', 'fonts', 'pics', 'scripts'),
  'connect',
  'watch'), (done) => {
  done();
});
