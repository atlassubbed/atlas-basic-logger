# atlas-basic-logger

A very simple debug logger.

---

## install

```
npm install --save atlas-basic-logger
```

## why

I just need a simple error-first `Logger` which lets me avoid using `console.log` (for testability), while making my business logic cleaner and more concise.

## examples

Both debug and concise mode can be used to do error-first logging. If an error is passed to the logger, it'll print it (or just the `message` in concise mode), otherwise it'll attempt to print the second argument.

#### debug mode

This will print the error to stderr, if it exists, otherwise it will print the full result to stdout, if it exists.

```javascript
const Logger = require("atlas-basic-logger");
const isDebug = true;
const log = Logger(isDebug)
reddit.deleteAccount("atlassubbed", (err, res) => {
  log(err, res)
})
// or, in fewer lines
reddit.deleteAccount("atlassubbed", log)
```

#### concise mode

This will print the error's `message` to stderr, if it exists, otherwise it will print the full result to stdout, if it exists.

```javascript
...
const isDebug = false;
const log = Logger(isDebug)
reddit.deleteAccount("atlassubbed", (err, res) => {
  log(err, res)
})
// or, in fewer lines
reddit.deleteAccount("atlassubbed", log)
```