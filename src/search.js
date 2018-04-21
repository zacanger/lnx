const { exit } = require('zeelib')

module.exports = (type, query, db) => {
  try {
    let res
    if (type === 'tags') {
      res = db
        .get('lnx')
        .value()
        .filter((bm) => query.every((el) => bm.tags.includes(el)))
    } else {
      res = db
        .get('lnx')
        .find({ [type]: query[0] })
        .value()
    }
    if (!res) {
      console.log(`No bookmarks with ${type} of ${query}`)
    } else {
      console.log(res)
    }
  } catch (_) {
    console.log(_)
    console.log('Malformed query')
    exit(1)
  }
}
