const sharp = require('sharp')
const { send } = require('micro')

const src = `
<svg xmlns="http://www.w3.org/2000/svg" width="506.3" height="506.3" viewBox="0 0 506.3 506.3"><g fill="none" stroke="#202020" stroke-width="16.333" stroke-miterlimit="10"><path d="M122.5 122.5h375.7v375.7H122.5z"/><path d="M122.5 383.8H8.2V8.2h375.6v114.3M310.3 204.2v212.3M416.5 310.3H204.2"/></g></svg>`

module.exports = (req, res) => {
  const buff = Buffer.from(src)
  return sharp(buff)
    .toBuffer()
    .then(data => {
      res.setHeader('Content-disposition', 'attachment;filename=test.png')
      return send(res, 200, data)
    })
    .catch(err => send(res, 400, `Error: ${err}`))
}
