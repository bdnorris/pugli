var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("autoprefixer");
var cssnano = require("gulp-cssnano");
var browserSync = require("browser-sync").create();
// var babel = require("gulp-babel");
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
// https://www.npmjs.com/package/webpack-stream
var webpackStream = require("webpack-stream");
var webpackConfig = require("./webpack.config.js");
var clean = require("gulp-clean");

var path = {
  sass: "src/scss/**/*.scss",
  html: "src/**/*.html",
  entry: "src/js/entry.js",
  js: "src/js/**/*.js",
  images: "src/images/*"
};

// Styles task for production `gulp styles`
gulp.task("prod-styles", function() {
  return gulp
    .src(path.sass) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(
      postcss([
        autoprefixer({
          browsers: [">3%"],
          cascade: false,
          grid: true
        })
      ])
    )
    .pipe(cssnano({ reduceIdents: false })) // this helps prevent breaking animations // for mini-fying CSS, leaving off for now
    .pipe(gulp.dest("dist/")); // Outputs it in the root folder
});

// Styles task for development with sourcemaps `gulp`
gulp.task("sass", function() {
  return gulp
    .src(path.sass) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init()) // Init sourcemaps
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write()) // Write it, it's embedded, making the file much larger. Should be turned off for Production
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp
    .src(path.images)
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"));
});

gulp.task("html", function() {
  return gulp.src(path.html).pipe(gulp.dest("dist/"));
});

gulp.task("js", function() {
  return gulp
    .src(path.entry)
    .pipe(webpackStream(webpackConfig))
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist/js"));
});

// Static Server + watching scss/html files
gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(path.sass, gulp.series("sass")).on("change", browserSync.reload);
  gulp.watch(path.html, gulp.series("html")).on("change", browserSync.reload);
  gulp.watch(path.js, gulp.series("js")).on("change", browserSync.reload);
});

gulp.task("clean", function() {
  return gulp.src("./dist", { read: false, allowEmpty: true }).pipe(clean());
})

// Build `gulp build`
// Styles then stop
gulp.task("build", gulp.series("clean", "html", "images", "prod-styles", "js"));

// Default `gulp`
// Styles then serve
gulp.task("default", gulp.series("clean", "html", "images", "sass", "js", "serve"));
