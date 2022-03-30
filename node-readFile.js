const fs = require('fs');
/**
 * 读取文件
 * 读到的默认是 Buffer，可调用 buffer.toString() 方法
 */
 fs.readFile('./assets/c.png', (err, data) => {
  if (err) return console.log('读取文件失败', err)
  console.log('buffer =>', data)
  console.log('toString() =>', data.toString('utf8'))
})
