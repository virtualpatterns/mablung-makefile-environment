import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

const EmptyPathExists = FileSystem.pathExistsSync(Path.resolve(FolderPath, '../../../source/esmodule/test/resource/empty'))

Test('./resource/index.js', async (test) => {
  test.true((await import('./resource/index.js')).OK)
})

Test('./resource/index.json', async (test) => {
  test.true((await FileSystem.readJson(Path.resolve(FolderPath, './resource/index.json'), { 'encoding': 'utf-8' })).OK)
})

Test('./resource/file-path.js', async (test) => {
  test.is((await import('./resource/file-path.js')).FilePath, Path.resolve(FolderPath, './resource/file-path.js'))
})

Test('./resource/folder-path.js', async (test) => {
  test.is((await import('./resource/folder-path.js')).FolderPath, Path.resolve(FolderPath, './resource'))
})

Test('./resource/require.js', async (test) => {
  test.is((await import('./resource/require.js')).FilePath, Path.resolve(FolderPath, './resource/file-path.js'))
})

;(EmptyPathExists ? Test : Test.skip)('./resource/empty', async (test) => {
  test.true(await FileSystem.pathExists(Path.resolve(FolderPath, './resource/empty')))
})

Test('./resource/ignore', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(FolderPath, './resource/ignore')))
})
