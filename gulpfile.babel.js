'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean-css');

const path = {
  src: 'src',
  dist: 'dist',
  test: 'tests',
};

gulp.task('scriptsDev', () => {
  return gulp.src('src/script.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('library.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('scriptsProd', () => {
  return gulp.src('src/script.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename('library.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('sassDev', function() {
    return gulp.src(['src/*.scss', 'src/*/*.scss'])
        .pipe(sass())
        .pipe(rename('library.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sassProd', function() {
    return gulp.src(['src/*.scss', 'src/*/*.scss'])
        .pipe(sass())
        .pipe(clean({compatibility: 'ie8'}))
        .pipe(rename('library.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['scriptsDev']);
    gulp.watch(['src/*.scss', 'src/*/*.scss'], ['sassDev']);
});

gulp.task('build', function() {
    gulp.watch('src/*.js', ['scriptsProd']);
    gulp.watch('src/*.scss', ['sassProd']);
});
