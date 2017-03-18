const qnd = require('./../dist/qnd.js');
const path = require('path');

qnd({
  entry: {
    kandan: './src/kandan/root.re'
  },
  output: {
    path: path.resolve(__dirname, 'resources/public/js'),
    filename: '[name].js'
  },
  assets: path.resolve(__dirname, 'resources/public'),
  html: path.resolve(__dirname, 'resources/public/index.html'),
  mode: 'production',
  port: 8000
});
