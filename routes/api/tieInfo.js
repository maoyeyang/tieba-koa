const {
  authorization,
  userImageURl,
  TieImageURl
} = require('../../common/methods')
const {
  getTieInfo
} = require('../../common/sql')
const models = require('../../models')
const Sequelize = require('sequelize');
const Router = require('koa-router');
const router = new Router();
// 帖子信息
router.get('/tieinfo/:id', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  const res = await getTieInfo(parseInt(ctx.params.id))
  if (!res) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '帖子不存在'
    }
  }

  let tieInfo = await models.tie.findOne({
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
    where: {
      id: res.id
    },
    raw: true
  })
  tieInfo.avatar_url = userImageURl(tieInfo.avatar_url)
  tieInfo.images = TieImageURl(tieInfo.images)

  if (!userSelect) {
    tieInfo.isLike = false
    tieInfo.isCollect = false
    tieInfo.isFocus = false
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功',
      data: tieInfo
    }
  }
  let like_collect = await models.like_collect.findOne({
    where: {
      tie_id: res.id,
      user_id: userSelect.id
    },
    raw: true
  })
  let user_focus = await models.user_focus.findOne({
    where: {
      focus_id: tieInfo.user_id,
      user_id: userSelect.id
    },
    raw: true
  })
  if (user_focus) {
    tieInfo.isFocus = true
  } else {
    tieInfo.isFocus = false
  }

  if (like_collect) {
    if (like_collect.like === 1) {
      tieInfo.isLike = true
    } else {
      tieInfo.isLike = false
    }
    if (like_collect.collect === 1) {
      tieInfo.isCollect = true
    } else {
      tieInfo.isCollect = false
    }
  } else {
    tieInfo.isLike = false
    tieInfo.isCollect = false
  }

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: tieInfo
  }
})
// 帖子的评论信息
router.get('/commentlist/:id', async (ctx) => {
  const tie = await getTieInfo(parseInt(ctx.params.id))
  if (!tie) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '帖子不存在'
    }
  }
  let res = await models.comment.findAll({
    include: [{
      model: models.user,
      attributes: [],
      as: "user"
    }],
    where: {
      tie_id: tie.id
    },
    attributes: ['id', 'user_id', Sequelize.col('user.nickname'), 'content',
      Sequelize.col('user.avatar_url'), 'created_at'
    ],
    raw: true
  })
  res = res.map(item => {
    item.avatar_url = userImageURl(item.avatar_url)
    if (item.user_id === tie.user_id) {
      item.isLouzhu = true
    } else {
      item.isLouzhu = false
    }
    return item
  })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})

module.exports = router;