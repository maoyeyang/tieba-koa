const {
  authorization,
  compareHash,
  createHash
} = require('../../common/methods')
const {
  getUserInfo
} = require('../../common/sql')
const fs = require('fs')
const path = require('path')
const models = require('../../models')
const Router = require('koa-router');
let router = new Router();
router.get('/userinfo', async (ctx) => {
  let userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }

  const res = await getUserInfo(userSelect.id)

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '获取用户信息成功',
    data: {
      ...res,
      password: null
    }
  }
})

router.post('/useredit', async (ctx) => {
  let userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  const file = ctx.request.files.file
  const data = {
    nickname: ctx.request.body.nickname,
    sex: ctx.request.body.sex,
    old: ctx.request.body.old,
    new: ctx.request.body.new,
    introduction: ctx.request.body.introduction,
  }
  if (data.old && data.new) {
    const Validate = await compareHash(data.old, userSelect.password)
    if (!Validate) {
      return ctx.body = {
        statusCode: 200,
        success: false,
        message: '修改用户信息失败(密码不正确)'
      }
    }
    const hash = await createHash(data.new)
    data.password = hash
  }
  let arr = ['sex', 'nickname', 'introduction']
  if (file) {
    arr.push('avatar_url')
    let index = file.type.lastIndexOf('/')
    let suffix = file.type.substr(index + 1)
    data.avatar_url = `./images/user_images/avatar_${userSelect.id}.${suffix}`
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../public/', data.avatar_url);
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream)
  }
  if (data.password) {
    arr.push('password')
  }
  const res = await models.user.update(data, {
    where: {
      id: userSelect.id
    },
    raw: true,
    fields: arr
  })
  if (res[0] === 1) {
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功保存用户信息'
    }
  }
  return ctx.body = {
    statusCode: 400,
    success: false,
    message: '发生未知错误'
  }
})

module.exports = router;