import Is from '@pwn/is'
import Path from 'path'

import { IndexError } from './index-error.js'

class UpdateError extends IndexError {

  constructor(path) {
    super(`Unable to update the path '${Is.equal(Path.relative('', path), '') ? path : Path.relative('', path)}'.`)
  }

}

export { UpdateError }
