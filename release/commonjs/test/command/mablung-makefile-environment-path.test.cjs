"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _mablungMakefileEnvironmentPathProcess = require("./mablung-makefile-environment-path-process.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava.default)('mablung-makefile-environment-path', async test => {
  let process = new _mablungMakefileEnvironmentPathProcess.MablungMakefileEnvironmentPathProcess();
  test.is(await process.whenExit(), 0);
});

//# sourceMappingURL=mablung-makefile-environment-path.test.cjs.map