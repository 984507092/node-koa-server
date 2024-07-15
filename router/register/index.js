const Router = require('koa-router')
const router = new Router()
const saveFile = '../../json/login.json'
const fs = require('fs').promises
const path = require('path')
const cryptoJs = require('crypto-js')
const token = require('../../utils/token')


router.post('/register', async (ctx, next) => {
  try {
    let data = ctx.request.body
    let filePath = path.resolve(__dirname, saveFile)
    if (!data.username && !data.password) {
      ctx.body = {
        message: "请输入用户名或密码",
        code: 200,
        data: null
      }
      return
    }

    const modifiedData = await fs.readFile(filePath, 'utf8');
    let saveFileData = {
      ...JSON.parse(modifiedData),
    }
    if (saveFileData.username === data.username) {
      ctx.body = {
        message: "用户名已存在",
        code: 200,
        data: null
      }
      return
    }

    saveFileData = {
      ...data,
      token: token(),
      password: cryptoJs.SHA1(data.password).toString()
    }
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8')
    let readData = await fs.readFile(filePath, 'utf8');

    if (readData.username) {
      ctx.body = {
        message: "注册成功",
        code: 200,
        data: {
          token: data.token
        }
      }
      return
    } else {
      ctx.body = {
        message: "请重新注册",
        code: 200,
        data: null
      }
      return
    }
  } catch (err) {
    ctx.body = {
      message: "操作失败",
      code: 500,
      data: null
    }
  }

  await next()
})


module.exports = router