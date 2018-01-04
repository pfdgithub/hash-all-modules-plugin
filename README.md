# hash-all-modules-plugin

[![npm version](https://badge.fury.io/js/hash-all-modules-plugin.svg)](http://badge.fury.io/js/hash-all-modules-plugin) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

Hashs all remaining modules that do not get hashed via HashedModuleIdsPlugin

## Installation

``` bash
npm install --save-dev hash-all-modules-plugin
```

## Usage

webpack.config.js  
```javascript
const webpack = require('webpack');
const HashAllModulesPlugin = require('hash-all-modules-plugin');

module.exports = {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HashAllModulesPlugin()
  ]
}
```

## License

This project is licensed under MIT.