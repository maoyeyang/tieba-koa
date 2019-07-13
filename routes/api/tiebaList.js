const {
  baImageURl,
  authorization
} = require('../../common/methods')
const models = require('../../models')
const Router = require('koa-router');
const router = new Router();

router.get('/tiebalist', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  let {
    rows
  } = await models.ba.findAndCountAll({
    offset: 0,
    raw: true
  })
  if (!rows) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '资源获取失败'
    }
  }
  rows = rows.map((item) => {
    item.theme_url = baImageURl(item.theme_url)
    return item
  })
  if (userSelect) {
    var res = await models.focus_ba.findAll({
      where: {
        user_id: userSelect.id,
        state: true
      },
      attributes: ['ba_id'],
      raw: true
    })
    var arr = res.map(item => item.ba_id)
    rows = rows.map(item => {
      item.isFocus = arr.some(item1 => item1 === item.id)
      return item
    })
  } else {
    rows = rows.map(item => {
      item.isFocus = false
      return item
    })
  }

  rows = rows.filter(item => item.isFocus === false)

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: rows
  }
})

module.exports = router;