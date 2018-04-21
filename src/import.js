const { readFileSync } = require('fs')
const exit = require('zeelib/lib/exit').default

module.exports = (f, db) => {
  try {
    const pb = readFileSync(f).toString('utf8').trim()
    // we don't need meta, hash, toread, and shared
    const p = JSON.parse(pb).map(({
      description,
      tags,
      meta,
      hash,
      toread,
      shared,
      extended,
      ...rest
    }) => ({
      ...rest,
      // fix these silly names
      title: description,
      description: extended,
      // pinboard tags are a single string and we want an array
      tags: tags.trim().split(' ').filter(Boolean)
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
