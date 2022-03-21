const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { publicStr, s3Header } = require("../config")
const { generateUploadInfo, getStcSignHandler, getUploadUrl, readFileHandler } =require("../utils")

/**
 * 流程:
 * 1. copy 待上传文件到临时文件夹，后续的操作基于这个临时文件来处理，并生成文件 hash
 * 2. 读取文件 buffer
 * 3. 上传 buffer
 * 4. 上传完成后删除临时文件
 */
const upload = async (uploadPath) => {
  const { fileName, tempFileName, tempFilePath } = await generateUploadInfo(uploadPath);
  const object = `/${publicStr}/${tempFileName}`
  const stcSignRes = await getStcSignHandler(object, 'PUT')
  const uploadUrl = getUploadUrl(stcSignRes.data.data, object)
  console.log('tempFilePath', tempFilePath, uploadUrl)
  const bufferData = await readFileHandler(tempFilePath)
  console.log(bufferData)
  const uploadRes = await axios.put(uploadUrl, bufferData, {
    headers: {
      ...s3Header,
      'Content-type': 'image/png',
      Authorization: stcSignRes.data.data.signature,
      'x-amz-date': stcSignRes.data.data.utcDate
    }
  })
  console.log('uploadRes', uploadRes)
  if (uploadRes && uploadRes.status === 200) {
    console.log(tempFilePath, fileName)
    const copyFolder = path.resolve('./', 'ouput')
    if (!fs.existsSync(copyFolder)) {
      fs.mkdirSync(copyFolder);
    }
    const finalPath = path.resolve(copyFolder, fileName)
    // 如果需要将临时文件改名的话则改名，同时也可以更改路径
    fs.renameSync(tempFilePath, finalPath)
    // 否则可以将临时文件删除
    // fs.unlinkSync(tempFilePath)
  }
};
const dir = path.resolve('./', 'assets/c.png')
upload(dir)
