const axios = require("axios");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { createHash } = require("crypto");
const { s3Header, getSignURL, baseHeader } = require("./config")

/**
 * 读取文件buffer - 一次性读取
 * @param filePath 文件地址
 * @returns 返回buffer
 */
// const readFileHandler = async (filePath) => {
//   const uploadSharp = sharp(fs.readFileSync(filePath))
//   const metaInfo = await uploadSharp.metadata()
//   const imageWidth = metaInfo.width || 0
//   const imageHeight = metaInfo.height || 0
//   if (imageWidth > imageHeight && imageWidth > 480) {
//     // 宽大于高，并且宽大于480 ，执行压缩
//     return uploadSharp.resize({ width: 480 }).png().toBuffer()
//   }
//   if (imageHeight > imageWidth && imageHeight > 480) {
//     return uploadSharp.resize({ height: 480 }).png().toBuffer()
//   }
//   return uploadSharp.png().toBuffer()
// }

// 读取文件 - 通过流的形式读
const readFileHandler = (filePath) => {
  // 创建读取流
  const readStream = fs.createReadStream(filePath)
  // 读取次数
  let count = 0
  // 读取到的数据
  const chunks = []
  return new Promise((resolve, reject) => {
    // 监听读取数据
    readStream.on('data', chunk => {
      chunks.push(chunk)
      count++
    })
    // 读取完毕
    readStream.on('end', () => {
      const bufferDat = Buffer.concat(chunks)
      console.log(`读取完毕！一共读取了 ${count} 次。`)
      resolve(bufferDat)
    })
    // 读取失败
    readStream.on('error', (err) => {
      console.log(err)
      reject(err)
    })
  })
}

/**
 *
 * @param sign 鉴权返回的内容
 * @param object 获取签名的地址 一般为/beem/文件名.文件类型
 * @returns 返回上传的地址
 */
const getUploadUrl = (sign, object) => {
  const { protocol, endpoint, bucket } = sign
  return `${protocol}://${endpoint}/${bucket}${object}`
}

/**
 *
 * @param object 获取签名的地址 一般为/beem/文件名.文件类型
 * @param method params内传入的方法 POST PUT
 * @returns sign后返回的上传地址
 */
 const getStcSignHandler = (object, method) => {
  return axios.get(getSignURL, {
    params: {
      method,
      object
    },
    headers: {
      ...baseHeader,
      ...s3Header
    },
  })
}

/**
 * 生成上传信息
 * @param uploadPath 需要上传的文件目录
 */
 const generateUploadInfo = async (
  uploadPath
) => {
  return new Promise((resolve) => {
    const fileType = path.extname(uploadPath);
    const fileName = path.basename(uploadPath)
    const tempFileName = `${new Date()
      .getTime()
      .toString()}${Math.random()}${fileType}`;
    const cacheFolder = path.resolve(__dirname, "temp");
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }
    const tempFilePath = path.resolve(cacheFolder, tempFileName);
    const hash = createHash("sha256");
    const sourceStream = fs.createReadStream(uploadPath);
    const writeStream = fs.createWriteStream(tempFilePath);
    sourceStream.pipe(hash);
    sourceStream.pipe(writeStream);
    sourceStream.on("end", () => {
      const fileSign = hash.digest().toString("hex");
      resolve({
        fileName,
        fileType,
        tempFilePath,
        fileSign,
        tempFileName,
      });
    });
  });
};

module.exports = {
  generateUploadInfo,
  getStcSignHandler,
  getUploadUrl,
  readFileHandler
}