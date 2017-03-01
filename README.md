# qnd
> Quick and Dirty development builds for reason

`qnd` provides some additional functionality while developing on the web with reason. Mainly live reload on changes to your code. `qnd` utilizes [rollup](https://github.com/rollup/rollup) under the hood in order to provide this functionality but imposes no knowledge of rollup.

### Install
```bash
yarn add qnd -D

# OR

npm install qnd --save-dev
```

### Usage

To get started with `qnd` all you need to do is create a file:
```js
var qnd = require('qnd');

qnd.qnd('./src/index.js')
```
// index.js
Then in your `package.json` add a script to you scripts section:
```js
"scripts": {
  ...
  "qnd": "node index.js"
}
```

### API
```js
qnd(src: string, outputName: string, port: number)
```
`src`: the entry file to your application source.


`outputName`: the name of the output file that qnd creates. Defaults to `bundle.js`. Example value: `index.js`.


`port`: the port you want the development server to run on. Defaults to `8000`. Example value: `3000`.

### License
MIT