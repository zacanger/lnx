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
const deleteBookmark = require('./delete')
const listAll = require('./all')
const uniqBookmarks = require('./uniq')
const { argIn } = require('./util')
// const open = require('./open')

const handleArgs = () => {
  const firstArg = args[0]
  const incl = argIn(firstArg)
  if (!firstArg || incl([ '-h', '--help' ])) {
    usage()
    exit(0)
  } else if (incl([ '-l', '--list' ])) {
    listAll(args[1] || false, db)
  } else if (incl([ '-a', '--add' ])) {
    addBookmark(args[1], db)
  } else if (incl([ '-i', '--import' ])) {
    importFromPinboard(args[1], db)
  } else if (incl([ '-s', '--search' ])) {
    searchBookmarks(args[1], args.slice(2), db)
  } else if (incl([ '-d', '--delete' ])) {
    deleteBookmark(args.slice(1), db)
  } else if (incl([ '-u', '--unique', '--uniq' ])) {
    uniqBookmarks(db)
  } else {
    usage()
    exit(0)
  }
}

module.exports = handleArgs()
