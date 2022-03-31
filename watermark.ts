/**
 * 参考连接: https://juejin.cn/post/6900713052270755847
 * 明水印的实现方式:
 *  1. HTML
 *  2. canvas
 *  3. svg
 * 明水印破解方式一:
 *  1. 删除水印 DOM
 * 对应防御方式
 *  1. 通过 mutationObserver() 监听水印的 DOM，如果 DOM 被删除或被修改则重新创建
 * 破解 mutationObserver() 的方案: 
 * 1. Chrome Devtools 的设置: debugger - disabled javascript
 * 2. 复制 body 元素，然后将原来的 body 删除
 * 暗水印的实现方式:
 *  应用在图片中，常见的为通过修改 RGB 分量值的小量变动、DWT、DCT 和 FFT 等等方法。
 *  每个图片都是由像素点组成的，每个像素点由 RGB 三种元素构成，然后将其中一个分量修改，人的肉眼很难看出其中变化。
 */
const FLAG = "阿豪阿卡阿甘";
let watermark;

/******************** 通过 css 实现 *********************/
const cssHelper = (el, prototype) => {
  for (let i in prototype) {
    el.style[i] = prototype[i];
  }
};

function createItem() {
  const item = document.createElement("div");
  item.innerHTML = FLAG;
  cssHelper(item, {
    position: "absolute",
    top: `50px`,
    left: `50px`,
    fontSize: `16px`,
    color: "#000",
    lineHeight: 1.5,
    opacity: 0.1,
    transform: `rotate(-15deg)`,
    transformOrigin: "0 0",
    userSelect: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
  });
  return item;
}

// 创建水印背景板
const createBackground = () => {
  const waterWrapper = document.createElement("div");
  cssHelper(waterWrapper, {
    position: "fixed",
    top: "0px",
    right: "0px ",
    bottom: "0px",
    left: "0px",
    overflow: "hidden",
    display: "flex",
    "flex-wrap": "wrap",
    "pointer-events": "none",
  });
  return waterWrapper;
};

const createWatermarkByHTML = () => {
  const waterWrapper = createBackground();

  // 每个水印块的尺寸
  const waterHeight = 100;
  const waterWidth = 180;
  // 页面尺寸
  const { clientWidth, clientHeight } =
    document.documentElement || document.body;
  // 计算宽高，看看能放多少个
  const column = Math.ceil(clientWidth / waterWidth);
  const rows = Math.ceil(clientHeight / waterHeight);
  // 根据具体尺寸生成具体个数的水印块
  for (let i = 0; i < column * rows; i++) {
    const wrap = document.createElement("div");
    cssHelper(
      wrap,
      Object.create({
        position: "relative",
        width: `${waterWidth}px`,
        height: `${waterHeight}px`,
        flex: `0 0 ${waterWidth}px`,
        overflow: "hidden",
      })
    );
    wrap.appendChild(createItem());
    waterWrapper.appendChild(wrap);
  }
  // 添加到页面上
  document.body.appendChild(waterWrapper);
  return waterWrapper;
};

// watermark = createWatermarkByHTML()

/******************** 通过 canvas 实现 *********************/
const createCanvas = () => {
  const angle = -20;
  const canvas = document.createElement("canvas");
  canvas.width = 180;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 180, 100);
  ctx.fillStyle = "#000";
  ctx.globalAlpha = 0.1;
  ctx.font = `18px serif`;
  ctx.rotate((Math.PI / 180) * angle);
  ctx.fillText(FLAG, 0, 50);
  return canvas.toDataURL();
};

const createWatermarkByCanvas = () => {
  const waterWrapper = createBackground();
  const dataUrl = createCanvas();
  waterWrapper.style.backgroundImage = `url(${dataUrl})`;
  document.body.appendChild(waterWrapper);
  return waterWrapper;
};
// watermark = createWatermarkByCanvas();

/******************** 通过 svg 实现 *********************/
const createSvg = () => {
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
                <text x="0px" y="30px" dy="16px"
                    text-anchor="start"
                    stroke="#000"
                    stroke-opacity="0.1"
                    fill="none"
                    transform="rotate(-20)"
                    font-weight="100"
                    font-size="16"
                    >
                    ${FLAG}
                </text>
            </svg>`;
  return `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(svgStr))
  )}`;
};

const createWatermarkBySvg = () => {
  const waterWrapper = createBackground();
  const svgUrl = createSvg();
  waterWrapper.style.backgroundImage = `url(${svgUrl})`;
  document.body.appendChild(waterWrapper);
  return waterWrapper;
};
watermark = createWatermarkBySvg();

// 防御方式一: mutationObserver()
// 被观察 DOM
const targetNode = document.body;
// 观察哪些变动
const config = {
  attributes: true,
  childList: true,
  subtree: true,
};
// 当观察到变动需执行的 callback
const callback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    mutation.removedNodes.forEach(function (item) {
      if (item === watermark) {
        document.body.appendChild(watermark);
      }
    });
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
