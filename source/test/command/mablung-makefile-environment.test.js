import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

import { Package } from '../../library/package.js'

import { MablungMakefileEnvironmentProcess } from './mablung-makefile-environment-process.js'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)

Test('(default)', async (test) => {
  let process = new MablungMakefileEnvironmentProcess()
  test.is(await process.whenExit(), 1)
})

Test('get-version', async (test) => {
  let process = new MablungMakefileEnvironmentProcess({ 'get-version': true })
  test.is(await process.whenExit(), 0)
})

Test('get-path', async (test) => {
  let process = new MablungMakefileEnvironmentProcess({ 'get-path': true })
  test.is(await process.whenExit(), 0)
})

Test('update-package', async (test) => {
  let process = new MablungMakefileEnvironmentProcess({ 'update-package': true })
  test.is(await process.whenExit(), 1)
})

Test('update-package [path]', async (test) => {

  let _path = `${FolderPath}/resource/package.json`

  let process = new MablungMakefileEnvironmentProcess({ 'update-package': _path })
  test.is(await process.whenExit(), 0)

  let _package = await FileSystem.readJson(_path, { 'encoding': 'utf-8' })

  test.deepEqual(_package.babel, Package.babel)
  test.deepEqual(_package.eslintConfig, Package.eslintConfig)

})
