import FileSystem from 'fs-extra'

const Require = __require

const Package = FileSystem.readJsonSync(Require.resolve('../../package.json'), { 'encoding': 'utf-8' })

export { Package }