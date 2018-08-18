const { version } = require('../package.json')
const s = `
lnx v${version}

usage:

lnx -a (--add)
  # add a bookmark directly
  # bookmark must have at least href and title
  # example:
  lnx -a '{"href","http://foo.bar","tags":["one","two"],"title":"foo bar site"}'
lnx -d (--delete)
  # delete bookmarks by id
  # example:
  lnx -d SyCCkefv-mFnM
  lnx -d SyCCkefv-mFnM B1dNU-wZQK3M
lnx -i (--import)
  # import bookmarks from a pinboard JSON or bookmarks.html format file
  # example:
  lnx -i ~/Downloads/pinboard_export.json
lnx -s (--search) [-r (--raw)]
  # search bookmarks by some field
  # field can be href, title, description, etc.
  # if field is tags, results will only include
  #  bookmarks which have all provided tags
  # with the -r (or --raw) flag, results will be returned
  #  in JSON instead of pretty-printed
  # example:
  lnx -s tags papers cs -r
  lnx -s href http://zacanger.com
lnx -e (--export)
  # export bookmarks to browser-compatible bookmarks.html format, to stdout
  # example:
  lnx -e > ~/bookmarks-export.html
lnx -l (--list) [-r (--raw)]
  # show all bookmarks
  # optional -r (--raw) flag will use JSON
  # example:
  lnx -l
lnx -u (--uniq)
  # deduplicate bookmarks by href
  # example:
  lnx -u
lnx -h (--help)
  # show this help message
`

module.exports = () => {
  console.log(s)
}
