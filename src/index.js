const xdg = require('xdg-basedir')
const low = require('lowdb')
const { readFileSync } = require('fs')
const FileSync = require('lowdb/adapters/FileSync')
const exit = require('zeelib/lib/exit').default

const args = process.argv.slice(2)

const dbPath = xdg.data + '/lnx.json'
const adapter = new FileSync(dbPath)
const db = low(adapter)

db.defaults({ lnx: [] }).write()

const usage = () => {
  console.log(`
    lnx

    usage:

    lnx -a (--add)
      # add a bookmark directly
      # bookmark must have at least href and title
      # example:
      lnx -a '{"href","http://foo.bar","tags":["one","two"],"title":"foo bar site"}'
    lnx -i (--import)
      # import bookmarks from a pinboard format file
      # example:
      lnx -i ~/Downloads/pinboard_export.json
  `)
}

const addBookmark = (bm) => {
  if (bm) {
    try {
      const b = JSON.parse(bm)
      if (!b.href || !b.title) {
        throw new Error('nope')
      }
      const newBookmark = Object.assign({}, b, { time: new Date().toJSON() })
      db.get('lnx')
        .push(newBookmark)
        .write()
    } catch (_) {
      console.log('Argument is not valid JSON, or is not a valid bookmark.')
      exit(1)
    }
  }
}

const importFromPinboard = (f) => {
  try {
    const pb = readFileSync(f).toString('utf8').trim()
    const p = JSON.parse(pb).map(({ description, tags, meta, hash, ...rest }) => ({
      title: description,
      tags: tags.split(' '),
      ...rest
    }))
    const allPosts = db.get('lnx')
      .concat(p)
      .value()
    db.set('lnx', allPosts).write()
  } catch (_) {
    console.log('Argument is not a valid pinboard export file.')
    exit(1)
  }
}

const handleArgs = () => {
  const firstArg = args[0]
  if (!firstArg || [ '-h', '--help' ].includes(firstArg)) {
    usage()
    exit(0)
  } else if ([ '-a', '-add' ].includes(firstArg)) {
    addBookmark(args[1])
  } else if ([ '-i', '--import' ].includes(firstArg)) {
    importFromPinboard(args[1])
  }
}

module.exports = handleArgs
