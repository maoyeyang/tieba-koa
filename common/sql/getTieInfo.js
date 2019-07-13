const {
  TieImageURl
} = require('../methods')
const models = require('../../models')

const getTieInfo = async (id) => {
  let res = await models.tie.findOne({
    where: {
      id
    },
    raw: true
  })

  if (!res) {
    return false
  }
  res.images = TieImageURl(res.images)

  return res
}

module.exports = getTieInfo