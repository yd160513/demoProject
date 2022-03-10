/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

//
// Node tool to dump SVG output into a file.
//

const fs = require("fs");
const util = require("util");
const path = require("path");
const stream = require("stream");

// HACK few hacks to let PDF.js be loaded not as a module in global space.
require("./domstubs.js").setStubs(global);

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.min.js");

// Some PDFs need external cmaps.
const CMAP_URL = "../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

// Loading file from file system into typed array
const pdfPath = 
  process.argv[2] || "./assets/1.pdf";
  // process.argv[2] || "./assets/2.pdf";
  // process.argv[2] || "./assets/3.pdf";
  // process.argv[2] || "./assets/4.pdf";
  // process.argv[2] || "./assets/5.pdf";
  // process.argv[2] || "./assets/6.pdf";
  // process.argv[2] || "./assets/7.pdf";
  // process.argv[2] || "./assets/8.pdf";
  // process.argv[2] || "./assets/9.pdf";
  // process.argv[2] || "./assets/10.pdf";
  // process.argv[2] || "./assets/123123的副本.pdf";

const pdfPaths = ["./assets/1.pdf", "./assets/2.pdf","./assets/3.pdf","./assets/4.pdf","./assets/5.pdf","./assets/6.pdf","./assets/7.pdf","./assets/8.pdf", "./assets/9.pdf","./assets/10.pdf","./assets/123123的副本.pdf"]
const data = new Uint8Array(fs.readFileSync(pdfPath));

const outputDirectory = "../output";

try {
  // Note: This creates a directory only one level deep. If you want to create
  // multiple subdirectories on the fly, use the mkdirp module from npm.
  fs.mkdirSync(outputDirectory);
} catch (e) {
  if (e.code !== "EEXIST") {
    throw e;
  }
}

// Dumps svg outputs to a folder called output
function getFilePathForPage(pageNum) {
  const name = path.basename(pdfPath, path.extname(pdfPath));
  return path.join(outputDirectory, `${name}-${pageNum}.svg`);
}

/**
 * A readable stream which offers a stream representing the serialization of a
 * given DOM element (as defined by domstubs.js).
 *
 * @param {object} options
 * @param {DOMElement} options.svgElement The element to serialize
 */
function ReadableSVGStream(options) {
  if (!(this instanceof ReadableSVGStream)) {
    return new ReadableSVGStream(options);
  }
  stream.Readable.call(this, options);
  this.serializer = options.svgElement.getSerializer();
}
util.inherits(ReadableSVGStream, stream.Readable);

ReadableSVGStream.prototype._read = function () {
  let chunk;
  while ((chunk = this.serializer.getNext()) !== null) {
    if (!this.push(chunk)) {
      return;
    }
  }
  this.push(null);
};

// Streams the SVG element to the given file path.
function writeSvgToFile(svgElement, filePath) {
  let readableSvgStream = new ReadableSVGStream({
    svgElement,
  });
  const writableStream = fs.createWriteStream(filePath);
  return new Promise(function (resolve, reject) {
    readableSvgStream.once("error", reject);
    writableStream.once("error", reject);
    writableStream.once("finish", resolve);
    readableSvgStream.pipe(writableStream);
  }).catch(function (err) {
    readableSvgStream = null; // Explicitly null because of v8 bug 6512.
    writableStream.end();
    throw err;
  });
}

// Will be using async/await to load document, pages and misc data.
const loadingTask = pdfjsLib.getDocument({
  data,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
  fontExtraProperties: true,
});

const handle2 = async (filePath, index) => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjsLib.getDocument({
    data,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    fontExtraProperties: true,
  });
  const doc = await loadingTask.promise;
  const numPages = doc.numPages;
  console.log("# Document Loaded");
  console.log(`Number of Pages: ${numPages}`);
  const pageNum = 1
  try {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    console.log(`Size: ${viewport.width}x${viewport.height}`);
    const opList = await page.getOperatorList();
    const svgGfx = new pdfjsLib.SVGGraphics(
      page.commonObjs,
      page.objs,
      /* forceDataSchema = */ true
    );
    svgGfx.embedFonts = true;
    // 文件内容
    const svg = await svgGfx.getSVG(opList, viewport);
    fs.writeFileSync(path.resolve(__dirname, 'output', `${index}.svg`), svg.toString(), 'utf8');

    // Release page resources.
    page.cleanup();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  console.log('create end')
}

// async function test () {
//   let i = 0
//   for (const iterator of pdfPaths) {
//     console.log(iterator)
//     await handle2(iterator, ++i)
//   }
// }
// test()


// 读取第一页 PDF 内容并转成 svg
const handle = async () => {
  const loadingTask = pdfjsLib.getDocument({
    data,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    fontExtraProperties: true,
  });
  const doc = await loadingTask.promise;
  const numPages = doc.numPages;
  console.log("# Document Loaded");
  console.log(`Number of Pages: ${numPages}`);
  const pageNum = 1
  try {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    console.log(`Size: ${viewport.width}x${viewport.height}`);
    const opList = await page.getOperatorList();
    const svgGfx = new pdfjsLib.SVGGraphics(
      page.commonObjs,
      page.objs,
      // /* forceDataSchema = */ true
    );
    // svgGfx.embedFonts = true;
    // 文件内容
    const svg = await svgGfx.getSVG(opList, viewport);
    // 生成文件
    fs.writeFileSync(path.resolve(__dirname, '../output', '1.svg'),svg.toString(), 'utf8');
    
    // // 获取 canvas （一下代码在 node 环境无法执行，需要在浏览器环境下）
    // const canvas = document.createElement('canvas')
    // const context = canvas.getContext('2d')
    // const img = new Image()
    // // svg内容中可以有中文字符
    // img.src = `data:image/svg+xml,${decodeURI(encodeURIComponent(svg))}`
    // img.onload = () => {
    //   console.log(`img 加载完成`, img)
    //   canvas.width = img.width
    //   canvas.height = img.height

    //   context?.drawImage(img, 0, 0)
    //   // 获取到 dataURL 再得到 base64
    //   const base64 = canvas.toDataURL('image/png').replace('data:image/png;base64,', '')
    //   console.log('base64: ', base64)
    // }
    
    // Release page resources.
    page.cleanup();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  console.log('create end')
}
handle()

// 遍历所有页，依次生成 svg
// (async function () {
//   const doc = await loadingTask.promise;
//   const numPages = doc.numPages;
//   console.log("# Document Loaded");
//   console.log(`Number of Pages: ${numPages}`);
//   console.log();

//   for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//     try {
//       const page = await doc.getPage(pageNum);
//       console.log(`# Page ${pageNum}`);
//       const viewport = page.getViewport({ scale: 1.0 });
//       console.log(`Size: ${viewport.width}x${viewport.height}`);
//       console.log();

//       const opList = await page.getOperatorList();
//       const svgGfx = new pdfjsLib.SVGGraphics(
//         page.commonObjs,
//         page.objs,
//         /* forceDataSchema = */ true
//       );
//       svgGfx.embedFonts = true;
//       const svg = await svgGfx.getSVG(opList, viewport);
//       await writeSvgToFile(svg, getFilePathForPage(pageNum));
//       // Release page resources.
//       page.cleanup();
//     } catch (err) {
//       console.log(`Error: ${err}`);
//     }
//   }
//   console.log("# End of Document");
// })();
