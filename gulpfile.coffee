gulp = require('gulp')
gutil = require('gulp-util')
coffee = require('gulp-coffee')
browserify = require('gulp-browserify')

gulp.task 'coffee', ->
  try
    gulp.src('./coffee/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./js/compiled'))
  catch error
    pass

gulp.task 'js', ['coffee'], ->
  gulp.src('./js/compiled/index.js')
      .pipe(browserify())
      .pipe(gulp.dest('./js/build/'))

gulp.task 'watch', ->
  gulp.watch('./coffee/**/*.coffee', ['js'])

gulp.task('default', ['watch'])
