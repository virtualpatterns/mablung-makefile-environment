import { Check } from '@virtualpatterns/mablung-check-dependency'
import Test from 'ava'

Test('default', async (test) => {

  let dependency = await Check()

  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})
