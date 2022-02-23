#!/usr/bin/env node

import { program as Command } from 'commander'
import Path from 'path'
import SourceMapSupport from 'source-map-support'

import { Package } from '../library/package.js'

SourceMapSupport.install({ 'handleUncaughtExceptions': false })

const FolderPath = __folderPath
const Process = process

Command
  .name(Package.name.replace(/^(.*)\/(.*)$/, '$2'))
  .version(Package.version)

Command
  .command('get-version')
  .description('Return the name and version of the @virtualpatterns/mablung-makefile-environment package.')
  .action(() => {

    Process.exitCode = 0

    try {
      console.log(`${Package.name}@${Package.version}`)
    } catch (error) {
      Process.exitCode = 1
      console.error(error)
    }

  })

Command
  .command('get-path')
  .description('Return the path of the @virtualpatterns/mablung-makefile-environment makefile.')
  .action(() => {

    Process.exitCode = 0

    try {
      console.log(Path.resolve(FolderPath, '../../makefile'))
    } catch (error) {
      Process.exitCode = 1
      console.error(error)
    }

  })

Command
  .parse(Process.argv)
