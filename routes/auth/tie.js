const {
  authorization,
  TieImageURl,
  userImageURl
} = require('../../common/methods')
const Sequelize = require('sequelize');
const fs = require('fs')
const path = require('path')
const models = require('../../models')
const Router = require('koa-router');
let router = new Router();
// 发帖
router.post('/addtie', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  let files = []
  for (item in ctx.request.files) {
    files.push(ctx.request.files[item])
  }
  const data = {
    ba_id: ctx.request.body.ba_id,
    content: ctx.request.body.content,
    title: ctx.request.body.title
  }
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
      id: data.ba_id
    },
    raw: true
  })
  if (!Ba) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '该贴吧不存在,无法发帖'
    }
  }
  let images = []
  let tie = await models.tie.findOne({
    order: [
      ['id', "DESC"]
    ],
    raw: true
  })
  if (!tie) {
    tie = {
      id: 1
    }
  }
  if (files) {
    let i = 1
    for (item in files) {
      let file = files[item]
      let index = file.type.lastIndexOf('/')
      let suffix = file.type.substr(index + 1)
      let url = `./images/tie_images/tie_${tie.id+1}_${i}.${suffix}` //文件的相对路径
      i++
      images.push(url)
      const reader = fs.createReadStream(file.path);
      let filePath = path.join(__dirname, '../../public/', url);
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream)
    }
  }
  images = JSON.stringify(images)
  const res = await models.tie.create({
    ...data,
    type: false,
    likes: 0,
    images,
    comments_count: 0,
    user_id: userSelect.id
  })
  const res1 = await models.ba.update({
    tie_count: ++Ba.tie_count
  }, {
    where: {
      id: Ba.id
    },
    raw: true
  })
  if (res && res1) {
    return ctx.body = {
      statusCode: 200,
      success: true,
      message: '发帖成功'
    }
  } else {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '发帖失败'
    }
  }
})
// 已发帖的列表
router.get('/usertielist', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  // 获取列表
  let res = await models.tie.findAll({
    include: [{
      model: models.ba,
      attributes: [],
      as: "ba"
    }],
    where: {
      user_id: userSelect.id
    },
    attributes: ['id', Sequelize.col('ba.ba_name'), 'title', 'content', 'type', 'created_at', 'likes', 'comments_count'],
    raw: true,
    order: [
      ['id', 'DESC']
    ],
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

  ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})
// 关注的人发的帖列表
router.get('/userfocustielist', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
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
    raw: true,
    order: [
      ['id', 'DESC']
    ],
  })

  let userFocus = await models.user_focus.findAll({
    where: {
      user_id: userSelect.id
    },
    raw: true
  })
  const arrFocus = userFocus.map(item => item.focus_id)
  res = res.filter(item => {
    return arrFocus.some(arr => arr === item.user_id)
  })
  res = res.map(item => {
    item.images = TieImageURl(item.images)
    item.avatar_url = userImageURl(item.avatar_url)
    return item
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

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }

})
// 点赞  贴子
router.post('/liketie', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const id = ctx.request.body.id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  let data = await models.like_collect.findOne({
    where: {
      tie_id: id,
      user_id: userSelect.id
    },
    raw: true
  })
  if (data) {
    await models.like_collect.update({
      like: true
    }, {
      where: {
        id: data.id
      },
      raw: true,
      fields: ['like']
    })
  } else {
    await models.like_collect.create({
      tie_id: id,
      user_id: userSelect.id,
      like: true,
      collect: false
    })
  }

  let tie = await models.tie.findOne({
    where: {
      id
    },
    raw: true,
  })
  await models.tie.update({
    likes: ++tie.likes
  }, {
    where: {
      id: tie.id
    },
    raw: true,
    fields: ['likes']
  })

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功'
  }

})
// 取消点赞 贴子
router.post('/unliketie', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const id = ctx.request.body.id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  await models.like_collect.update({
    like: false
  }, {
    where: {
      tie_id: id,
      user_id: userSelect.id
    },
    raw: true,
    fields: ['like']
  })

  let tie = await models.tie.findOne({
    where: {
      id
    },
    raw: true,
  })
  await models.tie.update({
    likes: --tie.likes
  }, {
    where: {
      id: tie.id
    },
    raw: true,
    fields: ['likes']
  })

  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功'
  }

})
// 收藏  贴子
router.post('/collecttie', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const id = ctx.request.body.id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  let data = await models.like_collect.findOne({
    where: {
      tie_id: id,
      user_id: userSelect.id
    },
    raw: true
  })
  if (data) {
    await models.like_collect.update({
      collect: true
    }, {
      where: {
        id: data.id
      },
      raw: true,
      fields: ['collect']
    })
  } else {
    await models.like_collect.create({
      tie_id: id,
      user_id: userSelect.id,
      like: false,
      collect: true
    })
  }
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功'
  }
})
// 取消收藏  贴子
router.post('/removecollecttie', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  const id = ctx.request.body.id
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  await models.like_collect.update({
    collect: false
  }, {
    where: {
      tie_id: id,
      user_id: userSelect.id
    },
    raw: true,
    fields: ['collect']
  })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功'
  }
})
// 收藏帖子的列表
router.get('/collectlist', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  let res = await models.tie.findAll({
    include: [{
      model: models.like_collect,
      attributes: [],
      as: "like_collect"
    }, {
      model: models.user,
      attributes: [],
      as: "user"
    }],
    attributes: ['id', 'user_id', Sequelize.col('user.nickname'), 'title',
      'images', Sequelize.col('user.avatar_url')
    ],
    raw: true,
    where: {
      '$like_collect.user_id$': userSelect.id,
      '$like_collect.collect$': true
    },
    order: [
      ['id', 'DESC']
    ],
  })
  let focus = await models.user_focus.findAll({
    where: {
      user_id: userSelect.id
    },
    raw: true
  })
  arrFocus = focus.map(item => item.focus_id)
  res = res.map(item => {
    item.avatar_url = userImageURl(item.avatar_url)
    item.images = TieImageURl(item.images)
    item.isFocus = arrFocus.some(i => i === item.user_id)
    return item
  })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})
