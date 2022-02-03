import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

Test('./resource/copy/folder/index.json', async (test) => {
  test.true((await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' })).OK)
})

Test('./resource/copy/index.json', async (test) => {
  test.true((await FileSystem.readJson(Path.resolve(FolderPath, test.title), { 'encoding': 'utf-8' })).OK)
})

Test('./resource/copy/makefile', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(FolderPath, test.title)))
})
