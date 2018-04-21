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
    lnx -h (--help)
      # show this help message
  `)
}
