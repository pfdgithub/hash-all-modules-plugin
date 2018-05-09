var crypto = require("crypto");
var PLUGIN_NAME = 'HashAllModulesPlugin';

function HashAllModulesPlugin(options) {
  this.options = Object.assign({
    hashFunction: "md4",
    hashDigest: "base64",
    hashDigestLength: 4
  }, options);
}

HashAllModulesPlugin.prototype.apply = function (compiler) {
  var self = this;

  // webpack 4
  if (compiler.hooks) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, function (compilation) {
      const usedIds = new Set();
      compilation.hooks.beforeModuleIds.tap(PLUGIN_NAME, function (modules) {
        self.hash(usedIds, modules);
      });
    });
  }
  else {
    compiler.plugin("compilation", function (compilation) {
      const usedIds = new Set();
      compilation.plugin("before-module-ids", function (modules) {
        self.hash(usedIds, modules);
      });
    });
  }
}

HashAllModulesPlugin.prototype.hash = function (usedIds, modules) {
  var options = this.options;

  modules.forEach(function (module) {
    if (module.id !== null) {
      return;
    }

    const id = module.identifier();
    const hash = crypto.createHash(options.hashFunction);
    hash.update(id);
    const hashId = hash.digest(options.hashDigest);
    let len = options.hashDigestLength;
    while (usedIds.has(hashId.substr(0, len)))
      len++;
    module.id = hashId.substr(0, len);
    usedIds.add(module.id);
  });
}

module.exports = HashAllModulesPlugin;
