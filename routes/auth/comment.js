const {
  authorization,
  userImageURl
} = require('../../common/methods')
const {
  getTieCount
} = require('../../common/sql')
const Sequelize = require('sequelize');
const fs = require('fs')
const path = require('path')
const models = require('../../models')
const Router = require('koa-router');
let router = new Router();
// 发表评论
router.post('/addcomment', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const data = ctx.request.body
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  await models.comment.create({
    ...data,
    user_id: userSelect.id,
    type: false
  })
  let res = await models.tie.findOne({
    where: {
      id: data.tie_id
    }
  })
  await models.tie.update({
    comments_count: ++res.comments_count
  }, {
    where: {
      id: res.id
    },
    fields: ['comments_count']
  })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '发表评论成功'
  }
})

module.exports = router;