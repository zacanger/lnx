const shortid = require('shortid')
const { readFileSync } = require('fs')
const { exit, length } = require('zeelib')

module.exports = (f, db) => {
  try {
    const pb = readFileSync(f).toString('utf8').trim()
    const p = JSON.parse(pb).map(({
      hash,
      meta,
      shared,
      toread,
      // we don't need meta, hash, toread, and shared
      description,
      tags,
      extended,
      ...rest
    }) => ({
      ...rest,
      // fix these silly names
      title: description,
      description: extended,
      // pinboard tags are a single string and we want an array
      tags: tags.trim().split(' ').filter(Boolean),
      id: shortid()
    }))
    const allPosts = db.get('lnx')
      .concat(p)
      .value()
    db.set('lnx', allPosts).write()
    console.log(`${length(p)} bookmarks imported`)
  } catch (_) {
    console.log('Argument is not a valid pinboard export file.')
    exit(1)
  }
}
