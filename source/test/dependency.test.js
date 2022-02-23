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
