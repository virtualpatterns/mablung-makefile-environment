import { CreateRandomId } from '@virtualpatterns/mablung-makefile-environment/test'
import { LoggedSpawnedProcess } from '@virtualpatterns/mablung-worker/test'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const Process = process

const DataPath = FilePath.replace('/release/', '/data/').replace('.test.js', '')

Test.before(() => {
  return FileSystem.emptyDir(DataPath)
})

Test.beforeEach(async (test) => {

  let id = await CreateRandomId()
  let logPath = Path.resolve(DataPath, `${id}.log`)

  test.context.logPath = logPath

})

Test('default', async (test) => {
  let process = new LoggedSpawnedProcess(test.context.logPath, Process.env.MAKE_PATH, [])
  test.is(await process.whenExit(), 0)
})

Test('version', async (test) => {
  let process = new LoggedSpawnedProcess(test.context.logPath, Process.env.MAKE_PATH, [ '--dry-run', 'version' ])
  test.is(await process.whenExit(), 0)
})

Test('build', async (test) => {
  let process = new LoggedSpawnedProcess(test.context.logPath, Process.env.MAKE_PATH, [ '--dry-run', 'build' ])
  test.is(await process.whenExit(), 0)
})
