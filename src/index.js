// @flow

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import WriteFilePlugin from 'write-file-webpack-plugin';

type output = {
  path: string,
  filename: 'bundle.js' | '[name].js'
};

type config = {
  dirname: string,
  entry: string | Object,
  output: output,
  assets: string,
  html: string,
  mode: 'production' | 'development',
  port: number,
  sourcemaps: boolean,
  overlay: boolean
};

function generateEntry(entries: Object, script: string, build: string) {
  if (build === 'production') {
    Object.keys(entries).forEach(key => entries[key] = [entries[key]]);
    return entries;
  } else {
    Object.keys(entries).forEach(key => entries[key] = [entries[key], script]);
    return entries;
  }
}

function qnd(config: config) {
  config.mode = config.mode || 'development';

  var app = express(),
    hmrs = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    entry = null,
    filename = null;

  if (typeof config.entry === 'string') {
    entry = [hmrs, config.entry];
    filename = 'bundle.js';
  } else {
    entry = generateEntry(config.entry, hmrs, config.mode);
    filename = '[name].js';
  }

  var wpc = {
    entry,
    output: {
      path: path.resolve(config.dirname, config.output),
      filename
    },
    module: {
      rules: [{ test: /.(re|ml)$/, use: 'bs-loader' }]
    },
    resolve: {
      extensions: ['.re', '.ml', '.js']
    },
    devtool: config.mode === 'production' ? 'source-map' : 'eval',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new WriteFilePlugin({
        log: false
      })
    ].concat(
      config.mode === 'production'
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

  var compiler = webpack(wpc);

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
      overlay: config.overlay || true,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
  app.use(express.static(path.resolve(config.dirname, config.assets)));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(config.dirname, config.html)));

  app.listen(config.port || 8000, () =>
    console.log('Listening on %j', config.port || 8000));
}

export default qnd;
