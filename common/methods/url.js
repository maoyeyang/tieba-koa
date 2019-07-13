const config = require('../../config')
const path = require('path')

const concatURl = (url = '') => {
  return ('http://' + path.join(`${config.host}:${config.port}/`, url)).replace(/\\/g, "\/")
}


module.exports = {
  concatURl
}