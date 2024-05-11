const request = require('../utils/request')

// 请求天气
function getWeather(params) {
  return request({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    method: 'get',
    responseType: 'text', // 指定回调函数的名称
    params
  })
}

// 请求定位
function getIpCode(params) {
  return request({
    url: 'https://restapi.amap.com/v3/ip',
    method: 'get',
    responseType: 'text', // 指定回调函数的名称
    params
  })
}



module.exports = {
  getWeather,
  getIpCode
}