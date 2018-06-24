const remove = (xs, el) =>
  xs.filter((a) => a !== el)

const argIn = (arg) => (opts) =>
  opts.includes(arg)

module.exports = {
  remove,
  argIn,
}
