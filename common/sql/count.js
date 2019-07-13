const models = require('../../models')

// 根据id 获取关注人数
const getFocusCount = async (id) => {
  return await models.user_focus.count({
    where: {
      user_id: id
    },
    raw: true,
  })
}
// 根据id 获取粉丝人数
const getFansCount = async (id) => {
  return await models.user_focus.count({
    where: {
      focus_id: id
    },
    raw: true,
  })
}
// 根据id 获取关注的吧个数
const getFocusBaCount = async (id) => {
  return await models.focus_ba.count({
    where: {
      user_id: id,
      state: true
    },
    raw: true,
  })
}
// 根据id 获取发帖个数
const getTieCount = async (id) => {
  return await models.tie.count({
    where: {
      user_id: id,
    },
    raw: true,
  })
}

module.exports = {
  getFocusCount,
  getFansCount,
  getFocusBaCount,
  getTieCount
}