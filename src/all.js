const pj = require('prettyjson')
module.exports = (raw, db) => {
  const r = raw && [ '-r', '--raw' ].includes(raw)
  const bms = db
    .get('lnx')
    .value()

  if (!bms || !bms.length) {
    console.log('No bookmarks yet!')
  } else {
    console.log(r ? JSON.stringify(bms, null, 2) : pj.render(bms))
  }
}
