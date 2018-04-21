const { exit } = require('zeelib')

module.exports = (id, db) => {
  try {
    const toRemove = db
      .get('lnx')
      .find({ id })
      .value()

    db
      .get('lnx')
      .remove({ id })
      .write()

    console.log(`Deleted ${toRemove.title}: ${toRemove.href}`)
  } catch (_) {
    console.log(`No bookmark with id ${id} found.`)
    exit(0)
  }
}
