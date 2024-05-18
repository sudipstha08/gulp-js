const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Paths
const paths = {
	html: {
		src: "src/*.html",
		dest: "dist/",
	},
	styles: {
		src: "src/scss/**/*.scss",
		dest: "dist/css/",
	},
	scripts: {
		src: "src/js/**/*.js",
		dest: "dist/js/",
	},
};

// HTML task
function html() {
	return gulp
		.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest))
		.pipe(browserSync.stream());
}

// Styles task
function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream());
}

// Scripts task
function scripts() {
	return gulp
		.src(paths.scripts.src, { sourcemaps: true })
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
}

// BrowserSync
function browserSyncServe(cb) {
	browserSync.init({
		server: {
			baseDir: "dist/",
		},
	});
	cb();
}

// BrowserSync Reload
function browserSyncReload(cb) {
	browserSync.reload();
	cb();
}

// Define complex tasks
const build = gulp.series(gulp.parallel(html, styles, scripts));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSyncServe));

// Export tasks
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
