const shortid = require('shortid')
const { exit } = require('zeelib')
const { prompt } = require('./util')

module.exports = async (db) => {
  try {
    const href = await prompt('Link (required): ')
    const title = await prompt('Title (required): ')
    const description = await prompt('Description (optional): ')
    const _tags = await prompt('Tags (optional; exmaple: one,two,three): ')

    const time = new Date().toJSON()
    const tags = (_tags || '').split(',').map((t) => t.trim())
    const id = shortid()

    if (!title || !href) {
      throw new Error('Title and link are required!')
    }

    const newBookmark = {
      description,
      href,
      id,
      tags,
      time,
      title
    }

    db.get('lnx')
      .push(newBookmark)
      .write()

    console.log(`Added ${href}`)
  } catch (e) {
    console.log(e)
    exit(1)
  }
}
