var gulp = require('gulp'),  rename = require('gulp-rename'),  concat = require('gulp-concat-util'),  postcss = require('gulp-postcss'),  autoprefixer = require('autoprefixer'),  cssnano = require('cssnano'),  sass = require('gulp-sass'),  cache = require('gulp-cache'),  imagemin = require('gulp-imagemin'),  imageminPngquant = require('imagemin-pngquant'),  imageminMozjpeg = require('imagemin-mozjpeg'),
  gm = require('gulp-gm'),
  imageResize = require('gulp-image-resize');// Critical CSSgulp.task('critical', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];
  return gulp.src('assets/scss/critical.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  // wrap with style tags
  .pipe(concat.header('<style>'))
  .pipe(concat.footer('</style>'))
  // convert it to an include file
  .pipe(rename({
      basename: 'critical',
      extname: '.html'
    }))
  // insert file
  .pipe(gulp.dest('layouts/partials'));
});

// Image Conversiongulp.task('convert', function() {  return gulp.src('assets/img/*.png')
  .pipe(gm(function (gmfile) {
    return gmfile.setFormat('jpg');
  }))  .pipe(gulp.dest('assets/img'));});

// Image Conversiongulp.task('resize', function() {  return gulp.src('assets/img/*.jpg')
  .pipe(imageResize({
    width : 700
  }))
  .pipe(gulp.dest('assets/img'));});// Image Optimizationgulp.task('imgOptim', function() {  return gulp.src('assets/img/*.jpg')  .pipe(cache(imagemin([    imageminMozjpeg({      quality: 90,
      progressive: true    })  ])))  .pipe(gulp.dest('assets/img'));});
// Watch asset folder for changesgulp.task('watch', ['critical', 'convert', 'resize', 'imgOptim'], function() {  gulp.watch('assets/scss/fonts.scss', ['critical']);  gulp.watch('assets/scss/variables.scss', ['critical']);  gulp.watch('assets/scss/extends.scss', ['critical']);  gulp.watch('assets/scss/reset.scss', ['critical']);  gulp.watch('assets/scss/layout.scss', ['critical']);  gulp.watch('assets/scss/critical.scss', ['critical']);
  gulp.watch('assets/img/*', ['convert']);
  gulp.watch('assets/img/*', ['resize']);  gulp.watch('assets/img/*', ['imgOptim']);
});// Run Watch as defaultgulp.task('default', ['watch']);// Buildgulp.task('build', ['critical', 'convert', 'resize', 'imgOptim']);