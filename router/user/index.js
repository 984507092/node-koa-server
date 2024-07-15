const Router = require('koa-router')
const router = new Router()
const getIPv4Address = require("../../utils/getIpAddress")
const { getWeather, getIpCode } = require('../../api/index')
const config = require('../../config/index')
const readFile = require('../../utils/readFile')
const loginInfo = '../../json/login.json'
const fs = require('fs').promises
const path = require('path')


router.get('/user', async (ctx, next) => {
  try {
    let { token } = ctx.request.headers

    let filePath = path.resolve(__dirname, loginInfo)
    let tokenInfo = await fs.readFile(filePath, 'utf8');
    tokenInfo = JSON.parse(tokenInfo).token
    if (!token) {
      ctx.body = {
        message: "请先登录",
        code: 200,
        data: null
      }
      return
    }

    if (token != tokenInfo) {
      ctx.body = {
        message: "登录已过期",
        code: 200,
        data: null
      }
      return
    }

    // 如果有请求ip 直接取 否则请求ip
    const ip = ctx.request.ip;
    // 或者获取经过代理的IP地址
    const forwardedFor = ctx.request.get('X-Forwarded-For');
    const realIp = ctx.request.get('X-Real-IP');

    // 优先使用X-Forwarded-For头部的IP地址，如果没有则使用X-Real-IP，最后才是request.ip
    const clientIP = forwardedFor
      ? forwardedFor.split(',').reverse()[0] // 获取X-Forwarded-For中的第一个IP地址
      : realIp ? realIp : ip

    let clientIp = getIPv4Address(clientIP)

    // 城市定位 code2
    let infoCode = await getIpCode({
      key: config.KEY,
      ip: clientIp.includes('127.0.0.1') ? '' : clientIp,
    })

    // 天气数据
    let data = await getWeather({
      key: config.KEY,
      city: JSON.parse(infoCode).adcode,
      extensions: "base",
      output: "JSON"
    })

    let logFile = {
      ...JSON.parse(data),
      ip: clientIp,
    }

    if (JSON.parse(data).status == 1) {
      ctx.body = {
        message: "操作成功",
        code: 200,
        data: logFile
      }

      readFile(logFile)
    } else {
      ctx.body = {
        message: "参数错误",
        code: 200,
        data: null
      }
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