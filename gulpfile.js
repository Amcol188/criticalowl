var gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat-util'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    sass         = require('gulp-sass');

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

// Watch asset folder for changes
gulp.task('watch', ['critical'], function () {
  gulp.watch('assets/scss/fonts.scss', ['critical'])
  gulp.watch('assets/scss/variables.scss', ['critical'])
  gulp.watch('assets/scss/extends.scss', ['critical'])
  gulp.watch('assets/scss/reset.scss', ['critical'])
  gulp.watch('assets/scss/critical.scss', ['critical'])
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['critical']);