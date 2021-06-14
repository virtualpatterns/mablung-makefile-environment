"use strict";

var _depcheck = _interopRequireDefault(require("depcheck"));

var _is = _interopRequireDefault(require("@pwn/is"));

var _ava = _interopRequireDefault(require("ava"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Process = process;
(0, _ava.default)('dependency', async test => {
  let unused = await (0, _depcheck.default)(Process.cwd(), {
    'ignoreMatches': ['@babel/cli', '@babel/plugin-proposal-export-default-from', '@babel/plugin-syntax-import-meta', '@babel/preset-env', '@virtualpatterns/mablung-babel-plugin-replace-identifier', '@virtualpatterns/mablung-babel-plugin-replace-string-literal', '@virtualpatterns/mablung-makefile', 'c8', 'npm-check-updates', 'shx'],
    'parsers': {
      '**/*.cjs': [_depcheck.default.parser.es6, _depcheck.default.parser.es7.default],
      '**/*.js': [_depcheck.default.parser.es6, _depcheck.default.parser.es7.default]
    }
  }); // test.log(unused)

  test.deepEqual(unused.dependencies, []);
  test.deepEqual(unused.devDependencies, []);
  test.true(_is.default.emptyObject(unused.invalidDirs));
  test.true(_is.default.emptyObject(unused.invalidFiles));
  test.true(_is.default.emptyObject(unused.missing));
});

//# sourceMappingURL=dependency.test.cjs.map