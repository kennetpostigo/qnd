// @flow

var rollup = require('rollup');
var watch = require('rollup-watch');
var serve = require('rollup-plugin-serve');
var livereload = require('rollup-plugin-livereload');

function qnd(src: string, outputName: string, port: number): Function {
  return watch(rollup, {
    entry: src,
    sourceMap: false,
    format: 'umd',
    dest: './dist/' + (outputName || 'bundle.js'),
    plugins: [
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
