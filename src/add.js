const { exit } = require('zeelib')

module.exports = (bm, db) => {
  if (bm) {
    try {
      const b = JSON.parse(bm)
      if (!b.href || !b.title) throw new Error('Malformed bookmark')
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
