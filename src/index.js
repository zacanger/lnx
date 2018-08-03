const xdg = require('xdg-basedir')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { exit } = require('zeelib')
const { args, hasFlag } = require('zrgs')

const dbPath = xdg.data + '/lnx.json'
const adapter = new FileSync(dbPath)
const db = low(adapter)
db.defaults({ lnx: [] }).write()

const usage = require('./usage')
const importFromPinboard = require('./import')
const addBookmark = require('./add')
const searchBookmarks = require('./search')
const deleteBookmark = require('./delete')
const listAll = require('./all')
const uniqBookmarks = require('./uniq')
// const open = require('./open')

// eslint-disable-next-line complexity
const handleArgs = () => {
  const firstArg = args[0]

  if (!firstArg || hasFlag('help')) {
    usage()
    exit(0)
  } else if (hasFlag('list')) {
    listAll(args[1] || false, db)
  } else if (hasFlag('add')) {
    addBookmark(args[1], db)
  } else if (hasFlag('import')) {
    importFromPinboard(args[1], db)
  } else if (hasFlag('search')) {
    searchBookmarks(args[1], args.slice(2), db)
  } else if (hasFlag('delete')) {
    deleteBookmark(args.slice(1), db)
  } else if (hasFlag('uniq') || hasFlag('unique')) {
    uniqBookmarks(db)
  } else {
    usage()
    exit(0)
  }
}

module.exports = handleArgs()
