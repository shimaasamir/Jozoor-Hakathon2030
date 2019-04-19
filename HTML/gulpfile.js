const gulp = require("gulp")
const sass = require("gulp-sass")
const watchSass = require("gulp-watch-sass")
var rename = require("gulp-rename");
var rtlcss = require('gulp-rtlcss');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task("sass:watch", () => watchSass([
    "./scss/**/*.scss",
    "./css"
])
    .pipe(sass())
    .pipe(gulp.dest("./css")));


gulp.task('default', function () {
    return gulp.src('css/*.css', { base: 'css' })
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(["last 2 versions", "> 1%"])) // Other post-processing.
        .pipe(gulp.dest('css')) // Output LTR stylesheets.
        .pipe(rtlcss()) // Convert to RTL.
        .pipe(rename({
            suffix: '-rtl'
        })) // Append "-rtl" to the filename.
        .pipe(sourcemaps.write('css')) // Output source maps.
        .pipe(gulp.dest('css')); // Output RTL stylesheets.
});