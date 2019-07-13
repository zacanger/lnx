const { open } = require('zeelib')

module.exports = (id, db) => {
  try {
    const bm = db.get('lnx').find({ id }).value().href
    open(bm)
  } catch (_) {
    console.log('Malformed bookmark or no default application')
    process.exit(1)
  }
}
