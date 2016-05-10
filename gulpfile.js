var gulp = require('gulp')
, $ = require('gulp-load-plugins')()
, path = require('path')
, distDir = path.join(__dirname, 'dist')
, scriptDir = path.join(distDir, 'scripts')
, del = require('del')
, connect = require('connect')
, serveStatic = require('serve-static')
, connectLiveReload = require('connect-livereload')
, webpack = require('webpack')
, bundler = webpack({
  entry: {
    'app': './app/scripts/app.js'
  },
  devtool: 'inline-source-map',
  output: {
    path: scriptDir,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
});

gulp.task('clean', del.bind(null, [distDir]));

gulp.task('html', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest(distDir))
  .pipe($.livereload());
});

gulp.task('js:dev', cb => {
  bundler.run((err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack:build', err);
    }
    $.util.log('[webpack:build]', stats.toString({
      colors: true,
      chunkModules: false
    }));
    cb();
    $.livereload.reload();
  });
});

gulp.task('serve', () => {
  var port = process.env.PORT || 3000;

  $.livereload.listen();
  connect()
  .use(connectLiveReload())
  .use(serveStatic(distDir))
  .listen(port);
});

gulp.task('dev', ['js:dev', 'html', 'serve'], () => {
  var reload = $.livereload.reload;
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/**/*.js', ['js:dev']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('dev');
});
