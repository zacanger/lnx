const { exit, open } = require('zeelib')

module.exports = (bm) => {
  try {
    open(bm.href)
  } catch (_) {
    console.log('Malformed bookmark or no default application')
    exit(1)
  }
}
