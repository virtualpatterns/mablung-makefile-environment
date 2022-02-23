import Path from 'path'
import Test from 'ava'

const FolderPath = __folderPath
const Process = process

Test('MAKEFILE_PATH', (test) => {
  test.not(Process.env.MAKEFILE_PATH, undefined)
  test.deepEqual(Process.env.MAKEFILE_PATH.split(' '), [
    Path.resolve(FolderPath, '../../makefile'),
    Path.resolve(FolderPath, '../../include/common'),
    Path.resolve(FolderPath, '../../node_modules/@virtualpatterns/mablung-makefile/include/common'),
    Path.resolve(FolderPath, '../../include/build'),
    Path.resolve(FolderPath, '../../node_modules/@virtualpatterns/mablung-makefile/include/build'),
    Path.resolve(FolderPath, '../../node_modules/@virtualpatterns/mablung-makefile/include/clean')
  ])
})
