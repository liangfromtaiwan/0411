var gulp = require("gulp");
var $ = require('gulp-load-plugins')()
// var jade = require("gulp-jade");
// var sass = require("gulp-sass")(require("node-sass"));
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");




gulp.task("jade", function () {
  // var YOUR_LOCALS = {};

  gulp
    .src("./source/*.jade")
    .pipe($.plumber())
    .pipe($.jade({
        pretty: true, //讓他解除壓縮檔模式
      })
    )
    .pipe(gulp.dest("./public/"));
});

gulp.task("sass", function () {
  var plugins = [autoprefixer({ browsers: ["last 1 version", "> 5%"] })];
  
  return gulp
    .src("./source/sass/**/*.scss")
    .pipe($.plumber())
    .pipe($.sass().on("error",sass.logError))
    .pipe($.postcss(plugins))
    .pipe(gulp.dest("./public/css"));
});

gulp.task("watch", function () {
  gulp.watch("./source/sass/**/*.scss", ["sass"]);
  gulp.watch("./source/**/*.jade", ["jade"]);
});

gulp.task('default', ['jade','sass','watch'])
