const {
  authorization
} = require('../../common/methods')
const {
  getUserInfo
} = require('../../common/sql')
const models = require('../../models')
const Router = require('koa-router');
const router = new Router();

router.get('/userinfo/:id', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)

  const res = await getUserInfo(parseInt(ctx.params.id))
  if (!res) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户不存在'
    }
  }
  res.password = null

  if (!userSelect) {
    res.isFocus = false
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功',
      data: res
    }
  }

  const res1 = await models.user_focus.findAll({
    where: {
      user_id: userSelect.id,
      focus_id: res.id
    },
    raw: true
  })
  if (res1[0]) {
    res.isFocus = true
  } else {
    res.isFocus = false
  }
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})

module.exports = router;