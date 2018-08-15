var gulp						 = require('gulp'),
    rename					 = require('gulp-rename'),
    concat					 = require('gulp-concat-util'),
    postcss					 = require('gulp-postcss'),
    autoprefixer		   = require('autoprefixer'),
    cssnano					 = require('cssnano'),
    sass				     = require('gulp-sass'),
    cache            = require('gulp-cache'),
		gm               = require('gulp-gm'),
    imagemin				 = require('gulp-imagemin'),
		imageminPngquant = require('imagemin-pngquant'),
		imageminMozjpeg	 = require('imagemin-mozjpeg');

// Critical CSS
gulp.task('critical', function() {
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

// Image Convertion
gulp.task('convert', function () {
  gulp.src('src/img/*.png')
    .pipe(gm(function (gmfile) {
      return gmfile.setFormat('jpg');
    }))
    .pipe(gulp.dest('src/img'));
})

// Image Optimization
gulp.task('imgOptim', function() {
  return gulp.src(['src/img/*.{png,jpg}'])
    .pipe(cache(imagemin([
      imageminPngquant({
        speed: 1,
        quality: 98 //lossy settings
      }),
      imageminMozjpeg({
        quality: 90
      })
    ])))
    .pipe(gulp.dest('src/img'));
});

// Watch asset folder for changes
gulp.task('watch', ['critical', 'imgOptim', 'convert'], function () {
  gulp.watch('assets/scss/fonts.scss', ['critical'])
  gulp.watch('assets/scss/variables.scss', ['critical'])
  gulp.watch('assets/scss/extends.scss', ['critical'])
  gulp.watch('assets/scss/reset.scss', ['critical'])
  gulp.watch('assets/scss/layout.scss', ['critical'])
  gulp.watch('assets/scss/critical.scss', ['critical'])
  gulp.watch('assets/img/*', ['convert'])
  gulp.watch('assets/img/*', ['imgOptim'])
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['critical', 'imgOptim', 'convert']);