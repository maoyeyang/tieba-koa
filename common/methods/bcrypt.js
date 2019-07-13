require('env2')('./.env')
const config = require('../../config')
const Bcrypt = require('bcrypt');

const createHash = async (password) => {
  const hash = await Bcrypt.hash(password, parseInt(config.bcrypt))
  return hash
}
const compareHash = async (password, hash) => {
  const isValid = await Bcrypt.compare(password, hash)
  return isValid
}

module.exports = {
  createHash,
  compareHash
}