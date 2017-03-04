// @flow

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

function generateEntry(entries: Object, script: string) {
  Object.keys(entries).forEach(key => entries[key] = [entries[key], script]);
  return entries;
}

function qnd(
  source: string | Object,
  dirname: string,
  output: string = '/dist',
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
      entry: entry ? entry : generateEntry(source, hotMiddlewareScript),
      output: {
        path: dirname,
        publicPath: output,
        filename: filename ? filename : '[name].js'
      },
      devtool: sourceMaps ? 'source-map' : 'eval',
      stats: {
        colors: true
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    };

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
  };
}

export default qnd;
