var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// var useref = require('gulp-useref');
// var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
// var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ''
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(autoprefixer({
    	browsers: ['last 2 versions'],
    	cascade: false
    })) // autoprefixer
    .pipe(cssnano()) // for mini-fying CSS, leaving off for now
    .pipe(browserSync.reload({
      stream: true
  }))
    .pipe(gulp.dest('')) // Outputs it in the root folder
})

// Watchers
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS
//gulp.task('useref', function() {
//  return gulp.src('app/*.html')
//    .pipe(useref())
//    .pipe(gulpIf('*.css', cssnano()))
//});


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass'], 'watch',
    callback
  )
})

//gulp.task('build', function(callback) {
//  runSequence(
//    'sass',
//    callback
//  )
//})
