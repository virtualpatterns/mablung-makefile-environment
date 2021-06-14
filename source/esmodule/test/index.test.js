import FileSystem from 'fs-extra'
import JSON5 from 'json5'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Process = process
const Require = __require

Test('commonjs', async (test) => {
  test.true(await FileSystem.pathExists(`${FolderPath}/../../commonjs`))
})

Test('esmodule', async (test) => {
  test.true(await FileSystem.pathExists(`${FolderPath}/../../esmodule`))
})

Test('MAKEFILE_PATH', (test) => {
  test.deepEqual(Process.env['MAKEFILE_PATH'].split(' '), [
    Require.resolve('../../../makefile'),
    Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/common') ,
    Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/build/common') ,
    Require.resolve('../../../include/build/build'),
    Require.resolve('../../../node_modules/@virtualpatterns/mablung-makefile/include/build/debug')
  ])
})

Test('.babelrc.json', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/../../.babelrc.json`))
})

Test('.eslintrc.json', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/../../.eslintrc.json`))
})

Test('index.js', async (test) => {
  test.true((await import('./index.js')).OK)
})

Test('resource/copy/makefile', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/resource/copy/makefile`))
})

Test('resource/copy/index.json', async (test) => {
  test.true(JSON5.parse(await FileSystem.readFile(Require.resolve('./resource/copy/index.json'), { 'encoding': 'utf-8' })).OK)
})

Test('resource/ignore/makefile', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/resource/ignore/makefile`))
})

Test('resource/ignore/index.json', async (test) => {
  test.false(await FileSystem.pathExists(`${FolderPath}/resource/ignore/index.json`))
})
