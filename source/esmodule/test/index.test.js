import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Process = process
const Require = __require

Test('MAKEFILE_PATH', (test) => {
  test.deepEqual(Process.env.MAKEFILE_PATH.split(' '), [
    Require.resolve('../../../makefile'),
    Require.resolve('../../../include/common'),
    Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/common') ,
    Require.resolve('../../../include/build'),
    Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/build'),
    Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/debug')
  ])
})

Test('commonjs/test/resource/index.cjs', async (test) => {
  test.true(await FileSystem.pathExists(`${FolderPath}/../../commonjs/test/resource/index.cjs`))
})

Test('esmodule/test/resource/index.js', async (test) => {
  // Require.resolve(...) fails since the plugin converts the .js to .cjs
  test.true(await FileSystem.pathExists(`${FolderPath}/../../esmodule/test/resource/index.js`))
})

Test('resource/index.js', async (test) => {
  test.truthy((await import('./resource/index.js')).OK)
})

Test('resource/index.json', async (test) => {
  test.true((await FileSystem.readJson(Require.resolve('./resource/index.json'), { 'encoding': 'utf-8' })).OK)
})

Test('resource/sample.babelrc.json', async (test) => {
  test.true((await FileSystem.readJson(Require.resolve('./resource/sample.babelrc.json'), { 'encoding': 'utf-8' })).OK)
})

Test('resource/sample.DS_Store', async (test) => {
  test.true(await FileSystem.pathExists(Require.resolve('./resource/sample.DS_Store')))
})

Test('resource/sample.eslintrc.json', async (test) => {
  test.true((await FileSystem.readJson(Require.resolve('./resource/sample.eslintrc.json'), { 'encoding': 'utf-8' })).OK)
})

Test('resource/copy/makefile', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/resource/copy/makefile`))
})

Test('resource/copy/index.json', async (test) => {
  test.true((await FileSystem.readJson(Require.resolve('./resource/copy/index.json'), { 'encoding': 'utf-8' })).OK)
})

Test('resource/ignore', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/resource/ignore`))
})
