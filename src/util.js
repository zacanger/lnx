const { createInterface } = require('readline')

const remove = (xs, el) =>
  xs.filter((a) => a !== el)

const prompt = (question) =>
  new Promise((resolve) => {
    const rlInterface = createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rlInterface.question(question, (answer) => {
      rlInterface.close()
      return resolve(answer || '')
    })
  })

module.exports = {
  prompt,
  remove
}
