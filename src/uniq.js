module.exports = (db) => {
  try {
    const uniq = db.get('lnx').uniqBy('href').value()
    db.set('lnx', uniq).write()
    console.log('Deduplicated bookmarks')
  } catch (_) {
    console.log('Error merging bookmarks')
    process.exit(1)
  }
}
