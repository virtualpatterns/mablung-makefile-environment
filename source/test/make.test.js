import FileSystem from 'fs-extra'
import Shell from 'shelljs'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const LogPath = Path.resolve(`${FolderPath}/../../data/make/make.log`)

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  await FileSystem.remove(LogPath)
})

Test.beforeEach((test) => {
  Shell.exec(`echo "${test.title.replace(/^beforeEach hook for (.*)$/, 'Test.serial(\'$1\', (test) => { ... })')}" >> ${LogPath}`, { 'silent': true })
})

Test.serial('default', (test) => {
  test.is(Shell.exec(`make --dry-run 1>> ${LogPath} 2>> ${LogPath}`, { 'silent': true }).code, 0)
})

Test.serial('null', (test) => {
  // an invalid target fails
  test.is(Shell.exec(`make --dry-run null 1>> ${LogPath} 2>> ${LogPath}`, { 'silent': true }).code, 2)
})

Test.serial('version', (test) => {
  test.is(Shell.exec(`make --dry-run version 1>> ${LogPath} 2>> ${LogPath}`, { 'silent': true }).code, 0)
})

Test.serial('build', (test) => {
  test.is(Shell.exec(`make --dry-run build 1>> ${LogPath} 2>> ${LogPath}`, { 'silent': true }).code, 0)
})

Test.afterEach(() => {
  Shell.exec(`echo >> ${LogPath}`, { 'silent': true })
})
