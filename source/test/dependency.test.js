import { Check } from '@virtualpatterns/mablung-check-dependency'
import Test from 'ava'

const Process = process

Test('default', async (test) => {

  let dependency = await Check(Process.cwd(), {
    'ignorePattern': [
      'source/esmodule/test/resource/copy',
      'source/esmodule/test/resource/custom',
      'source/esmodule/test/resource/ignore'
    ]
  })

  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})

Test('section', async (test) => {

  let dependency = await Check(Process.cwd(), {
    'ignoreMatch': [
      '@babel/cli',
      '@babel/core',
      '@babel/plugin-syntax-import-meta',
      '@babel/preset-env',
      '@virtualpatterns/babel-plugin-mablung-replace-identifier',
      '@virtualpatterns/babel-plugin-mablung-replace-string-literal',
      '@virtualpatterns/babel-preset-mablung-makefile',
      '@virtualpatterns/eslint-config-mablung-makefile',
      '@virtualpatterns/mablung-makefile'
    ],
    'ignorePattern': [
      'source/esmodule/test/resource/copy',
      'source/esmodule/test/resource/custom',
      'source/esmodule/test/resource/ignore'
    ]
  })

  test.deepEqual(dependency.section, {})

})
