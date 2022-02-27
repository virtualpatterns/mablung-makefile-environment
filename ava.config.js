export default {
  'failFast': true,
  'files': [
    'release/**/test/**/*.test.*'
  ],
  "nodeArguments": [
    "--experimental-import-meta-resolve"
  ],
  'require': [],
  'verbose': true
}
