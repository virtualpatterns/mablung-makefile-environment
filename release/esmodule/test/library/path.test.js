import { createRequire as _createRequire } from "module";import Test from 'ava';

import { Path } from '../../index.js';

const Require = _createRequire(import.meta.url);

Test('Path', (test) => {
  test.is(Path, Require.resolve('../../../../makefile'));
});

//# sourceMappingURL=path.test.js.map