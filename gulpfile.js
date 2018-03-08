var gulp = require("gulp"); // Load Gulp!
// Now that we've installed the uglify package we can require it:
var uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

gulp.task("default", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});
