const shortid = require('shortid')
const cheerio = require('cheerio')
const { readFileSync } = require('fs')
const { exit, length } = require('zeelib')

const isJson = (f) => {
  try {
    return !!JSON.parse(f)
  } catch (_) {
    return false
  }
}

const getCategories = (a) => {
  const node = a.closest('DL').prev()
  const title = node.text()
  if ([ 'bookmarks menu', 'bookmarks bar', 'other bookmarks', 'bookmarks' ].includes((title || '').toLowerCase())) {
    return []
  }
  if (node.length > 0 && title.length > 0) {
    return [ title ].concat(getCategories(node))
  } else {
    return []
  }
}

const importHtml = (f, db) => {
  try {
    const data = readFileSync(f).toString('utf8').trim()

    const newBms = []
    const $ = cheerio.load(data)
    $('a').each((index, a) => {
      const $a = $(a)
      const title = $a.text()
      const href = $a.attr('href')
      const tags = getCategories($a)
      const o = {
        title,
        href,
        tags,
        // TODO: parse dates in bookmarks.html
        time: new Date().toJSON(),
        id: shortid()
      }
      newBms.push(o)
    })

    const allBms = db.get('lnx')
      .concat(newBms)
      .value()
    db.set('lnx', allBms).write()
    console.log(`${length(newBms)} bookmarks imported`)
  } catch (_) {
    console.log('Argument is not a valid bookmarks.html file.')
    exit(1)
  }
}

const importPinboard = (f, db) => {
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
    const allBms = db.get('lnx')
      .concat(p)
      .value()
    db.set('lnx', allBms).write()
    console.log(`${length(p)} bookmarks imported`)
  } catch (_) {
    console.log('Argument is not a valid pinboard export file.')
    exit(1)
  }
}

module.exports = (f, db) => {
  const theFile = readFileSync(f).toString('utf8').trim()
  const isPinboard = isJson(theFile)

  if (isPinboard) {
    importPinboard(f, db)
  } else {
    importHtml(f, db)
  }
}
