import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';

var dest = 'dist/qnd.js';
var destES = 'dist/qnd.es.js';
var sourceMap = true;

if (process.env.NODE_ENV === 'production') {
  dest = 'dist/qnd.min.js';
  destES = 'dist/qnd.min.es.js';
  sourceMap = false;
}

export default {
  entry: 'src/index.js',
  moduleName: 'qnd',
  targets: [{ dest: dest, format: 'umd' }, { dest: destES, format: 'es' }],
  sourceMap,
  plugins: [
    builtins(),
    babel({
      babelrc: true,
      externalHelpers: false,
      runtimeHelpers: false,
      exclude: 'node_modules/**'
    })
  ],
  external: [
    // 'path',
    'express',
    'webpack',
    'webpack-dev-middleware',
    'webpack-hot-middleware'
  ],
  globals: {
    // path: 'path',
    express: 'express',
    webpack: 'webpack',
    'webpack-dev-middleware': 'devMiddleware',
    'webpack-hot-middleware': 'hotMiddleware'
  }
};
