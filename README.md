# CAR FOR YOU Configuration

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

It loads configuration for a specific stage via `dotenv` from `.env/<CONFIG_ENV>`. If no environment is provided it defaults to `NODE_ENV`.

You can add local overrides in `.env/<CONFIG_ENV>.local`. This is useful for temporary or local changes.

## Usage
```
npm install @carforyou/configuration
```

Add the following line to your `.gitignore`
```
/.env/*.local
```

The configuration environment can be passed via `CONFIG_ENV` environment variable:

```
$ CONFIG_ENV=stage-prod npm run dev
```

In a nextjs project, you can call `loadConfiguration()` in `next.config.js` and pass the result to next as `env`, see https://nextjs.org/docs/api-reference/next.config.js/environment-variables - configuration values will be available on `process.env` both client- and server-side

```
const loadConfiguration = require("@carforyou/configuration")
const configuration = loadConfiguration()
module.exports = {
  env: configuration
}
```

In any node process, simply call `loadConfiguration()` in your entry point and access variables on `process.env`.

```
const loadConfiguration = require("@carforyou/configuration")
loadConfiguration()
```

Be aware that you cannot access `process.env` on module level of required files because `require`s will get hoised above the function call to `loadConfiguration()`. Make sure you either pass the configuration as parameter or expose a function:

```
const loadConfiguration = require("@carforyou/configuration")
loadConfiguration()

const { myVar, getMyVar } = require("./test.js") // this gets hoisted above `loadConfiguration()`
myVar        // will be undefined
getMyVar()   // will be populated
```

```
// test.js
module.exports = {
  myVar = process.env.MY_VAR            // will be undefined
  getMyVar = () => process.env.MY_VAR   // will work
}
```

## Development
```
npm run build
```

You can link your local npm package to integrate it with any local project:
```
cd carforyou-configuration-pkg
npm run build

cd carforyou-listings-web
npm link ../carforyou-configuration-pkg/pkg
```

## Release a new version

New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.


## Circle CI

You will need to enable the repository in circle CI ui to be able to build it.

For slack notifications to work you will need to provide the token in circle settings.
