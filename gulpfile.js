// gulpfile.js

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

// Paths to source and destination folders
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
	images: {
		src: "src/images/**/*.{jpg,jpeg,png,gif,svg}",
		dest: "dist/images",
	},
};

// Compile Sass to CSS
function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream());
}

// Minify HTML
function html() {
	return gulp
		.src(paths.html.src)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(paths.html.dest))
		.pipe(browserSync.stream());
}

// Minify JavaScript
function scripts() {
	return gulp
		.src(paths.scripts.src)
		.pipe(terser())
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());
}

function images() {
	return gulp
		.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest));
}

// Watch files for changes and serve
function watchFiles() {
	browserSync.init({
		server: {
			baseDir: "dist",
		},
		port: 3001,
	});
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.scripts.src, scripts);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(styles, html, scripts));
const watch = gulp.series(build, watchFiles);

// Export tasks to the Gulp CLI
exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
