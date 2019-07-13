const {
  authorization,
  TieImageURl,
  userImageURl
} = require('../../common/methods')
const {
  getBaInfo
} = require('../../common/sql')
const models = require('../../models')
const Sequelize = require('sequelize')
const Router = require('koa-router');
const router = new Router();

router.get('/bainfo/:id', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)

  const res = await getBaInfo(parseInt(ctx.params.id))
  if (!res) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '吧不存在'
    }
  }
  if (!userSelect) {
    res.isFocus = false
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功',
      data: res
    }
  }

  const res1 = await models.focus_ba.findAll({
    where: {
      user_id: userSelect.id,
      ba_id: res.id
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

router.get('/tielistbyba/:id', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  const data = await getBaInfo(parseInt(ctx.params.id))
  if (!data) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '吧不存在'
    }
  }
  let res = await models.tie.findAll({
    include: [{
      model: models.ba,
      attributes: [],
      as: "ba"
    }, {
      model: models.user,
      attributes: [],
      as: "user"
    }],
    attributes: ['id', Sequelize.col('ba.ba_name'), 'ba_id', 'user_id',
      Sequelize.col('user.nickname'), 'title', 'content', 'type', 'likes',
      'images', 'comments_count', Sequelize.col('user.avatar_url')
    ],
    limit: 10,
    raw: true,
    where: {
      ba_id: data.id
    },
    order: [
      ['id', 'DESC']
    ],
  })
  if (userSelect) {
    let like = await models.like_collect.findAll({
      where: {
        user_id: userSelect.id,
        like: true
      }
    })
    res = res.map(item => {
      item.isLike = like.some(item1 => item1.tie_id === item.id)
      return item
    })
    let collect = await models.like_collect.findAll({
      where: {
        user_id: userSelect.id,
        collect: true
      }
    })
    res = res.map(item => {
      item.isCollect = collect.some(item1 => item1.tie_id === item.id)
      return item
    })
    res = res.map(item => {
      item.images = TieImageURl(item.images)
      item.avatar_url = userImageURl(item.avatar_url)
      return item
    })
  } else {
    res = res.map(item => {
      item.images = TieImageURl(item.images)
      item.avatar_url = userImageURl(item.avatar_url)
      item.isLike = false
      item.isCollect = false
      return item
    })
  }

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})

module.exports = router;