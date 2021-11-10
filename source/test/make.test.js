import { CreateLoggedProcess, SpawnedProcess } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const LogPath = FilePath.replace('/release/', '/data/').replace(/\.c?js$/, '.log')
const Process = process

const LoggedProcess = CreateLoggedProcess(SpawnedProcess, LogPath)

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  await FileSystem.remove(LogPath)
})

Test.serial('default', async (test) => {
  let process = new LoggedProcess(Process.env.MAKE_PATH, [])
  test.is(await process.whenExit(), 0)
})

Test.serial('null', async (test) => {
  // an invalid target fails
  let process = new LoggedProcess(Process.env.MAKE_PATH, [ 'null' ])
  test.is(await process.whenExit(), 2)
})

Test.serial('version', async (test) => {
  let process = new LoggedProcess(Process.env.MAKE_PATH, [ 'version' ])
  test.is(await process.whenExit(), 0)
})

Test.serial('build', async (test) => {
  let process = new LoggedProcess(Process.env.MAKE_PATH, [ 'build' ])
  test.is(await process.whenExit(), 0)
})
