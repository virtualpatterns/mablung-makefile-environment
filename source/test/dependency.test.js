import { Check } from '@virtualpatterns/mablung-check-dependency'

import Test from 'ava'

const Process = process

Test('(default)', async (test) => {

  let dependency = await Check(Process.cwd(), {
    'ignoreMatch': [
      '@babel/eslint-parser',
      'eslint-plugin-babel'
    ]
  })

  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})
