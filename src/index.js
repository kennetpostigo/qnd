// @flow

var rollup = require('rollup');
var watch = require('rollup-watch');
var serve = require('rollup-plugin-serve');
var livereload = require('rollup-plugin-livereload');
var globals = require('rollup-plugin-node-globals');
var builtIns = require('rollup-plugin-node-builtins');
var nodeResolve = require('rollup-plugin-node-resolve');

function qnd(src: string, outputName: string, port: number): Function {
  return watch(rollup, {
    entry: src,
    sourceMap: false,
    format: 'umd',
    dest: './dist/' + (outputName || 'bundle.js'),
    plugins: [
      nodeResolve(),
      globals(),
      builtIns(),
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
