const qnd = require('qnd');

qnd({
  dirname: __dirname,
  entry: {
    kandan: './src/root.re'
  },
  output: 'resources/public/js',
  assets: 'resources/public',
  html: 'resources/public/index.html'
});
