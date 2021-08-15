#!/usr/bin/env node

import '@virtualpatterns/mablung-source-map-support/install'

import Clone from 'clone'
import Command from 'commander'
import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import Path from 'path'

import { Package } from '../library/package.js'

import { UpdatePackageError } from './error/update-package-error.js'

const Process = process
const Require = __require

Command
  .version(Package.version)

Command
  .command('get-version')
  .description('Return the name and version of the makefile package.')
  .action(() => {

    process.exitCode = 0

    try {
      console.log(`${Package.name}@${Package.version}`)
    /* c8 ignore next 4 */
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }

  })

Command
  .command('get-path')
  .description('Return the path of the makefile.')
  .action(() => {

    process.exitCode = 0

    try {
      console.log(Require.resolve('../../makefile'))
    /* c8 ignore next 4 */
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }

  })

Command
  .command('update-package')
  .argument('[path]', 'Path to update', './package.json')
  .description('Update the babel and eslintConfig keys of the package.json at the given path.')
  .action(async (path) => {

    process.exitCode = 0

    try {

      let _path = Require.resolve(Path.resolve(path))
      let _package = await FileSystem.readJson(_path, { 'encoding': 'utf-8' })

      if (_package.name !== Package.name) {

        let sourceConfiguration = null
        sourceConfiguration = Clone(Package.babel)

        sourceConfiguration.presets[0][1].header.exclude = []

        let targetConfiguration = null
        targetConfiguration = Clone(_package.babel || { 'presets': [ [ '@virtualpatterns/babel-preset-mablung-makefile', { 'header': { 'exclude': [] } } ] ] })

        let targetExclude = null
        targetExclude = targetConfiguration.presets[0][1].header.exclude
        targetExclude = Is.array(targetExclude) ? targetExclude : [ targetExclude ]

        sourceConfiguration.presets[0][1].header.exclude.push(...targetExclude)

        _package.babel = sourceConfiguration

        sourceConfiguration = Clone(Package.eslintConfig)

        _package.eslintConfig = sourceConfiguration

        await FileSystem.writeJson(_path, _package, { 'encoding': 'utf-8', 'spaces': 2 })

      } else {
        throw new UpdatePackageError(path)
      }

    /* c8 ignore next 4 */
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }

  })

Command
  .parse(Process.argv)
