import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

Test('../index.js', async (test) => {
  test.true((await import(test.title)).OK)
})

Test('../commonjs/test/resource/file-path.cjs', async (test) => {
  test.is((await FileSystem.pathExists(Path.resolve(FolderPath, test.title))), true)
})

Test('../commonjs/test/resource/folder-path.cjs', async (test) => {
  test.is((await FileSystem.pathExists(Path.resolve(FolderPath, test.title))), true)
})

Test('../commonjs/test/resource/require.cjs', async (test) => {
  test.is((await FileSystem.pathExists(Path.resolve(FolderPath, test.title))), true)
})

Test('../file-path.cjs', async (test) => {
  test.is((await import(test.title)).FilePath, Path.resolve(FolderPath, test.title))
})

Test('../file-path.js', async (test) => {
  test.is((await import(test.title)).FilePath, Path.resolve(FolderPath, test.title))
})

Test('../folder-path.cjs', async (test) => {
  test.is((await import(test.title)).FolderPath, Path.resolve(FolderPath, '..'))
})

Test('../folder-path.js', async (test) => {
  test.is((await import(test.title)).FolderPath, Path.resolve(FolderPath, '..'))
})

Test('../path.cjs', async (test) => {
  test.is((await import(test.title)).Path, './path.js')
})

Test('../path.js', async (test) => {
  test.is((await import(test.title)).Path, './path.js')
})

Test('../require.cjs', async (test) => {
  test.is((await import(test.title)).FilePath, Path.resolve(FolderPath, '../file-path.cjs'))
})

Test('../require.js', async (test) => {
  test.is((await import(test.title)).FilePath, Path.resolve(FolderPath, '../file-path.js'))
})
