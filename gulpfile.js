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

const tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["lint", "scripts", "sass", "browser-sync", "watch"]);

gulp.task("watch", () => {
   // gulp.watch(["./js/*.js", "./css/*.css", "./css/*.scss", "./*.html"], ["scripts", "sass", "reload"]);
});

gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("reload", () => {
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
        .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest("./build/js"));

    // return gulp
    //     .src("./js/*.js") // What files do we want gulp to consume?
    //     .pipe(uglify()) // Call the uglify function on these files
    //     .on("error", function (err) { gutil.log(gutil.colors.red("[Error]"), err.toString()); })
    //     .pipe(rename({extname: ".min.js"})) // Rename the uglified file
    //     .pipe(gulp.dest("./build/js")); // Where do we put the result?
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
