import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

import { IndexProcess } from './index-process.js'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const LogPath = Path.resolve(`${FolderPath}/../../../data/header/index.log`)

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  await FileSystem.remove(LogPath)
})

Test('default', async (test) => {
  let process = new IndexProcess(LogPath)
  test.is(await process.whenExit(), 0)
})
