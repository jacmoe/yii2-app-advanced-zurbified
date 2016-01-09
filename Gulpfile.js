// fix problems with undefined Promise class
// http://stackoverflow.com/questions/32490328/gulp-autoprefixer-throwing-referenceerror-promise-is-not-defined
require('es6-promise').polyfill();

// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
browsersync = require('browser-sync'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
gulpif = require('gulp-if'),
runSequence = require('run-sequence');

var PATHS = {
    sass: [
        'vendor/zurb/foundation/scss',
        'vendor/bower/motion-ui/src/',
        'vendor/bower/font-awesome/scss/'
    ],
    javascript: [
        'vendor/bower/jquery/dist/jquery.js',
        'vendor/bower/what-input/what-input.js',
        'vendor/zurb/foundation/js/foundation.core.js',
        'vendor/zurb/foundation/js/foundation.util.*.js',
        // Paths to individual JS components defined below
        'vendor/zurb/foundation/js/foundation.abide.js',
        'vendor/zurb/foundation/js/foundation.accordion.js',
        'vendor/zurb/foundation/js/foundation.accordionMenu.js',
        'vendor/zurb/foundation/js/foundation.drilldown.js',
        'vendor/zurb/foundation/js/foundation.dropdown.js',
        'vendor/zurb/foundation/js/foundation.dropdownMenu.js',
        'vendor/zurb/foundation/js/foundation.equalizer.js',
        'vendor/zurb/foundation/js/foundation.interchange.js',
        'vendor/zurb/foundation/js/foundation.magellan.js',
        'vendor/zurb/foundation/js/foundation.offcanvas.js',
        'vendor/zurb/foundation/js/foundation.orbit.js',
        'vendor/zurb/foundation/js/foundation.responsiveMenu.js',
        'vendor/zurb/foundation/js/foundation.responsiveToggle.js',
        'vendor/zurb/foundation/js/foundation.reveal.js',
        'vendor/zurb/foundation/js/foundation.slider.js',
        'vendor/zurb/foundation/js/foundation.sticky.js',
        'vendor/zurb/foundation/js/foundation.tabs.js',
        'vendor/zurb/foundation/js/foundation.toggler.js',
        'vendor/zurb/foundation/js/foundation.tooltip.js',
        // Yii2 scrips
        "vendor/yiisoft/yii2/assets/yii.js",
        "vendor/yiisoft/yii2/assets/yii.validation.js",
        "vendor/yiisoft/yii2/assets/yii.activeForm.js",
        // Custom scripts
        'js/**/!(custom).js',
        'js/custom.js'
    ]
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: PATHS.sass
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


// Styles
gulp.task('styles', function() {
    return gulp.src('scss/all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../scss/' }))
    .pipe(gulp.dest('frontend/web/css'))
    .pipe(gulp.dest('backend/web/css'))
    .pipe(gulpif('*.css', rename({ suffix: '.min' })))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif('*.css', gulp.dest('frontend/web/css')))
    .pipe(gulpif('*.css', gulp.dest('backend/web/css')))
    .pipe(gulpif('*.css', notify({ message: 'Styles task complete' })));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(PATHS.javascript)
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../js/' }))
    .pipe(gulp.dest('frontend/web/js'))
    .pipe(gulp.dest('backend/web/js'))
    .pipe(gulpif('*.js', rename({ suffix: '.min' })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', gulp.dest('frontend/web/js')))
    .pipe(gulpif('*.js', gulp.dest('backend/web/js')))
    .pipe(gulpif('*.js', notify({ message: 'Scripts task complete' })));
});

// Images
gulp.task('images', function() {
    return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('frontend/web/img'))
    .pipe(gulp.dest('backend/web/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src([
        'vendor/bower/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('./frontend/web/fonts'))
    .pipe(gulp.dest('./backend/web/fonts'));
});

// Clean
gulp.task('clean', function() {
    return del(['frontend/web/css/*', 'frontend/web/js/*', 'frontend/web/fonts/*',
    'backend/web/css/*', 'backend/web/js/*', 'backend/web/fonts/*']);
});

// Build the "web" folder by running all of the above tasks
gulp.task('build', function(callback) {
    runSequence('clean', ['styles', 'scripts', 'fonts'], callback);
});

// Watch
gulp.task('watch', function() {

    // Initialize Browsersync
    browsersync.init({
        proxy: "http://foundationtest.dev"
    });

    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts']);

    // Watch image files
    //gulp.watch('img/**/*', ['images']);

    // Watch any view files in 'views', reload on change
    gulp.watch(['common/views/**/*.php']).on('change', browsersync.reload);
    gulp.watch(['frontend/views/**/*.php']).on('change', browsersync.reload);
    gulp.watch(['backend/views/**/*.php']).on('change', browsersync.reload);

    // Watch any files in 'web', reload on change
    gulp.watch(['frontend/web/js/*']).on('change', browsersync.reload);
    gulp.watch(['backend/web/css/*']).on('change', browsersync.reload);
    gulp.watch(['frontend/web/js/*']).on('change', browsersync.reload);
    gulp.watch(['backend/web/css/*']).on('change', browsersync.reload);
});

gulp.task('default', ['build', 'watch'], function() {});
