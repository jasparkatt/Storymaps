//load plugins

const {src, dest, watch, lastRun, series, parallel} = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp=htmlmin');



//construct some paths
const files = {
    imgPath: './img/*',
    imgBuild: './build/img/',
    // imgTemp: './temp/img/'
}
function imgTask() {
    return src(files.imgPath, { since: lastRun(imgTask) })
                .pipe(plumber())
                .pipe(imagemin())
                .pipe(dest(files.imgBuild))
                // .pipe(dest(files.imgTemp))
}

//create some watchers
function watchImg(){
    watch('./img/', imgTask);
    console.log('running imgTask...did you add some new pics?');
};
//export tasks
exports.imgTask = imgTask;
