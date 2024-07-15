const Koa = require('koa');
const router = require('../router/index')
const config = require('../config/index')
const app = new Koa()
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');//用作解析


app.use(cors(
  {
    origin: '*',
    maxAge: 86400,
    credentials: true,  // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 设置获取其他自定义字段
  }
))

// 使用 koaBody 中间件
app.use(bodyParser(
  {
    extendTypes: {
      json: ['application/x-javascript']
    },
    multipart: true // ***** 就是这个 (是否支持 multipart-formdate 的表单)
  }
))

let routesKeys = Object.keys(router)
routesKeys.forEach((keys) => {
  app.use(router[keys].routes())
  app.use(router[keys].allowedMethods())
})

app.listen(config.PORT, () => {
  console.log(`server running.... at http://${config.hostName}:${config.PORT}`);
})