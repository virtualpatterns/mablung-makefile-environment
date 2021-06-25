import { Check } from '@virtualpatterns/mablung-check-dependency';
import Is from '@pwn/is';
import Test from 'ava';

const Process = process;

Test('dependency', async (test) => {

  let dependency = await Check(Process.cwd());

  test.true(Is.emptyObject(dependency.missing));
  test.deepEqual(dependency.unused, []);

});

// import Check from 'depcheck'
// import Is from '@pwn/is'
// import Test from 'ava'

// const Process = process

// Test('dependency', async (test) => {

//   let unused = await Check(Process.cwd(), {
//     'ignoreMatches': [
//       '@babel/cli',
//       '@babel/plugin-proposal-export-default-from',
//       '@babel/plugin-syntax-import-meta',
//       '@babel/preset-env',
//       '@virtualpatterns/mablung-babel-plugin-replace-identifier',
//       '@virtualpatterns/mablung-babel-plugin-replace-string-literal',
//       '@virtualpatterns/mablung-makefile',
//       'c8',
//       'npm-check-updates',
//       'shx'
//     ],
//     'parsers': {
//       '**/*.cjs': [Check.parser.es6, Check.parser.es7.default],
//       '**/*.js': [Check.parser.es6, Check.parser.es7.default]
//     }
//   })

//   // test.log(unused)

//   test.deepEqual(unused.dependencies, [])
//   test.deepEqual(unused.devDependencies, [])

//   test.true(Is.emptyObject(unused.invalidDirs))
//   test.true(Is.emptyObject(unused.invalidFiles))
//   test.true(Is.emptyObject(unused.missing))

// })

//# sourceMappingURL=dependency.test.js.map