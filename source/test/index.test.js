import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

Test('../index.js', async (test) => {
  test.true((await import(test.title)).OK)
})

Test('../commonjs', async (test) => {

  async function pathExists(path) {

    let item = await FileSystem.readdir(path, { 'encoding': 'utf-8', 'withFileTypes': true })

    let folder = item
      .filter((item) => item.isDirectory())
      .map((folder) => pathExists(Path.resolve(path, folder.name)))

    let file = item
      .filter((item) => item.isFile())
      .map((file) => { 

        let _path = Path.resolve(path
          .replace('/esmodule', '/commonjs'), file.name
          .replace(/\.js$/, '.cjs')
          .replace(/\.js.map$/, '.cjs.map'))

        return FileSystem.pathExists(_path)
          .then((_exists) => ({ 'path': _path, 'exists': _exists }))

      })

    return Promise.all([ ...folder, ...file ])

  }

  let result = await pathExists(Path.resolve(FolderPath, '../esmodule'))
    .then((result) => result
      .flat(Infinity)
      .reduce((result, item) => result.exists ? item : result, { 'exists': true }))
  
  // test.log(result)
  test.true(result.exists)

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

Test('../resolve.cjs', async (test) => {
  test.is(await import(test.title).then((module) => module.FilePath).then((path) => path), Path.resolve(FolderPath, '../file-path.cjs'))
})

Test('../resolve.js', async (test) => {
  test.is(await import(test.title).then((module) => module.FilePath).then((path) => path), Path.resolve(FolderPath, '../file-path.js'))
})
