import Shell from 'shelljs'
import BaseTest from 'ava'

import { Package } from '../library/package.js'

const Test = BaseTest.serial

Test('(default)', (test) => {

  let result = Shell.exec('make', { 'silent': true })
  let stdout = result.stdout.split('\n')

  test.is(result.code, 0)
  test.true(stdout.includes(`${Package.name}@${Package.version}`))

})

Test('version', (test) => {

  let result = Shell.exec('make version', { 'silent': true })
  let stdout = result.stdout.split('\n')

  test.is(result.code, 0)
  test.true(stdout.includes(`${Package.name}@${Package.version}`))

})

Test('build (dry-run)', (test) => {

  let result = Shell.exec('make --dry-run build', { 'silent': true })
  let stdout = result.stdout.split('\n')

  test.is(result.code, 0)

  test.true(stdout.includes('npx shx mkdir -p release/esmodule'))
  test.true(stdout.includes('npx shx mkdir -p release/commonjs'))

})

Test('build exclude-folder=... (dry-run)', (test) => {

  let result = Shell.exec('make --dry-run build exclude-folder=source/esmodule/test', { 'silent': true })
  let stdout = result.stdout.split('\n')

  test.is(result.code, 0)

  test.true(stdout.includes('npx shx mkdir -p release/esmodule'))
  test.true(stdout.includes('npx shx mkdir -p release/commonjs'))
  test.false(stdout.includes('npx shx mkdir -p release/esmodule/test'))
  test.false(stdout.includes('npx shx mkdir -p release/commonjs/test'))

})
