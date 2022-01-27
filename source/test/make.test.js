import { CreateLoggedProcess } from '@virtualpatterns/mablung-worker/test'
import { SpawnedProcess } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const Process = process

const DataPath = FilePath.replace('/release/', '/data/').replace('.test.js', '')
const LogPath = DataPath.concat('.log')
const LoggedProcess = CreateLoggedProcess(SpawnedProcess, LogPath)

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  return FileSystem.remove(LogPath)
})

Test('default', async (test) => {
  let process = new LoggedProcess(Process.env.MAKE_PATH, [])
  test.is(await process.whenExit(), 0)
})

Test('version', async (test) => {
  let process = new LoggedProcess(Process.env.MAKE_PATH, [ '--dry-run', 'version' ])
  test.is(await process.whenExit(), 0)
})

Test('build', async (test) => {
  let process = new LoggedProcess(Process.env.MAKE_PATH, [ '--dry-run', 'build' ])
  test.is(await process.whenExit(), 0)
})
