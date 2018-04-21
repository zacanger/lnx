const xdg = require('xdg-basedir')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { exit } = require('zeelib')

const args = process.argv.slice(2)

const dbPath = xdg.data + '/lnx.json'
const adapter = new FileSync(dbPath)
const db = low(adapter)
db.defaults({ lnx: [] }).write()

const usage = require('./usage')
const importFromPinboard = require('./import')
const addBookmark = require('./add')
const searchBookmarks = require('./search')
// const open = require('./open')

const handleArgs = () => {
  const firstArg = args[0]
  if (!firstArg || [ '-h', '--help' ].includes(firstArg)) {
    usage()
    exit(0)
  } else if ([ '-a', '-add' ].includes(firstArg)) {
    addBookmark(args[1], db)
  } else if ([ '-i', '--import' ].includes(firstArg)) {
    importFromPinboard(args[1], db)
  } else if ([ '-s', '--search' ].includes(firstArg)) {
    searchBookmarks(args[1], args.slice(2), db)
  } else {
    usage()
    exit(0)
  }
}

module.exports = handleArgs
