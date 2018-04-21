module.exports = () => {
  console.log(`
    lnx

    usage:

    lnx -a (--add)
      # add a bookmark directly
      # bookmark must have at least href and title
      # example:
      lnx -a '{"href","http://foo.bar","tags":["one","two"],"title":"foo bar site"}'
    lnx -i (--import)
      # import bookmarks from a pinboard format file
      # example:
      lnx -i ~/Downloads/pinboard_export.json
  `)
}
