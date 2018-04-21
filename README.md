# lnx

[WIP] Command-line bookmark manager

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
lnx -i (--import)
  # import bookmarks from a pinboard format file
  # example:
  lnx -i ~/Downloads/pinboard_export.json
```

See the [roadmap](./todo.md).

## Why?

I've been a Pinboard user for years, and have had as many as almost 50,000
bookmarks saved. Pinboard is a very stable, usable service with lots of nifty
features. Sometimes it's not flexible enough, though. Say you want to keep all
bookmarks that have two tags but not a third &mdash; there's no way to do this
in the web UI, but it's trivial if you can actually program against your
bookmarks:

```javascript
const bms = require('./boomarks.json')
const fs = require('fs')

const newBms = bms.filter((bm) =>
  bm.tags.includes('kdrama') &&
  bm.tags.includes('yoo-in-na') &&
  !bm.tags.includes('goblin'))

fs.writeFileSync('./bookmarks.json', JSON.stringify(newBms, null, 2))
```

Simple! I feel like managing information should always be that easy.

The CLI will gradually evolve to include some basic functionality (open a
bookmark, filter/search by tags/title/link, edit a bookmark, interactively add a
bookmark), but the goal of `lnx` isn't to provide every possible tool you need
to manage your bookmarks, but instead to allow to you drop down and write code
when it makes sense. And since your bookmarks are just a plain JSON object under
`~/.local/share/lnx.json`, you can use any language you want to manipulate them.

## License

[MIT](./LICENSE.md)
