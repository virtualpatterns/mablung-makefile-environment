import FileSystem from 'fs-extra'
import Path from 'path'

const FolderPath = __folderPath

export const Package = FileSystem.readJsonSync(Path.resolve(FolderPath, '../../package.json'), { 'encoding': 'utf-8' })
