import { PathExists } from '@virtualpatterns/mablung-makefile-environment/test'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const ReleaseFolderPath = __folderPath
const SourceFolderPath = ReleaseFolderPath.replace('/release/', '/source/').replace('/commonjs/', '/esmodule/')

const EmptyPathExists = FileSystem.pathExistsSync(Path.resolve(SourceFolderPath, 'resource/empty'))

;[
  'CreateId',
  'PathExists'
].forEach((name) => {

  Test(name, async (test) => {
    test.truthy(await import('@virtualpatterns/mablung-makefile-environment/test').then((module) => module[name]))
  })
  
})

Test('../.babelrc.json', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, test.title)))
})

Test('../.eslintrc.json', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, test.title)))
})

Test('../index.js', async (test) => {
  test.true(await import(test.title).then((module) => module.OK))
})

Test('../index.json', async (test) => {
  test.true(await FileSystem.readJson(Path.resolve(ReleaseFolderPath, test.title), { 'encoding': 'utf-8' }).then((content) => content.OK))
})

Test('../file-path-0.js', async (test) => {
  test.is(await import(test.title).then((module) => module.FilePath), Path.resolve(ReleaseFolderPath, test.title))
})

Test('../file-path-1.cjs', async (test) => {
  test.is(await import(test.title).then((module) => module.FilePath), Path.resolve(ReleaseFolderPath, test.title))
})

Test('../folder-path.js', async (test) => {
  test.is(await import(test.title).then((module) => module.FolderPath), Path.resolve(ReleaseFolderPath, '..'))
})

Test('../path.js', async (test) => {
  test.is(await import(test.title).then((module) => module.Path), test.title)
})

Test('../resolve.js', async (test) => {
  test.is(await import(test.title).then((module) => module.GetFilePath()), Path.resolve(ReleaseFolderPath, '../file-path-0.js'))
})

Test('./resource/copy', async (test) => {
  test.true(await PathExists(Path.resolve(SourceFolderPath, test.title), Path.resolve(ReleaseFolderPath, test.title), (sourcePath, targetPath) => /makefile$/.test(sourcePath) ? [] : [ targetPath ]).then(({ exists }) => exists))
})

Test('./resource/custom', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, './resource/custom/.eslintrc.json')))
  test.false(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, './resource/custom/index.js')))
  test.false(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, './resource/custom/makefile')))
  test.true(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, './resource/custom/folder/file')))
})

;(EmptyPathExists ? Test : Test.skip)('./resource/empty', async (test) => {
  test.true(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, test.title)))
})

Test('./resource/ignore', async (test) => {
  test.false(await FileSystem.pathExists(Path.resolve(ReleaseFolderPath, test.title)))
})
