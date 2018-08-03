var gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat-util'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    sass         = require('gulp-sass'),
    imagemin     = require('gulp-imagemin');

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

gulp.task('imgOptim', function() {
	return gulp.src(['src/img/*.png', 'src/img/*.jpg'])
		.pipe(imagemin())
		.pipe(gulp.dest('src/img'));
});

// Watch asset folder for changes
gulp.task('watch', ['critical', 'imgOptim'], function () {
  gulp.watch('assets/scss/fonts.scss', ['critical'])
  gulp.watch('assets/scss/variables.scss', ['critical'])
  gulp.watch('assets/scss/extends.scss', ['critical'])
  gulp.watch('assets/scss/reset.scss', ['critical'])
  gulp.watch('assets/scss/layout.scss', ['critical'])
  gulp.watch('assets/scss/critical.scss', ['critical'])
  gulp.watch('assets/img/*', ['imgOptim'])
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['critical', 'imgOptim']);