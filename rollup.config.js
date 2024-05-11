const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
module.exports = {
  input: './src/app.js', // 入口文件
  output: {
    file: './dist/bundle.js', // 输出文件
    format: 'es', // 输出格式 amd / es / cjs / iife / umd / system
    name: 'func',  // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
    sourcemap: true  // 生成bundle.js.map文件，方便调试
  },
  plugins: [
    terser(),
    commonjs(),
    json(),
    resolve(),
  ],
}