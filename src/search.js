const { exit } = require('zeelib')
const pj = require('prettyjson')
const { remove } = require('./util')

module.exports = (type, search, db) => {
  try {
    let query = [ ...search ]
    let res
    const rawFilter = query.find((el) => [ '-r', '--raw' ].includes(el))
    if (rawFilter) query = remove(query, rawFilter)
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
      if (rawFilter) {
        console.log(JSON.stringify(res, null, 2))
      } else {
        console.log(pj.render(res, { inlineArrays: true }))
      }
    }
  } catch (_) {
    console.log('Malformed query')
    exit(1)
  }
}
