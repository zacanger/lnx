const exit = require('zeelib/lib/exit').default
const open = require('zeelib/lib/open').default

module.exports = (bm) => {
  try {
    open(bm.href)
  } catch (_) {
    console.log('Malformed bookmark or no default application')
    exit(1)
  }
}
