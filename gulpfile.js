const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");


gulp.task("default", ["lint", "scripts", "sass", "browser-sync", "watch"]);

gulp.task("watch", () => {
    gulp.watch(["js/*.js", "css/*.css", "css/*.scss", "*.html"], ["sass", "reload"]);
});

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("reload", function() {
    browserSync.reload();
 });

gulp.task("lint", () => {
    return gulp.src(["./js/*.js","!node_modules/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("scripts", () => {
    return gulp
            .src("./js/*.js") // What files do we want gulp to consume?
            .pipe(uglify()) // Call the uglify function on these files
            .pipe(rename({extname: ".min.js"})) // Rename the uglified file
            .pipe(gulp.dest("./build/js")); // Where do we put the result?
  });


gulp.task("sass", () => {
    return gulp
      .src("./css/main.scss")
      .pipe(sass())
      .pipe(autoprefixer({browsers: ["last 2 versions"]}))
      .pipe(gulp.dest("./build/css"))
      .pipe(cssnano())
      .pipe(rename({extname: ".min.css"}))
      .pipe(gulp.dest("./build/css"));
  });
