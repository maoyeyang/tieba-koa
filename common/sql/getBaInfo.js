const {
  baImageURl
} = require('../methods')
const models = require('../../models')

const getBaInfo = async (id) => {
  let res = await models.ba.findOne({
    where: {
      id
    },
    raw: true
  })

  if (!res) {
    return false
  }
  res.theme_url = baImageURl(res.theme_url)

  return res
}



module.exports = getBaInfo