import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

const EmptyPathExists = FileSystem.pathExistsSync(Path.resolve(FolderPath, '../../../source/esmodule/test/resource/empty'))

Test('./resource/index.js', async (test) => {
  test.true((await import(test.title)).OK)
})

Test('./resource/index.json', async (test) => {
  test.true((await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' })).OK)
})

Test('./resource/file-path-0.js', async (test) => {
  test.is((await import(test.title)).FilePath, Path.resolve(FolderPath, test.title))
})

Test('./resource/file-path-1.cjs', async (test) => {
  test.is((await import(test.title)).FilePath, Path.resolve(FolderPath, test.title))
})

Test('./resource/folder-path.js', async (test) => {
  test.is((await import(test.title)).FolderPath, Path.resolve(FolderPath, './resource'))
})

Test('./resource/path.js', async (test) => {
  test.is((await import(test.title)).Path, test.title)
})

Test('./resource/resolve.js', async (test) => {
  test.is(await import(test.title).then((module) => module.GetFilePath()), Path.resolve(FolderPath, './resource/file-path-0.js'))
})

;(EmptyPathExists ? Test : Test.skip)('./resource/empty', async (test) => {
  test.true(await FileSystem.pathExists(Path.resolve(FolderPath, test.title)))
})

Test('./resource/ignore', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(FolderPath, test.title)))
})
