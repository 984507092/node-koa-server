const Router = require('koa-router')
const router = new Router()
const saveFile = '../../json/login.json'
const fs = require('fs').promises
const path = require('path')
const cryptoJs = require('crypto-js')
const token = require('../../utils/token')


// 读取文件
async function readFile(data) {
  let filePath = path.resolve(__dirname, saveFile)
  const modifiedData = await fs.readFile(filePath, 'utf8');
  let saveFileData = {
    ...JSON.parse(modifiedData),
  }
  let username = saveFileData.username === data.username
  let password = saveFileData.password === cryptoJs.SHA1(data.password).toString()
  if (username && password) {
    saveFileData.token = token()
    await fs.writeFile(filePath, JSON.stringify(saveFileData), 'utf8')
    return {
      message: "登录成功",
      code: 200,
      data: {
        token: saveFileData.token,
        username: saveFileData.username,
        password: saveFileData.password
      }
    }
  } else {
    return {
      message: "用户名或密码错误",
      code: 200,
      data: null
    }
  }
}



router.post('/login', async (ctx, next) => {
  try {
    let data = ctx.request.body
    if (!data.username || !data.password) {
      ctx.body = {
        message: "请输入用户名或密码",
        code: 200,
        data: null
      }
      return
    }

    let sqlData = await readFile(data)
    ctx.body = sqlData

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