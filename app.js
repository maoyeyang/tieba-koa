require('env2')('./.env')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const jwtKoa = require('koa-jwt')
const static = require('koa-static');
const path = require('path')

const config = require('./config')

const login = require('./routes/login')
const register = require('./routes/register')
const ApiTiebalist = require('./routes/api/tiebaList')
const ApiUserInfo = require('./routes/api/userInfo')
const ApiBaInfo = require('./routes/api/baInfo')
const ApiTieInfo = require('./routes/api/tieInfo')
const ApiTieList = require('./routes/api/tieList')

const AuthUserInfo = require('./routes/auth/userInfo')
const AuthUserFocus = require('./routes/auth/userFocus')
const AuthFocusBa = require('./routes/auth/focusBa')
const AuthTie = require('./routes/auth/tie')
const AuthComment = require('./routes/auth/comment')

const app = new Koa();
//静态资源的外放
app.use(static(
  path.join(__dirname, './public')
))
//跨域的设置
app.use(cors({
  origin: function (ctx) {
    return ctx.headers.origin;
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(koaBody({
  multipart: true,
}));
//post请求参数解析
app.use(bodyParser())
const router = new Router();


// /auth的接口要进行用户验证
router.use('/auth', jwtKoa({
  secret: config.secret
}), AuthUserInfo.routes());
router.use('/auth', jwtKoa({
  secret: config.secret
}), AuthUserFocus.routes());
router.use('/auth', jwtKoa({
  secret: config.secret
}), AuthFocusBa.routes());
router.use('/auth', jwtKoa({
  secret: config.secret
}), AuthTie.routes());
router.use('/auth', jwtKoa({
  secret: config.secret
}), AuthComment.routes());

// 加载路由
router.use('/api', ApiTiebalist.routes());
router.use('/api', ApiUserInfo.routes());
router.use('/api', ApiBaInfo.routes());
router.use('/api', ApiTieInfo.routes());
router.use('/api', ApiTieList.routes());
router.use('/login', login.routes());
router.use('/register', register.routes());

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(`Running in ${config.host}:${config.port}`)
})