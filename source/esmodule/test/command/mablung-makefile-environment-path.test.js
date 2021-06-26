import Test from 'ava'

import { MablungMakefileEnvironmentPathProcess } from './mablung-makefile-environment-path-process.js'

Test('mablung-makefile-environment-path', async (test) => {
  let process = new MablungMakefileEnvironmentPathProcess()
  test.is(await process.whenExit(), 0)
})
