#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _json = _interopRequireDefault(require("json5"));

var _path = require("../library/path.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Process = process;
const Require = require;

const Package = _json.default.parse(_fsExtra.default.readFileSync(Require.resolve('../../../package.json')), {
  'encoding': 'utf-8'
});

_commander.default.version(Package.version).action(() => {
  try {
    console.log(_path.Path);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
});

_commander.default.parse(Process.argv);

//# sourceMappingURL=mablung-makefile-environment-path.cjs.map