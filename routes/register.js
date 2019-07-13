const {
  createHash
} = require('../common/methods')
const models = require('../models')
const Router = require('koa-router');

let router = new Router();

router.post('/', async (ctx) => {
  const user = ctx.request.body;
  const selectUser = await models.user.findOne({
    where: {
      username: user.username,
    },
    raw: true
  })
  if (selectUser) {
    return ctx.body = {
      statusCode: 200,
      success: false,
      message: '用户名被占用,请换一个'
    }
  }
  const hash = await createHash(user.password)
  await models.user.create({
    username: user.username,
    password: hash,
    avatar_url: '',
    nickname: user.username,
    sex: true,
    introduction: '这个人很懒,什么也没留下',
    member: false,
  }, {
    raw: true
  })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '注册成功!!!'
  }
})

module.exports = router;