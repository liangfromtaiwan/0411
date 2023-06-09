var gulp = require("gulp");
// var $ = require("gulp-load-plugins")();
var jade = require("gulp-jade");
var sass = require("gulp-sass")(require("node-sass"));
var plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const concat = require("gulp-concat")
const sourcemaps = require("gulp-sourcemaps");;



gulp.task("jade", function () {
  //   var YOUR_LOCALS = {};

  gulp
    .src("./source/**/*.jade")
    .pipe(plumber())
    .pipe(
      jade({
        pretty: true, //讓他解除壓縮檔模式
      })
    )
    .pipe(gulp.dest("./public/"));
});


gulp.task("sass", function () {
  return gulp
    .src("./source/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/css/"));
});

gulp.task("babel", () =>
  gulp
    .src("./source/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/js"))
);

//自動更新
gulp.task("watch", function () {
    gulp.watch("./source/scss/*.scss", ["sass"]);
    gulp.watch("./source/**/*.jade", ["jade"]);
    gulp.watch("./source/js/**/*.js", ["babel"]);
});

gulp.task("default", ["jade", "sass", "babel", "watch"]);
