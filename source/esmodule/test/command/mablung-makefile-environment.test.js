import Test from 'ava'

import { MablungMakefileEnvironmentProcess } from './mablung-makefile-environment-process.js'

Test('mablung-makefile-environment get-path', async (test) => {
  let process = new MablungMakefileEnvironmentProcess({ 'get-path': true })
  test.is(await process.whenExit(), 0)
})

Test('mablung-makefile-environment get-upgrade', async (test) => {
  let process = new MablungMakefileEnvironmentProcess({ 'get-upgrade': true })
  test.is(await process.whenExit(), 0)
})
