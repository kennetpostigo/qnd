// @flow

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

function generateEntry(entries: Object, script: string, build) {
  if (build === 'production') {
    Object.keys(entries).forEach(key => entries[key] = [entries[key]]);
    return entries;
  } else {
    Object.keys(entries).forEach(key => entries[key] = [entries[key], script]);
    return entries;
  }
}

function qnd(
  build: 'development' | 'build',
  source: string | Object,
  dirname: string,
  output: string = 'dist',
  html: string = '/dist/index.html'
): Function {
  return (port: number = 8000, sourceMaps: boolean = false) => {
    var app = express();
    var hotMiddlewareScript: string = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

    if (typeof source === 'string') {
      var entry = [hotMiddlewareScript, source];
      var filename = 'bundle.js';
    }

    var config = {
      context: path.resolve(dirname),
      entry: entry ? entry : generateEntry(source, hotMiddlewareScript, build),
      output: {
        path: path.resolve(dirname, output),
        publicPath: '/',
        filename: filename ? filename : '[name].js'
      },
      module: {
        rules: [{ test: /.(re|ml)$/, use: 'bs-loader' }]
      },
      resolve: {
        extensions: ['.re', '.ml', '.js']
      },
      devtool: sourceMaps ? 'source-map' : 'eval',
      stats: {
        colors: true
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ].concat(
        build === 'production'
          ? [
              new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
              }),
              new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: true,
                compress: {
                  screw_ie8: true
                },
                comments: false
              })
            ]
          : []
      )
    };

    if (build === 'production') {
      var compiler = webpack(config);

      return compiler.run((err, status) => {
        if (err) return console.log(err);
      });
    } else {
      var compiler = webpack(config);

      app.use(
        devMiddleware(compiler, {
          stats: { colors: true },
          noInfo: true,
          publicPath: '/'
        })
      );

      app.use(
        hotMiddleware(compiler, {
          log: console.log,
          overlay: true,
          path: '/__webpack_hmr',
          heartbeat: 10 * 1000
        })
      );
      app.use(express.static(dirname));

      app.get('*', (req, res) => res.sendFile(path.join(dirname + html)));

      app.listen(port, () => console.log('Listening on %j', port));
    }
  };
}

export default qnd;
