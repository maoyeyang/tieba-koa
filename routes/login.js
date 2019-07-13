const Router = require('koa-router');
const models = require('../models')
const {
  compareHash,
  getToken
} = require('../common/methods')

let router = new Router();
router.post('/', async (ctx) => {
  const user = ctx.request.body;
  let userSelect = {}
  let isValid = false

  userSelect = await models.user.findOne({
    where: {
      username: user.username,
    },
    raw: true
  })
  if (!userSelect) {
    return ctx.body = {
      statusCode: 200,
      success: false,
      message: '登录失败(用户不存在)'
    }
  }
  isValid = await compareHash(user.password, userSelect.password)
  if (!isValid) {
    return ctx.body = {
      statusCode: 200,
      success: false,
      message: '登录失败(密码错误)'
    }
  }
  const token = getToken({
    username: userSelect.username,
    id: userSelect.id
  })
  // ctx.set("Access-Control-Allow-Credentials", true);
  // ctx.cookies.set('username', token, {
  //   domain: '127.0.0.1',
  //   path: '/',
  //   maxAge: 1000 * 60 * 60 * 1,
  //   expires: new Date('2019-08-06'),
  //   httpOnly: false,
  //   overwrite: false
  // })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '登录成功',
    data: {
      id: userSelect.id,
      nickname: userSelect.nickname,
      token
    },
  }

})

module.exports = router;