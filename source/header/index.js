import '@virtualpatterns/mablung-makefile/header'

const Process = process

Process.exitCode = 0

try {
  console.log(`Environment: ${Process.env.NODE_ENV}`)
/* c8 ignore next 4 */
} catch (error) {
  Process.exitCode = 1
  console.error(error)
}
