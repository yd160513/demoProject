import * as THREE from 'three'
import createGeometry from '../../utils/three/图形'

/**
 * 创建几何的实例
 * @param geometry 几何
 * @param color
 * @param x
 */
export const makeInstance = (geometry: THREE.BoxGeometry, color: number, x: number) => {
    /**
     * 给它一个材质: 相当于给几何定义的样式。
     * MeshBasicMaterial，这个材质不会受到灯光的影响
     * MeshPhongMaterial 这个材质会受到灯光的影响，设置为这个材质对应的也要设置灯光，要不然就是黑的
     */
    const material = new THREE.MeshPhongMaterial({ color })

    /**
     * 创建 mesh，相当于将几何和样式融合为一体，用 mesh 来承载
     * Mesh（网格）: 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
     */
    const cube = new THREE.Mesh(geometry, material)

    // mesh 的位置
    cube.position.x = x

    return cube
}

// TODO: 直接采用 initFun2 的方式，这种方式在处理分辨率低、渲染画面模糊和处理HD-DPI显示器时有问题，待解决，原因好像是获取 canvas 宽高有问题。
export const initFun = () => {

    // 场景
    const scene = new THREE.Scene();
    /**
     * 渲染器:
     * 这里是施展魔法的地方。
     * 除了我们在这里用到的WebGLRenderer渲染器之外，Three.js同时提供了其他几种渲染器，
     * 当用户所使用的浏览器过于老旧，或者由于其他原因不支持WebGL时，可以使用这几种渲染器进行降级。
     */
    const renderer = new THREE.WebGLRenderer();
    /**
     * 相机: PerspectiveCamera(透视摄像机)
     * 第一个参数: 视野角度（FOV）: 无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)
     * 第二个参数: 长宽比（aspect ratio）: 也就是你用一个物体的宽除以它的高的值。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。
     * 最后两个参数: 两个参数是近截面（near）和远截面（far）: 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。
     */
    const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 5 );

    /**
     * 设置一个渲染器的尺寸: 建议在循环渲染函数中处理
     * 我们可以使用所需要的渲染区域的宽高，来让渲染器渲染出的场景填充满我们的应用程序。因此，我们可以将渲染器宽高设置为浏览器窗口宽高。
     * 对于性能比较敏感的应用程序来说，你可以使用setSize传入一个较小的值，例如window.innerWidth/2和window.innerHeight/2，这将使得应用程序在渲染时，以一半的长宽尺寸渲染场景。
     *
     * 如果你希望保持你的应用程序的尺寸，但是以较低的分辨率来渲染，你可以在调用setSize时，将updateStyle（第三个参数）设为false。
     * 例如，假设你的<canvas> 标签现在已经具有了100%的宽和高，调用setSize(window.innerWidth/2, window.innerHeight/2, false)将使得你的应用程序以一半的分辨率来进行渲染。
     */
    renderer.setSize( window.innerWidth, window.innerHeight );

    /**
     * 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。这就是渲染器用来显示场景给我们看的<canvas>元素。
     */
    document.getElementById('three')?.appendChild(renderer.domElement)

    // 创建一个立方体，我们需要一个BoxGeometry（立方体）对象. 这个对象包含了一个立方体中所有的顶点（vertices）和面（faces）。
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    // 创建实例，生成 mesh 和材质
    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2)
    ]

    // 将实例添加到场景中
    cubes.forEach(cube => {
        scene.add( cube );
    })

    /**
     * 默认情况下，当我们调用scene.add()的时候，物体将会被添加到(0,0,0)坐标。
     * 但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。
     * 个人理解: 默认坐标在左上角，
     */
    camera.position.z = 2;

    /**
     * 增加光照效果
     * 1. 平行光: 平行光有一个位置和目标点。默认值都为(0, 0, 0)。我们这里 将灯光的位置设为(-1, 2, 4)，让它位于摄像机前面稍微左上方一点的地方。目标点还是(0, 0, 0)，让它朝向坐标原点方向。
     */
    //const color = 0xFFFFFF;
    //const intensity = 1;
    //const light = new THREE.DirectionalLight(color, intensity);
    //light.position.set(-1, 2, 4);
    //scene.add(light);

    /**
     * 对上边的定义进行循环渲染
     * 基本上来说，当应用程序运行时，如果你想要移动或者改变任何场景中的东西，都必须要经过这个动画循环。
     */
    function animate() {
        /**
         * 旋转起来: 设置旋转角度
         * 旋转角度是弧度制，一圈的弧度为2Π所以我们的立方体在每个方向旋转一周的时间为6.28秒。
         */
        // 将实例添加到场景中
        cubes.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        })

        // resizeRendererToDisplaySize(renderer)

        renderer.render( scene, camera );

        requestAnimationFrame( animate );
    }

    animate();

}

