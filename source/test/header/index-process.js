import { ForkedProcess } from '@virtualpatterns/mablung-worker'

const Require = __require

class IndexProcess extends ForkedProcess {

  constructor(logPath, parameter = {}, option = {}) {
    super(Require.resolve('../../header/index.js'), parameter, option)
    this.writeTo(logPath)
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

export { IndexProcess }