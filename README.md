# qnd
> Quick and Dirty development builds for reason

`qnd` provides some additional functionality while developing on the web with reason. `qnd` includes hot reloading, devserver, runtime error overlay and fancy console errors out of the box. `qnd` utilizes [webpack](https://github.com/webpack/webpack) under the hood in order to provide this functionality but imposes no knowledge of webpack.

### Install
```bash
yarn add qnd -D

# OR

npm install qnd --save-dev
```

### Usage

To get started with `qnd` all you need to do is create a file and pass your app entry and the project `__dirname`. Then it will start a server at port `8000`:
```js
// qnd.js
const qnd = require('qnd');

qnd({
  dirname: __dirname,
  entry: {
    myApp: './path/to/app/root.re'
  },
  output: 'path/to/output',
  assets: 'path/to/assets',
  html: 'path/to/html/index.html'
});
```

In your `index.html` add the following:
```html
<script src="myApp.js"></script>
```

Then in your `package.json` add a script to your npm scripts section:
```js
"scripts": {
  ...
  "start": "node qnd.js"
}
```

### Options
The `qnd` function takes your application entry settings as a config object.

```js
qnd({
  dirname: __dirname,
  entry: string | Object,
  output: string,
  assets: string,
  html: string,
  mode?: 'production' | 'development',,
  sourcemaps?: boolean,
  overlay?: boolean
});
```
`dirname`: root direcroty name of the current application. 

`entry`: the entry file(s) to your application source.

`output`: the location you want to place the output from `qnd`.

`assets`: the location of your assets.

`html`: the location of your `index.html`.

`mode`: whether you want to run qnd in production or development.

`port[optional]`: the port you want the development server to run on. Defaults to `8000`. Example value: `3000`.

`sourceMaps[optional]`: application source maps to original code. Defaults to `false`.

`overlay[optional]`: development overlay that propogates errors on screen. Defaults to `true`.

### License
MIT