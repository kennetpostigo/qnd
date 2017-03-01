import babel from 'rollup-plugin-babel';

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
    babel({
      babelrc: true,
      externalHelpers: false,
      runtimeHelpers: false,
      exclude: 'node_modules/**'
    })
  ],
  external: [],
  globals: {}
};
