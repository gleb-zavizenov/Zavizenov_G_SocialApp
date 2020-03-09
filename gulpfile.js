const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const nano = require("cssnano");
const prefixer = require("autoprefixer");

//define some tasks for GULP to run

//line to complete and modify SASS files
function compile(done) {
    gulp.src('./sass/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([prefixer(),nano()]))
        .pipe(gulp.dest('./public/css'))
        done()
}

exports.compile = compile;