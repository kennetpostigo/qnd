# Example

```bash
npm install
```

```bash
npm run qnd
```

build setting:

Run in dev:
```js
qnd('development', './src/fib.re', __dirname)();
```

Create production build:
```js
qnd('production', './src/fib.re', __dirname)();
```