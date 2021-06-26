"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _index = require("../../index.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Require = require;
(0, _ava.default)('Path', test => {
  test.is(_index.Path, Require.resolve('../../../../makefile'));
});

//# sourceMappingURL=path.test.cjs.map