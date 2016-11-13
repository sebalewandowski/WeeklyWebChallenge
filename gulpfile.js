var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

//SASS task to watch compile files from .scss to .css
gulp.task('sass', function(){
  return gulp.src('app/scss/**/**.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
  });
// browerSync task to refresh the page after each change in app folder
gulp.task('browserSync', function(){
  browserSync.init({
    server:{
      baseDir: 'app'
    },
  })
});

//AutoPrefixer task to prefix older browsers
gulp.task('default', () =>
    gulp.src('app.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Copies fonts to /dist (for Bootstrap glyphicons)
gulp.task('fonts', function() {
    return gulp.src('./node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
});


//font task to copy fonts /dist directory
gulp.task('fonts', function(){
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// Copies fonts to /app directory (for Bootstrap glyphicons)
gulp.task('fonts1', function() {
    return gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
        .pipe(gulp.dest('app/fonts'))
});

//Main task to watch all above tasks
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});
