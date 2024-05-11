const fs = require('fs').promises
const path = require('path')
let saveFile = '../json/data.json'
async function readFile(data) {
  let filePath = path.resolve(__dirname, saveFile)
  const modifiedData = await fs.readFile(filePath, 'utf8');
  const saveFileData = {
    ...JSON.parse(modifiedData),
  }
  saveFileData.data = data
  saveFileData.total++
  await fs.writeFile(filePath, JSON.stringify(saveFileData), 'utf8')
}

module.exports = readFile