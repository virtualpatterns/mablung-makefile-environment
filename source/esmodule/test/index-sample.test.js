import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

Test('../sample.babelrc.json', async (test) => {
  test.true(await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' }).then((content) => content.OK))
})

Test('../sample.DS_Store', async (test) => {
  test.true(await FileSystem.pathExists(Path.resolve(FolderPath, test.title)))
})

Test('../sample.eslintrc.json', async (test) => {
  test.true(await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' }).then((content) => content.OK))
})

// Test('./resource/sample.babelrc.json', async (test) => {
//   test.true(await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' }).then((content) => content.OK))
// })

// Test('./resource/sample.DS_Store', async (test) => {
//   test.true(await FileSystem.pathExists(Path.resolve(FolderPath, test.title)))
// })

// Test('./resource/sample.eslintrc.json', async (test) => {
//   test.true(await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' }).then((content) => content.OK))
// })
