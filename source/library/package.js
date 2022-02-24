import FileSystem from 'fs-extra'
import Json from 'json5'
import Path from 'path'

const FolderPath = __folderPath

export const Package = Json.parse(FileSystem.readFileSync(Path.resolve(FolderPath, '../../package.json'), { 'encoding': 'utf-8' }))
