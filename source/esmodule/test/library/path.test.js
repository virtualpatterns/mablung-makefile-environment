import Test from 'ava'

import { Path } from '../../index.js'

const Require = __require

Test('Path', (test) => {
  test.is(Path, Require.resolve('../../../../makefile'))
})
