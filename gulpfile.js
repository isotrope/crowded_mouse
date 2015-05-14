var gulp = require('gulp');
/* var browserify = require('gulp-browserify'); */
var concat = require('gulp-concat'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require("gulp-notify"),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');


gulp.task('styles', function () {
	gulp.src(['css/crowdedmouse.less'])
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(minifyCSS())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest('./'))
		.pipe(notify({message: 'Styles task complete'}));
});


gulp.task('scripts', function () {
	return gulp.src(['js/jquery.crowdedmouse.js'])
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))

		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest('js/'))
		.on('error', function (err) {
			console.log(err.message);
		})
		.pipe(notify({message: 'Scripts task complete'}));
});


// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch('css/crowdedmouse.less', ['styles']);
	gulp.watch(['js/jquery.crowdedmouse.js'], ['scripts']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'styles', 'scripts']);