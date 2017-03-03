// @flow
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

function generateEntry(
  entries: Array<string[]> = [[]],
  script: string
): Object {
  return entries.reduce(
    (acc, curr) => {
      acc[curr[0]] = [curr[1], script];
      return acc;
    },
    {}
  );
}

function qnd(
  sources: Array<string[]>,
  output: string,
  port: number,
  sourceMaps: boolean = false
): void {
  var app = express();
  var hotMiddlewareScript: string = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

  var config = {
    entry: generateEntry(sources, hotMiddlewareScript),
    output: {
      path: output,
      publicPath: '/dist',
      filename: '[name].js'
    },
    devtool: sourceMaps ? 'source-map' : 'eval',
    stats: {
      colors: {
        green: '\u001b[32m'
      }
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
      noInfo: true,
      publicPath: '/'
    })
  );

  app.use(
    hotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
  app.use(express.static(output));

  app.get('*', (req, res) =>
    res.sendFile(path.join(output + '/dist/index.html')));

  app.listen(port || 8000, () => console.log('Listening on %j', port || 8000));
}

export default qnd;
