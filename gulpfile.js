const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('gulp-webpack');
const browserSync = require('browser-sync').create();

gulp.task('styles', () => gulp.src('./src/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(autoprefixer('last 4 version'))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist/assets/stylesheets'))
	.pipe(browserSync.stream())
);

gulp.task('scripts', () => gulp.src('./src/scripts/index.js')
	.pipe(webpack({
		'output': {
			'filename': 'app.js'
		}
	}))
	.pipe(gulp.dest(('./dist/assets/scripts/')))
	.pipe(browserSync.stream())
);

gulp.task('html', () => gulp.src('./src/html/*.html')
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream())
);

gulp.task('watch', () => {
	browserSync.stream();
	gulp.watch('./src/css/**.css', ['styles']);
	gulp.watch('./src/scripts/**.js', ['scripts']);
	gulp.watch('./src/html/*.html', ['html']);
});

gulp.task('browser-sync', () => {
	browserSync.init({
		'server': {
			'baseDir': './dist'
		}
	});
});

gulp.task('serve', ['browser-sync', 'watch']);