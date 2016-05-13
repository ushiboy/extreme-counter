const gulp = require('gulp')
, $ = require('gulp-load-plugins')()
, path = require('path')
, buildDir = path.join(__dirname, 'build')
, buildAppDir = path.join(buildDir, 'app')
, staticDir = path.join(buildDir, 'static')
, scriptDir = path.join(staticDir, 'scripts')
, del = require('del')
, connect = require('connect')
, serveStatic = require('serve-static')
, connectLiveReload = require('connect-livereload')
, proxyMiddleware = require('http-proxy-middleware')
, fs = require('fs')
, exec = require('child_process').exec
, webpack = require('webpack')
, bundler = webpack({
  entry: {
    'app': './src/scripts/frontend-app.js'
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

gulp.task('clean', del.bind(null, [buildDir]));

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
    // $.livereload.reload();
  });
});

gulp.task('js:app', cb => {
  fs.readFile(path.join(__dirname, '.babelrc'), { encoding: 'utf8' }, (error, data) => {
    const babelConfig = JSON.parse(data);
    gulp.src('src/scripts/**/*.js')
    .pipe($.babel(babelConfig))
    .pipe(gulp.dest(buildAppDir))
    .on('end', cb);
  });
});

var renderingServer;
gulp.task('serve:rendering', ['shutdown:rendering', 'js:app'], () => {
  const createServer = require('./build/app/server.js').createServer;
  const reg = new RegExp(buildAppDir);
  Object.keys(require.cache).filter(path => path.match(reg)).forEach(path => {
    delete require.cache[path];
  });
  renderingServer = createServer();
  renderingServer.listen(3002);
});
gulp.task('shutdown:rendering', cb => {
  if (renderingServer) {
    renderingServer.on('close', cb);
    renderingServer.close();
  } else {
    cb();
  }
});

gulp.task('serve', ['serve:rendering', 'js:dev'], () => {
  const port = process.env.PORT || 3000;
  const runApiServer = require('./fixture/api');

  runApiServer(3001);

  $.livereload.listen();
  connect()
  .use(connectLiveReload())
  .use(serveStatic(staticDir))
  .use(proxyMiddleware([
    '/api'
  ], {
    target: 'http://localhost:' + 3001,
    changeOrigin: true
  }))
  .use(proxyMiddleware([
    '/'
  ], {
    target: 'http://localhost:' + 3002,
    changeOrigin: true
  }))
  .listen(port);
});

gulp.task('dev', ['serve'], () => {
  gulp.watch('src/**/*.js', ['js:dev', 'serve:rendering']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('dev');
});
