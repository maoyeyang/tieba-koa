require('env2')('./.env')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const models = require('../../models')

const getToken = (payload = {}, options = {
  expiresIn: '2h'
}) => {
  return jwt.sign(payload, config.secret, options);
}

const getJWTPayload = (token) => {
  // 验证并解析JWT
  return jwt.verify(token.split(' ')[1], config.secret);
}

const authorization = async (token) => {
  if (!token) {
    return false
  }
  const {
    username
  } = getJWTPayload(token)
  if (!username) {
    return false
  }
  userSelect = await models.user.findOne({
    where: {
      username
    },
    raw: true
  })
  return userSelect
}

module.exports = {
  getToken,
  getJWTPayload,
  authorization
}