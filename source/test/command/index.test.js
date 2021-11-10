import { CreateLoggedProcess } from '@virtualpatterns/mablung-worker/test'
import { ForkedProcess } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

const LogPath = FilePath.replace('/release/', '/data/').replace(/\.c?js$/, '.log')
const LoggedProcess = CreateLoggedProcess(ForkedProcess, LogPath)

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  return FileSystem.remove(LogPath)
})

Test.serial('default', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'))
  test.is(await process.whenExit(), 1)
})

Test.serial('get-version', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { 'get-version': true })
  test.is(await process.whenExit(), 0)
})

Test.serial('get-path', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { 'get-path': true })
  test.is(await process.whenExit(), 0)
})

Test.serial('update-configuration', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { 'update-configuration': true })
  test.is(await process.whenExit(), 1)
})

Test.serial('update-configuration configuration-0', async (test) => {

  let sourcePath = `${FolderPath}/../../..`
  let sourceCheckPath = `${sourcePath}/.eslintrc.json`
  let sourceCompilePath = `${sourcePath}/babel.config.json`

  let targetPath = `${FolderPath}/resource/configuration-0`
  let targetCheckPath = `${targetPath}/.eslintrc.json`
  let targetCompilePath = `${targetPath}/babel.config.json`

  let [
    sourceCheckConfiguration,
    sourceCompileConfiguration
  ] = await Promise.all([
    FileSystem.readJson(sourceCheckPath, { 'encoding': 'utf-8' }),
    FileSystem.readJson(sourceCompilePath, { 'encoding': 'utf-8' })
  ])

  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { 'update-configuration': targetPath })

  try {

    test.is(await process.whenExit(), 0)

    test.deepEqual(await Promise.all([
      FileSystem.pathExists(targetCheckPath),
      FileSystem.pathExists(targetCompilePath)
    ]), [
      true,
      true
    ])

    let [
      targetCheckConfigurationAfter,
      targetCompileConfigurationAfter
    ] = await Promise.all([
      FileSystem.readJson(targetCheckPath, { 'encoding': 'utf-8' }),
      FileSystem.readJson(targetCompilePath, { 'encoding': 'utf-8' })
    ])

    test.deepEqual(targetCheckConfigurationAfter, sourceCheckConfiguration)
    test.deepEqual(targetCompileConfigurationAfter.presets[0][1].header.exclude, [])

    sourceCompileConfiguration.presets[0][1].header.exclude = []
    test.deepEqual(targetCompileConfigurationAfter, sourceCompileConfiguration)

  } finally {

    await Promise.all([
      FileSystem.remove(targetCheckPath),
      FileSystem.remove(targetCompilePath)
    ])

  }

})

Test.serial('update-configuration configuration-1', async (test) => {

  let sourcePath = `${FolderPath}/../../..`
  let sourceCheckPath = `${sourcePath}/.eslintrc.json`
  let sourceCompilePath = `${sourcePath}/babel.config.json`

  let targetPath = `${FolderPath}/resource/configuration-1`
  let targetCheckPath = `${targetPath}/.eslintrc.json`
  let targetCompilePath = `${targetPath}/babel.config.json`

  let [
    sourceCheckConfiguration,
    sourceCompileConfiguration,
    targetCheckConfigurationBefore,
    targetCompileConfigurationBefore
  ] = await Promise.all([
    FileSystem.readJson(sourceCheckPath, { 'encoding': 'utf-8' }),
    FileSystem.readJson(sourceCompilePath, { 'encoding': 'utf-8' }),
    FileSystem.readJson(targetCheckPath, { 'encoding': 'utf-8' }),
    FileSystem.readJson(targetCompilePath, { 'encoding': 'utf-8' })
  ])

  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { 'update-configuration': targetPath })

  try {

    test.is(await process.whenExit(), 0)

    let [
      targetCheckConfigurationAfter,
      targetCompileConfigurationAfter
    ] = await Promise.all([
      FileSystem.readJson(targetCheckPath, { 'encoding': 'utf-8' }),
      FileSystem.readJson(targetCompilePath, { 'encoding': 'utf-8' })
    ])

    test.deepEqual(targetCheckConfigurationAfter, sourceCheckConfiguration)
    test.deepEqual(targetCompileConfigurationAfter.presets[0][1].header.exclude, targetCompileConfigurationBefore.presets[0][1].header.exclude)

    sourceCompileConfiguration.presets[0][1].header.exclude = []
    targetCompileConfigurationAfter.presets[0][1].header.exclude = []
    test.deepEqual(targetCompileConfigurationAfter, sourceCompileConfiguration)

  } finally {

    await Promise.all([
      FileSystem.writeJson(targetCheckPath, targetCheckConfigurationBefore, { 'encoding': 'utf-8', 'spaces': 2 }),
      FileSystem.writeJson(targetCompilePath, targetCompileConfigurationBefore, { 'encoding': 'utf-8', 'spaces': 2 })
    ])

  }

})
