const Koa = require('koa');
const router = require('./router/index')
const config = require('./config/index')
const app = new Koa()
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');//用作解析


app.use(cors(
  {
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    maxAge: 86400,
  }
))
// 使用 koa-bodyparser 中间件
app.use(bodyParser());

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.PORT, () => {
  console.log(`server running.... at http://${config.hostName}:${config.PORT}`);
})