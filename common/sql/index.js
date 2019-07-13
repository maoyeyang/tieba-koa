const getUserInfo = require('./getUserInfo')
const getBaInfo = require('./getBaInfo')
const getTieInfo = require('./getTieInfo')
const getCount = require('./count')

module.exports = {
  getUserInfo,
  getBaInfo,
  getTieInfo,
  ...getCount
}