var gulp = require("gulp"); // Load Gulp!
// Now that we've installed the uglify package we can require it:
var uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

var browserSync = require('browser-sync').create();

gulp.task("default", function () {
    return gulp
        .src("./js/*.js") // What files do we want gulp to consume?
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({extname: ".min.js"})) // Rename the uglified file
        .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task('watch', function () {
    gulp.watch('js/*.js', gulp.series('scripts'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
