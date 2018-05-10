const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const critical = require('critical').stream;
const webpack = require('gulp-webpack');
const browserSync = require('browser-sync').create();

gulp.task('styles', async () => gulp.src('./src/css/*.css')
	.pipe(sourcemaps.init())
	.pipe(autoprefixer('last 4 version'))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist/assets/stylesheets'))
	.pipe(browserSync.stream())
);

gulp.task('scripts', async () => gulp.src('./src/scripts/index.js')
	.pipe(webpack({
		'output': {
			'filename': 'app.js'
		}
	}))
	.pipe(gulp.dest(('./dist/assets/scripts/')))
	.pipe(browserSync.stream())
);

gulp.task('html', async () => gulp.src('./src/html/*.html')
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream())
);

gulp.task('critical', async () => gulp.src('./dist/*.html')
	.pipe(critical({ 'base': 'dist/', 'inline': true, 'css': ['dist/assets/stylesheets/critical.css'] }))
	.on('error', (err) => console.log(err.message))
	.pipe(gulp.dest('dist'))
);

gulp.task('watch', async () => {
	browserSync.stream();
	gulp.watch('./src/css/**.css', gulp.series('styles', 'html', 'critical'));
	gulp.watch('./src/scripts/**.js', gulp.series('scripts'));
	gulp.watch('./src/html/*.html', gulp.series('styles', 'html', 'critical'));
});

gulp.task('browser-sync', async () => {
	browserSync.init({
		'server': {
			'baseDir': './dist'
		}
	});
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));