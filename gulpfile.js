//load plugins

const {src, dest, watch, lastRun, series, parallel} = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');



//construct some paths
const files = {
    htmlPath: './index.html',
    cssPath: './style/*.css',
    jsPath: './scripts/*.js',
    imgPath: './img/*',
    imgBuild: './build/img/',
    htmlBuild: './build/',
    cssBuild: './build/style/',
    jsBuild: './build/scripts/'
    // imgTemp: './temp/img/'
}

function imgTask() {
    return src(files.imgPath, { since: lastRun(imgTask) })
                .pipe(plumber())
                .pipe(imagemin())
                .pipe(dest(files.imgBuild))
                // .pipe(dest(files.imgTemp))
}

function cssTask() {
    return src(files.cssPath, {since: lastRun(cssTask)})
        .pipe(plumber())
        .pipe(cleanCss())
        .pipe(dest(files.cssBuild))
}

function jsTask() {
    return src(files.jsPath, {since: lastRun(jsTask)})
        .pipe(plumber())
        .pipe(uglify())
        .pipe(dest(files.jsBuild))
}

function htmlTask() {
    return src(files.htmlPath, {since: lastRun(htmlTask)})
        .pipe(plumber())
        .pipe(htmlmin({removeComments: true}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest(files.htmlBuild))
}

//create some watchers
function watchImg(){
    watch('./img/', imgTask);
    console.log('running imgTask...did you add some new pics?');
};
//export tasks
exports.imgTask = imgTask;
exports.cssTask = cssTask;
exports.htmlTask = htmlTask;
exports.jsTask = jsTask;

exports.rebuild = series(
    imgTask,
    htmlTask,
    cssTask,
    jsTask
);
