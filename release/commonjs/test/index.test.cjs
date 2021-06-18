"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _json = _interopRequireDefault(require("json5"));

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const FilePath = __filename;

const FolderPath = _path.default.dirname(FilePath);

const Process = process;
const Require = require;
(0, _ava.default)('commonjs', async test => {
  test.true(await _fsExtra.default.pathExists(`${FolderPath}/../../commonjs`));
});
(0, _ava.default)('esmodule', async test => {
  test.true(await _fsExtra.default.pathExists(`${FolderPath}/../../esmodule`));
});
(0, _ava.default)('MAKEFILE_PATH', test => {
  test.deepEqual(Process.env['MAKEFILE_PATH'].split(' '), [Require.resolve('../../../makefile'), Require.resolve('../../../include/common'), Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/common'), Require.resolve('../../../include/build/common'), Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/build/common'), Require.resolve('../../../include/build/build'), Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/build/build'), Require.resolve('../../../include/build/debug'), Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/build/debug')]);
});
(0, _ava.default)('.babelrc.json', async test => {
  test.false(await _fsExtra.default.pathExists(`${FolderPath}/../../.babelrc.json`));
});
(0, _ava.default)('.eslintrc.json', async test => {
  test.false(await _fsExtra.default.pathExists(`${FolderPath}/../../.eslintrc.json`));
});
(0, _ava.default)("../../resource/index.cjs", async test => {
  test.truthy((await Promise.resolve().then(() => _interopRequireWildcard(require("../../resource/index.cjs")))).OK);
});
(0, _ava.default)('../../resource/index.json', async test => {
  test.true(_json.default.parse(await _fsExtra.default.readFile(Require.resolve('../../resource/index.json'), {
    'encoding': 'utf-8'
  })).OK);
});
(0, _ava.default)('../../resource/copy/makefile', async test => {
  test.false(await _fsExtra.default.pathExists(`${FolderPath}/../../resource/copy/makefile`));
});
(0, _ava.default)('../../resource/copy/index.json', async test => {
  test.true(_json.default.parse(await _fsExtra.default.readFile(Require.resolve('../../resource/copy/index.json'), {
    'encoding': 'utf-8'
  })).OK);
});
(0, _ava.default)('../../resource/empty', async test => {
  test.true(await _fsExtra.default.pathExists(`${FolderPath}/../../resource/empty`));
});
(0, _ava.default)('../../resource/ignore', async test => {
  test.false(await _fsExtra.default.pathExists(`${FolderPath}/../../resource/ignore`));
});
(0, _ava.default)("./resource/index.cjs", async test => {
  test.truthy((await Promise.resolve().then(() => _interopRequireWildcard(require("./resource/index.cjs")))).OK);
});
(0, _ava.default)('./resource/index.json', async test => {
  test.true(_json.default.parse(await _fsExtra.default.readFile(Require.resolve('./resource/index.json'), {
    'encoding': 'utf-8'
  })).OK);
});
(0, _ava.default)('./resource/copy/makefile', async test => {
  test.false(await _fsExtra.default.pathExists(`${FolderPath}/resource/copy/makefile`));
});
(0, _ava.default)('./resource/copy/index.json', async test => {
  test.true(_json.default.parse(await _fsExtra.default.readFile(Require.resolve('./resource/copy/index.json'), {
    'encoding': 'utf-8'
  })).OK);
});
(0, _ava.default)('./resource/ignore', async test => {
  test.false(await _fsExtra.default.pathExists(`${FolderPath}/resource/ignore`));
});

//# sourceMappingURL=index.test.cjs.map