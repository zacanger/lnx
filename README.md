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

## License

[MIT](./LICENSE.md)
