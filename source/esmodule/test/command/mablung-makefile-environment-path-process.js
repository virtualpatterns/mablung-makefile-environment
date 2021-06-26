import FileSystem from 'fs-extra'
import { ForkedProcess } from '@virtualpatterns/mablung-worker'
import Path from 'path'

const Require = __require

class MablungMakefileEnvironmentPathProcess extends ForkedProcess {

  constructor(parameter = {}, option = {}) {
    super(Require.resolve('../../command/mablung-makefile-environment-path.js'), parameter, option)

    let path = 'process/log/mablung-makefile-environment-path-process.log'
    FileSystem.ensureDirSync(Path.dirname(path))

    this.writeTo(path)

  }

  whenExit() {

    return new Promise((resolve) => {

      let onExit = null

      this.on('exit', onExit = (code) => {

        this.off('exit', onExit)
        onExit = null

        resolve(code)

      })
  
    })

  }
  
}

export { MablungMakefileEnvironmentPathProcess }