import Path from 'path'
import Test from 'ava'

import { PathCompare } from './path-compare.js'

const ReleaseFilePath = __filePath
const ReleaseFolderPath = Path.dirname(ReleaseFilePath)
const SourceFolderPath = ReleaseFolderPath.replace('/release/', '/source/').replace('/commonjs/', '/esmodule/')

Test(`${Path.relative('', Path.resolve(ReleaseFolderPath, './path-compare.js'))} returns true`, async (test) => {

  let sourcePath = Path.resolve(ReleaseFolderPath, './path-compare.js')
  let item = await PathCompare(sourcePath)
    
  test.is(item.path, sourcePath)
  test.true(item.exists)

})

Test(`${Path.relative('', ReleaseFolderPath)} returns true`, async (test) => {

  let sourcePath = ReleaseFolderPath
  let item = await PathCompare(sourcePath)

  test.is(item.path, sourcePath)
  test.true(item.exists)

})

Test(`${Path.relative('', ReleaseFolderPath)} vs ${Path.relative('', SourceFolderPath)} returns false`, async (test) => {

  let sourcePath = ReleaseFolderPath
  let targetPath = SourceFolderPath
  let item = await PathCompare(sourcePath, targetPath)

  // test.log(item)
  test.false(item.exists)

})

Test(`${Path.relative('', ReleaseFolderPath)} vs ${Path.relative('', SourceFolderPath)} returns true`, async (test) => {

  let sourcePath = ReleaseFolderPath
  let targetPath = SourceFolderPath
  let item = await PathCompare(sourcePath, targetPath, (sourcePath, targetPath) => /\.map$/.test(targetPath) ? [] : [ targetPath.replace(/\.cjs$/, '.js') ])

  // test.log(item)
  test.is(item.path, targetPath)
  test.true(item.exists)

})

Test(`${Path.relative('', SourceFolderPath)} vs ${Path.relative('', ReleaseFolderPath)} returns true`, async (test) => {

  let sourcePath = SourceFolderPath
  let targetPath = ReleaseFolderPath
  let item = await PathCompare(sourcePath, targetPath, (sourcePath, targetPath) => {

    switch (true) {
      case /\.cjs$/.test(ReleaseFilePath):
        return [
          targetPath.replace('/esmodule/', '/commonjs/').replace(/\.js$/, '.cjs'),
          targetPath.replace('/esmodule/', '/commonjs/').replace(/\.js$/, '.cjs.map')
        ]
      default:
        return [
          targetPath,
          targetPath.replace(/\.js$/, '.js.map')
        ]
    }

  })

  // test.log(item)
  test.is(item.path, targetPath)
  test.true(item.exists)

})
