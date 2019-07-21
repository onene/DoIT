const gulp = require('gulp');
const concat = require('gulp-concat');
var postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require("gulp-imagemin");


sass.compiler = require('node-sass');

// const allSctipts = [
//     './src/js/**/*.js',
//     './node_modules/slick-carousel/slick/slick.min.js',
//     './node_modules/jquery/dist/jquery.min.js',
// ];
const allStyles = [
    './src/scss/main.scss',
    './src/scss/_jquery-ui.scss',
    './src/scss/_jquery-ui.theme.scss',
    './src/scss/_slick-theme.scss',
    './src/scss/_slick.scss',
    './src/scss/header.scss',
    './src/scss/nav.scss',
    './src/scss/asside.scss',
    './src/scss/content.scss',
    './src/scss/media-header.scss',
    './src/scss/media-nav.scss',
    './src/scss/media-asside.scss',
    './src/scss/media-content.scss'



]

function styles() {
    return gulp.src(allStyles)
        .pipe(concat('style.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['Chrome 25', 'Edge 12', 'IE 10'],
            overrideBrowserslist: ['Chrome 25', 'Edge 12', 'IE 10'],
            cascade: false,
            grid: 'autoplace'
        }))
        .pipe(postcss(autoprefixer))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function script() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/slick-carousel/slick/slick.min.js',
            // './src/js/jquery-ui.js',
            './src/js/common.js'


        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', styles);
    gulp.watch('./src/js/**/*.js', script);
    gulp.watch('./src/img/**/*', images);
    gulp.watch('./*.html', browserSync.reload)

}

function clean() {
    return del(['build/*'])
}

gulp.task('styles', styles);
gulp.task('script', script);
gulp.task('images', images)
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, script, images)))
gulp.task('dev', gulp.series('build', 'watch'))