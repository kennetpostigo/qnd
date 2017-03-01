// @flow

var rollup = require('rollup');
var watch = require('rollup-watch');
var serve = require('rollup-plugin-serve');
var livereload = require('rollup-plugin-livereload');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var resolve = require('rollup-plugin-node-resolve');
var cjs = require('rollup-plugin-commonjs');

function qnd(
  src: string,
  outputName: string,
  port: number,
  sourceMaps: boolean = false
): Function {
  return watch(rollup, {
    entry: src,
    sourceMap: sourceMaps,
    format: 'iife',
    dest: './dist/' + (outputName || 'bundle.js'),
    external: ['react', 'react-dom'],
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    plugins: [
      resolve({
        browser: true,
        main: true
      }),
      cjs({
        include: ['node_modules/**'],
        exclude: ['node_modules/react/**'],
        extensions: ['.js'],
        ignoreGlobal: false,
        sourceMap: sourceMaps,
        namedExports: {
          // './node_modules/react/lib/React.js': ['react'],
          // './node_modules/react/React.js': ['react'],
          './node_modules/react/lib/React.js': ['React']
          // './node_modules/react/React.js': ['React']
        }
      }),
      globals(),
      builtins(),
      serve({
        contentBase: 'dist',
        historyApiFallback: true,
        host: 'localhost',
        port: port || 8000
      }),
      livereload()
    ]
  });
}

exports.qnd = qnd;
