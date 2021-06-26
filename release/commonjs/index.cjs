"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("./library/path.cjs");

Object.keys(_path).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _path[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _path[key];
    }
  });
});

//# sourceMappingURL=index.cjs.map