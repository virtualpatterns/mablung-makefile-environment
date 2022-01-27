import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath

Test('./resource/copy/makefile', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(FolderPath, './resource/copy/makefile')))
})

Test('./resource/copy/index.js', async (test) => {
  test.true((await import('./resource/copy/index.js')).OK)
})

Test('./resource/copy/index.json', async (test) => {
  test.true((await FileSystem.readJson(Path.resolve(FolderPath, './resource/copy/index.json'), { 'encoding': 'utf-8' })).OK)
})

Test('./resource/copy/folder/index.js', async (test) => {
  test.true((await import('./resource/copy/folder/index.js')).OK)
})

Test('./resource/copy/folder/index.json', async (test) => {
  test.true((await FileSystem.readJson(Path.resolve(FolderPath, './resource/copy/folder/index.json'), { 'encoding': 'utf-8' })).OK)
})
