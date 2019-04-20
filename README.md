# lnx

Command-line bookmark (link) manager

![screenshot](/screenshot.gif?raw=true)

--------

## Installation

`npm i -g lnx`

## Usage

```
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
```

```javascript
const fs = require('fs')
const bmPath = './.local/share/lnx.json'
const bms = require(bmPath).lnx

const toRemove = bms
  .filter((bm) =>
    bm.tags.includes('kdrama') &&
    bm.tags.includes('goblin') &&
    !bm.tags.includes('yoo-in-na'))
  .map((bm) => bm.href)

const newBms = bms.filter((bm) => !toRemove.includes(bm.href))

fs.writeFileSync(bmPath, JSON.stringify(newBms, null, 2))
```

Simple! I feel like managing information should always be that easy.

The CLI will gradually evolve to include some basic functionality (open a
bookmark, filter/search by tags/title/link, edit a bookmark, interactively add a
bookmark), but the goal of `lnx` isn't to provide every possible tool you need
to manage your bookmarks, but instead to allow to you drop down and write code
when it makes sense. And since your bookmarks are just a plain JSON object under
`~/.local/share/lnx.json`, you can use any language you want to manipulate them.

### What about sync?

One of the draws of a service like Pinboard is that it's available everywhere.
Forunately, with `lnx` your bookmarks are just a file, so you can put them
anywhere you want. I keep mine in Dropbox:

```sh
cd ~/.local/share
mv lnx.json ~/Dropbox/.lnx.json
ln -s /home/z/Dropbox/.lnx.json lnx.json
```

### What about a UI?

Maybe I'll add one in the future! Even if I don't, since your bookmarks are just
JSON it should be somewhat straightfoward to add a web UI yourself.

### What makes up a bookmark?

Here's the type:

```
type bookmark = {
  href: string,
  title: string,
  time?: Date, # JS: new Date().toJSON()
  description?: string,
  tags: Array<?string>
}
```

## Roadmap

* Safety: copy all bookmarks before any operations, restore if fail
* Export to bookmarks.html format
* Improved interface (yaourt feel, maybe inquirer?)
  * Interactive edit
  * Interactive add
  * Interactive filter/search (fzf feel?)

## Patreon Sponsors

[![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger)

This project is sponsored on [Patreon](https://www.patreon.com/zacanger) by:

* [Keeley Hammond](https://github.com/VerteDinde)

## License

[MIT](./LICENSE.md)
