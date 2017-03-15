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
var qnd = require('qnd');

qnd('development', './path/to/app.re', __dirname)();
```

In your `index.html` add the following:
```html
<script src="bundle.js"></script>
```

Then in your `package.json` add a script to your npm scripts section:
```js
"scripts": {
  ...
  "qnd": "node qnd.js"
}
```

If you want to create a production bundle:

```js
qnd('production', './path/to/app.re', __dirname)();
```

If not specified qnd assumes/defaults emits its output into a `dist` folder. qnd also assumes that your `index.html` file is in the `dist` folder. The `index.html` is served when hitting `/`, if your `index.html` is not in dist make sure to specify where it is.

#### More examples

```js
var qnd = require('qnd');
// If you have multiple entry points pass an object
// The name of the ouput from qnd will be named after the key
qnd(
  'development', 
  {
    app: './path/to/app.re',
    app2: './path/to/app.re'
  }, 
  __dirname, 
  'ouput', // location you want to place qnd output
  '/public/index.html' // location of the index.html file being served
  )(8001, true); // change the port number to 8001 and set sourceMaps to be generated
```

### API
The `qnd` function takes your application entry settings. It then returns a function which 
takes devserver options. More often then not you will not need to configure settings for the devserver because it has sane defaults.

```js
qnd(build: 'development' | 'production', sources: string, dirname: string, output: string, html: string)(
  port: number, sourceMaps: boolean
)
```

`build`: whether you want to run qnd in production or development.

`sources`: the entry file(s) to your application source.

`dirname`: root direcroty name of the current application. 

`output[optional]`: the location you want to place the output from `qnd`. Defaults to `/dist`.

`html[optional]`: the location of your `index.html`. Defaults to `/dist/index.html`.

`port[optional]`: the port you want the development server to run on. Defaults to `8000`. Example value: `3000`.

`sourceMaps[optional]`: application source maps to original code. Defaults to `false`.

### License
MIT