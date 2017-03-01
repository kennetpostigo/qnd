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
    plugins: [
      cjs({
        include: [
          'node_modules/fbjs/**',
          'node_modules/object-assign/**',
          'node_modules/react/**',
          'node_modules/react-dom/**'
        ]
      }),
      globals(),
      builtins(),
      resolve({
        browser: true,
        module: false
      }),
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
