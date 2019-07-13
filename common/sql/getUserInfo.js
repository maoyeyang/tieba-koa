const {
  userImageURl
} = require('../methods')
const {
  getFocusCount,
  getFansCount,
  getFocusBaCount,
  getTieCount
} = require('./count')
const models = require('../../models')

const getUserInfo = async (id) => {
  let res = await models.user.findOne({
    where: {
      id
    },
    raw: true
  })
  if (!res) {
    return false
  }
  const focusCount = await getFocusCount(id)
  const fansCount = await getFansCount(id)
  const focusBaCount = await getFocusBaCount(id)
  const tieCount = await getTieCount(id)

  res.avatar_url = userImageURl(res.avatar_url)

  return {
    ...res,
    focusCount,
    fansCount,
    focusBaCount,
    tieCount
  }
}

module.exports = getUserInfo