// 收到的评论
router.get('/usercommentlist', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  let res = await models.comment.findAll({
    include: [{
      model: models.user,
      attributes: [],
      as: "user"
    }, {
      model: models.tie,
      attributes: ['id'],
      as: "tie"
    }],
    attributes: ['id', 'user_id', Sequelize.col('user.nickname'),
      Sequelize.col('user.avatar_url'), 'content', 'updated_at', Sequelize.col('tie.title')
    ],
    raw: true,
    where: {
      '$tie.user_id$': userSelect.id,
      user_id: {
        [Sequelize.Op.ne]: userSelect.id
      },
      'type': false
    },
    order: [
      ['updated_at', 'DESC']
    ],
  })
  res = res.map(item => {
    item.avatar_url = userImageURl(item.avatar_url)
    return item
  })
  return ctx.body = {
    statusCode: 200,
    success: true,
    message: '成功',
    data: res
  }
})
// 给自己点赞的信息
router.get('/likelist', async (ctx) => {
  //用户信息验证
  const userSelect = await authorization(ctx.headers.authorization)
  if (!userSelect) {
    return ctx.body = {
      statusCode: 400,
      success: false,
      message: '用户认证失败'
    }
  }
  let res = await models.like_collect.findAll({
    include: [{
      model: models.user,
      attributes: [],
      as: "user"
    }, {
      model: models.tie,
      attributes: ['id'],
      as: "tie"
    }],
    attributes: ['id', 'user_id', Sequelize.col('user.nickname'),
      Sequelize.col('user.avatar_url'), 'updated_at', Sequelize.col('tie.title')
    ],
    raw: true,
    where: {
      '$tie.user_id$': userSelect.id,
      'like': true
    },
    order: [
      ['updated_at', 'DESC']
    ],
  })
  res = res.map(item => {
    item.avatar_url = userImageURl(item.avatar_url)
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