const {
  authorization,
  TieImageURl,
  userImageURl
} = require('../../common/methods')
const {} = require('../../common/sql')
const Sequelize = require('sequelize');
const models = require('../../models')
const Router = require('koa-router');
let router = new Router();

router.get('/tielist', async (ctx) => {
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
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
      order: [
        ['id', 'DESC']
      ],
    })
    res = res.map(item => {
      item.images = TieImageURl(item.images)
      item.avatar_url = userImageURl(item.avatar_url)
      item.isLike = false
      item.isCollect = false
      return item
    })
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功',
      data: res
    }
  } else {
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
      where: {
        user_id: {
          [Sequelize.Op.ne]: userSelect.id
        }
      },
      order: [
        ['id', 'DESC']
      ],
      raw: true
    })
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
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '成功',
      data: res
    }
  }


})

module.exports = router;