// function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//         renderer.setSize(width, height, false);
//     }
//     return needResize;
// }
// 对上面同一个方法的优化: 应对HD-DPI显示器: renderer.setPixelRatio(window.devicePixelRatio);
/**
 * 应对HD-DPI显示器，使用renderer.setPixelRatio来告诉three.js分辨率的倍数: renderer.setPixelRatio(window.devicePixelRatio);
 * 但是不建议直接设置，建议根据渲染器尺寸来设置，具体设置方法见 resizeRendererToDisplaySize 方法
 */
function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    console.log(pixelRatio);
    const width = canvas.clientWidth * pixelRatio || 0;
    console.log(canvas.clientHeight);
    console.log(canvas.clientWidth);
    const height = canvas.clientHeight * pixelRatio || 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

export const initFun2 = () => {
    // 获取 canvas 对象
    const canvas = document.querySelector('#c');

    if (!canvas) return

    /**
     * 生成渲染器
     * 渲染器:
     * 这里是施展魔法的地方。
     * 除了我们在这里用到的WebGLRenderer渲染器之外，Three.js同时提供了其他几种渲染器，
     * 当用户所使用的浏览器过于老旧，或者由于其他原因不支持WebGL时，可以使用这几种渲染器进行降级。
     */
    const renderer = new THREE.WebGLRenderer({canvas});


    // 场景
    const scene = new THREE.Scene();
    /**
     * 相机: PerspectiveCamera(透视摄像机)
     * 第一个参数: 视野角度（FOV）: 无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)
     * 第二个参数: 长宽比（aspect ratio）: 也就是你用一个物体的宽除以它的高的值，默认值为 2。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。
     * 最后两个参数: 两个参数是近截面（near）和远截面（far）: 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。
     */
    const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 5 );

    // 创建一个立方体，我们需要一个BoxGeometry（立方体）对象. 这个对象包含了一个立方体中所有的顶点（vertices）和面（faces）。
    //const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const geometry = createGeometry()

    // 创建实例，生成 mesh 和材质
    const cube = makeInstance(geometry, 0x44aa88,  0)
    //const cubes = [
    //    makeInstance(geometry, '0x44aa88',  0),
    //    makeInstance(geometry, '0x8844aa', -2),
    //    makeInstance(geometry, '0xaa8844',  2)
    //]

    // 将实例添加到场景中
    scene.add( cube )
    //cubes.forEach(cube => {
    //    scene.add( cube );
    //})

    /**
     * 默认情况下，当我们调用scene.add()的时候，物体将会被添加到(0,0,0)坐标。
     * 但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。
     * 个人理解: 默认坐标在左上角，
     */
    camera.position.z = 2;

    /**
     * 增加光照效果
     * 1. 平行光: 平行光有一个位置和目标点。默认值都为(0, 0, 0)。我们这里 将灯光的位置设为(-1, 2, 4)，让它位于摄像机前面稍微左上方一点的地方。目标点还是(0, 0, 0)，让它朝向坐标原点方向。
     */
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    /**
     * 对上边的定义进行循环渲染
     * 基本上来说，当应用程序运行时，如果你想要移动或者改变任何场景中的东西，都必须要经过这个动画循环。
     */
    function animate() {
        /**
         * 旋转起来: 设置旋转角度
         * 旋转角度是弧度制，一圈的弧度为2Π所以我们的立方体在每个方向旋转一周的时间为6.28秒。
         */
        // 将实例添加到场景中
        //cubes.forEach(cube => {
        //    cube.rotation.x += 0.01;
        //    cube.rotation.y += 0.01;
        //})
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render( scene, camera );

        requestAnimationFrame( animate );
    }

    animate();

}

export const initFun3 = () => {
  // 创建场景
  const scene = new THREE.Scene()
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
  // 默认情况相机和被渲染的物体是坐标是重合的，所以将相机往远处放，也就是 Z 轴变大
  camera.position.z = 2
  // 获取页面 canvas 元素
  const canvas = document.getElementById('box')
  if (!canvas) return
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ canvas })


  // 创建立方体
  //const geometry = new THREE.BoxGeometry(1, 1, 1)
  const geometry = createGeometry()
  // 创建材质
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
  // 创建 mesh
  const cube = new THREE.Mesh(geometry, material)
  // 将 mesh 添加到场景中
  scene.add(cube)

  // 设置灯光
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);


  // 循环渲染
  const render = () => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    if (resizeRendererToDisplaySize(renderer)) {
      // 解决渲染内容根据浏览器变化被拉伸: 设置相机的宽高比设置为 canvas 的宽高比
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
}

export default {}