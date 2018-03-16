const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const prettyError = require("gulp-prettyerror");
const ts = require("gulp-typescript");
const gutil = require("gulp-util");
const del = require("del");

////

const tsProject = ts.createProject("tsconfig.json");

////

gulp.task("default", ["clean", "lint", "scripts", "mimify", "sass", "browser-sync", "watch"]);

gulp.task("clean", () => del.sync(["./build/"]) );

gulp.task("watch", () => {
   gulp.watch(["./js/*.js", "./src/**/*.ts", "./css/*.css", "./src/**/*.scss", "./*.html"], ["scripts", "mimify", "sass", "reload"]);
});

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("reload", ["mimify", "sass"], () => {
    browserSync.reload();
 });

gulp.task("lint", () => {
    return gulp.src(["./js/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("scripts", () => {
    return gulp
        .src("./src/ts/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("./build/js"));
});

gulp.task("mimify", ["scripts"], () => {
    return gulp
        .src(["./build/js/*.js", "!**/*.min.js"])
        .pipe(uglify())//.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest("./build/js"));
});

gulp.task("sass", () => {
    return gulp
        .src("./src/sass/main.scss")
        .pipe(prettyError())
        .pipe(sass())
        .pipe(autoprefixer({browsers: ["last 2 versions"]}))
        .pipe(gulp.dest("./build/css"))
        .pipe(cssnano())
        .pipe(rename({extname: ".min.css"}))
        .pipe(gulp.dest("./build/css"));
});
