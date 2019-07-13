const {
  authorization,
  baImageURl
} = require('../../common/methods')
const {
  Op
} = require('sequelize')
const models = require('../../models')
const Router = require('koa-router');
let router = new Router();
// 取消关注(吧)
router.post('/removefocusba', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const ba_id = ctx.request.body.ba_id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  const [count] = await models.focus_ba.update({
    state: false
  }, {
    where: {
      ba_id: ba_id,
      user_id: userSelect.id
    },
    raw: true
  })
  if (count > 0) {
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功取关该贴吧'
    }
  }
  return ctx.body = {
    statusCode: 400,
    success: false,
    message: '取关贴吧失败'
  }
})
// 关注(吧)
router.post('/addfocusba', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const ba_id = ctx.request.body.ba_id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  // 判断是否有这个吧
  const Ba = await models.ba.findOne({
    where: {
      id: ba_id
    },
    raw: true
  })
  if (!Ba) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '该贴吧不存在,无法关注'
    }
  }

  const focusBaRecord = await models.focus_ba.findOne({
    where: {
      ba_id,
      user_id: userSelect.id
    },
    raw: true
  })
  if (!focusBaRecord) {
    const res = await models.focus_ba.create({
      user_id: userSelect.id,
      ba_id,
      exp: 0,
      state: true
    }, {
      raw: true
    })
    const res1 = await models.ba.update({
      fans_count: ++Ba.fans_count
    }, {
      where: {
        id: Ba.id
      }
    })
    if (res && res1) {
      return ctx.body = {
        statusCode: 200,
        success: true,
        message: '成功关注该贴吧'
      }
    } else {
      return ctx.body = {
        statusCode: 400,
        success: false,
        message: '关注贴吧失败'
      }
    }
  }
  // 有则 修改为true
  const [count] = await models.focus_ba.update({
    state: true
  }, {
    where: {
      id: focusBaRecord.id
    }
  })
  if (count > 0) {
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功关注该贴吧'
    }
  }
  return ctx.body = {
    statusCode: 400,
    success: false,
    message: '关注贴吧失败'
  }
})
// 关注吧的列表
router.get('/focusbalist', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  // 获取关注的吧 的列表
  const focusBaList = await models.focus_ba.findAll({
    where: {
      user_id: userSelect.id,
      state: true
    },
    raw: true
  })
  focusBaList.sort(function (a, b) {
    return a.ba_id - b.ba_id;
  })
  const arrBa = focusBaList.map((item) => item.ba_id)
  const BaList = await models.ba.findAll({
    where: {
      id: {
        [Op.in]: arrBa
      }
    },
    attributes: ['id', 'ba_name', 'theme_url', 'description'],
    raw: true
  })
  let res = BaList.map((item, i) => {
    let data = {
      ...item,
      exp: focusBaList[i].exp
    }
    return data
  })
  res = res.map((item) => {
    item.theme_url = baImageURl(item.theme_url)
    return item
  })
  ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})

module.exports = router;