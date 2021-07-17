#!/usr/bin/env node

import '@virtualpatterns/mablung-source-map-support/install'
import Command from 'commander'
import FileSystem from 'fs-extra'
import JSON5 from 'json5'
// import Update from 'npm-check-updates'

const Process = process
const Require = __require

const Package = JSON5.parse(FileSystem.readFileSync(Require.resolve('../../../package.json')), { 'encoding': 'utf-8' })

Command
  .version(Package.version)

Command
  .command('get-path')
  .description('Return the path of the makefile.')
  .action(() => {

    process.exitCode = 0

    try {
      console.log(Require.resolve('../../../makefile'))
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }

  })

// Command
//   .command('get-update')
//   .description('Return the version of the available update or nothing if none is available.')
//   .action(async () => {

//     process.exitCode = 0

//     try {

//       let update = await Update.run({
//         'filter': Package.name,
//         'packageFile': `${Process.cwd()}/package.json`
//       })

//       if (update[Package.name]) {
//         console.log(update[Package.name])
//       }

//     } catch (error) {
//       console.error(error)
//       process.exitCode = 1
//     }

//   })

Command
  .parse(Process.argv)
