const {
  authorization,
  userImageURl
} = require('../../common/methods')
const Router = require('koa-router');
const {
  Op
} = require('sequelize')
const models = require('../../models')

const {
  getFocusCount,
  getFansCount,
} = require('../../common/sql')

let router = new Router();
// 关注人 列表
router.get('/focuslist', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  let focusList = await models.user_focus.findAll({
    where: {
      user_id: userSelect.id
    },
    raw: true
  })
  let whofocusList = await models.user_focus.findAll({
    where: {
      focus_id: userSelect.id
    },
    raw: true
  })
  focusList = focusList.map(item => {
    item.mutual = whofocusList.some(item1 => item.focus_id === item1.user_id)
    return item
  })
  focusList.sort(function (a, b) {
    return a.focus_id - b.focus_id;
  })
  const arrUser = focusList.map((item) => item.focus_id)
  const userList = await models.user.findAll({
    attributes: ['id', 'nickname', 'avatar_url', 'introduction'],
    where: {
      id: {
        [Op.in]: arrUser
      }
    },
    raw: true
  })
  let res = (userList).map((item, i) => {
    let data = {
      ...item,
      mutual: focusList[i].mutual
    }
    return data
  })
  res = res.map((item) => {
    item.avatar_url = userImageURl(item.avatar_url)
    return item
  })
  ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})
// 粉丝列表
router.get('/fanslist', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
    return
  }
  let fansList = await models.user_focus.findAll({
    where: {
      focus_id: userSelect.id
    },
    raw: true
  })
  let focusList = await models.user_focus.findAll({
    where: {
      user_id: userSelect.id
    },
    raw: true
  })
  fansList = fansList.map(item => {
    item.mutual = focusList.some(item1 => item.user_id === item1.focus_id)
    return item
  })
  focusList.sort(function (a, b) {
    return a.focus_id - b.focus_id;
  })
  const arrUser = fansList.map((item) => item.user_id)
  const userList = await models.user.findAll({
    attributes: ['id', 'nickname', 'avatar_url', 'introduction'],
    where: {
      id: {
        [Op.in]: arrUser
      }
    },
    raw: true
  })
  let res = (userList).map((item, i) => {
    let data = {
      ...item,
      mutual: fansList[i].mutual
    }
    return data
  })
  res = res.map((item) => {
    item.avatar_url = userImageURl(item.avatar_url)
    return item
  })
  ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})
// 取关(人)
router.post('/reomvefocus', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  const focus_id = ctx.request.body.focus_id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  const res = await models.user_focus.destroy({
    where: {
      user_id: userSelect.id,
      focus_id
    }
  })
  if (res >= 1) {
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功'
    }
  } else {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '失败'
    }
  }
})
// 关注(人)
router.post('/addfocus', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const focus_id = ctx.request.body.focus_id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  //查询是否存在关注用户
  const focusUser = await models.user.findOne({
    where: {
      id: focus_id
    },
    raw: true
  })
  if (!focusUser) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '关注的用户不存在'
    }
  }
  const obj = {
    user_id: userSelect.id,
    focus_id
  }
  const res = await models.user_focus.findCreateFind({
    where: obj,
    defaults: obj
  })
  if (res) {
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功关注该用户'
    }
  }
  return ctx.body = {
    statusCode: 400,
    success: false,
    message: '内部服务器错误'
  }
})

module.exports = router;