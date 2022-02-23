import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

Test('../file-path-0.cjs', async (test) => {
  test.is(await import(test.title).then((module) => module.FilePath), Path.resolve(FolderPath, test.title))
})

Test('../file-path-0.js', async (test) => {
  test.is(await import(test.title).then((module) => module.FilePath), Path.resolve(FolderPath, test.title))
})

Test('../folder-path.cjs', async (test) => {
  test.is(await import(test.title).then((module) => module.FolderPath), Path.resolve(FolderPath, '..'))
})

Test('../folder-path.js', async (test) => {
  test.is(await import(test.title).then((module) => module.FolderPath), Path.resolve(FolderPath, '..'))
})

Test('../path.cjs', async (test) => {
  test.is(await import(test.title).then((module) => module.Path), './path.js')
})

Test('../path.js', async (test) => {
  test.is(await import(test.title).then((module) => module.Path), './path.js')
})

Test('../resolve.cjs', async (test) => {
  test.is(await import(test.title).then((module) => module.GetFilePath()), Path.resolve(FolderPath, '../file-path-0.cjs'))
})

Test('../resolve.js', async (test) => {
  test.is(await import(test.title).then((module) => module.GetFilePath()), Path.resolve(FolderPath, '../file-path-0.js'))
})
