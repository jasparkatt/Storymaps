//load plugins

const {src, dest, watch, lastRun, series, parallel} = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const copy = require('gulp-copy');



//construct some paths
const files = {
    htmlPath: './index.html',
    cssPath: './style/*.css',
    jsPath: './scripts/*.js',
    imgPath: './img/*',
    corePath: './src/*.*',
    imgBuild: './build/img/',
    htmlBuild: './build/',
    cssBuild: './build/style/',
    jsBuild: './build/scripts/',
    srcBuild: './build/src/'
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

function copyTask() {
    return src(files.corePath, {since: lastRun(copyTask)})
        .pipe(plumber())
        .pipe(dest(files.srcBuild));
}

//create some watchers
function watchImg(){
    watch('./img/', imgTask);
    console.log('running imgTask...did you add some new pics?');
};

function watchScripts() {
    watch([files.htmlPath, files.jsPath, files.cssPath],
        series(htmlTask, jsTask, cssTask)),
        console.log('updating build folder as something changed in your scripts');
};


//export tasks
exports.imgTask = imgTask;
exports.cssTask = cssTask;
exports.htmlTask = htmlTask;
exports.jsTask = jsTask;
exports.copyTask = copyTask;
exports.watchImg = watchImg;
exports.watchScripts = watchScripts;

exports.rebuild = series(
    imgTask,
    htmlTask,
    cssTask,
    jsTask,
    copyTask
);
