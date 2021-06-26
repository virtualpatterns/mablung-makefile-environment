"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MablungMakefileEnvironmentPathProcess = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _mablungWorker = require("@virtualpatterns/mablung-worker");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Require = require;

class MablungMakefileEnvironmentPathProcess extends _mablungWorker.ForkedProcess {
  constructor(parameter = {}, option = {}) {
    super(Require.resolve("../../command/mablung-makefile-environment-path.cjs"), parameter, option);
    let path = 'process/log/mablung-makefile-environment-path-process.log';

    _fsExtra.default.ensureDirSync(_path.default.dirname(path));

    this.writeTo(path);
  }

  whenExit() {
    return new Promise(resolve => {
      let onExit = null;
      this.on('exit', onExit = code => {
        this.off('exit', onExit);
        onExit = null;
        resolve(code);
      });
    });
  }

}

exports.MablungMakefileEnvironmentPathProcess = MablungMakefileEnvironmentPathProcess;

//# sourceMappingURL=mablung-makefile-environment-path-process.cjs.map