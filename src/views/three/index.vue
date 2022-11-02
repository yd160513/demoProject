<template>
  <div class="content">
    <div class="menu">
      123
    </div>
    <div class="right-content">
      <div class="three" id="c"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from "gsap"
// 导入控制台 GUI 库
import * as dat from "dat.gui"

export default defineComponent({
  setup() {
    /**
     * BufferGeometry、BoxGeometry、BoxBufferGeometry
     * BoxBufferGeometry 已弃用
     */
    onMounted(() => {
      const box = document.getElementById('c')
      if (!box) return
      // 初始化 GUI 控制台
      const gui = new dat.GUI()

      // 创建场景
      const scene = new THREE.Scene()

      /**
       * 创建相机:
       * 1. 透视相机: PerspectiveCamera => 模拟人的肉眼
       * 2. 正交相机: OrthographicCamera => 机械模型
       */
      const camera = new THREE.PerspectiveCamera(75, box.clientWidth/box.clientHeight, 0.1, 1000)
      camera.position.set(0, 0, 10)

      // 创建立方体
      const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
      // 添加材质
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
      // 将立方体和材质融合到一起
      const cube = new THREE.Mesh(boxGeometry, material)

      /**
       * 几何体: 两个点形成一条线，三个点形成一个面，一个正方形的面由两个三角形组成。
       * 几何体的基类是 BufferGeometry。
       * boxGeometry 中有一个 attribute 属性，该属性的基类是 BufferGeometry，基类中包含了顶点位置(position)、法相量(normal)和 UV 坐标(uv)
       * 顶点位置(position): 组成面的每条线的顶点，一个立方体有六个面，每个面有四个顶点，所以一共有24个顶点。
       *                    每个顶点的值是由 x,y,z 三个值组成的，所以有 72 个值。这些值放在 array 字段中。
       * uv: 举例: 一个正方体，将其展开平铺到一个平面上，这个平面就是 uv，uv 上的正方体每个顶点的坐标会对应到实际正方体上，这个坐标就称为 uv 坐标。
       *     用途: 做一个包装纸或者贴图，然后包装到待渲染的几何体上
       * 法相: 举例: 一束光照到几何体上，会有一个反射同时会有一定的角度，反射的角度是根据被照射面的朝向来决定的，法相就描述了被照射面的朝向
       *
       * 利用 BufferGeometry 创建几何体
       */
      // const geometry = new THREE.BufferGeometry()
      // // 定义顶点位置: 三个三角形定义一个正方形
      // const vertices = new Float32Array([
      //   -1.0, -1.0, 1.0,
      //   1.0, -1.0, 1.0,
      //   1.0, 1.0, 1.0,
      //   1.0, 1.0, 1.0,
      //   -1.0, 1.0, 1.0,
      //   -1.0, -1.0, 1.0
      // ])
      // // 设置顶点位置，标注每三个值是一个顶点
      // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
      // // 定义材质
      // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
      // // 材质和几何体结合生成最终的物体
      // const cube = new THREE.Mesh(geometry, material)
      // 添加到场景
      scene.add(cube)
      console.log(boxGeometry);
      console.log(cube);
      // 设置物体位置: 需要移动的话可以放到循环渲染函数中
      // cube.position.x = 5
      // cube.position.set(5, 0, 0)

      // cube.rotation.set(Math.PI / 4, 0, 0)

      // 设置物体缩放
      // cube.scale.set(1, 2, 3)

      // 针对数值设置
      gui.add(cube.position, 'x').min(0).max(10).step(0.01).name('移动X轴').onChange(e => {
        console.log(e);
      }).onFinishChange(e => {
        console.log('完成改动: ', e);
      })
      // 针对颜色设置
      const params = {
        color: '#ffff00',
        fn: () => {
          gsap.to(cube.position, { x: 5, duration: 5 , repeat: -1, yoyo: true })
        }
      }
      gui.addColor(params, 'color').onChange(e => {
        console.log(e);
        cube.material.color.set(e)
      })
      // 针对 boolean 设置
      gui.add(cube, 'visible').name('是否显示')
      // 针对函数设置，点击之后执行某个函数
      gui.add(params, 'fn').name('动画函数')
      // 将这些 gui 选项放到文件夹中
      const folder = gui.addFolder('菜单文件夹')
      // wireframe: 线框属性
      folder.add(cube.material, 'wireframe')

      scene.add(cube)

      // 创建渲染器: antialias 为 true 可解决锯齿问题
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(box.clientWidth, box.clientHeight, false)
      box.appendChild(renderer.domElement)

      // 使用渲染器，将场景通过相机渲染出来
      renderer.render(scene, camera)

      // 添加坐标轴辅助器: 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
      const axesHelper = new THREE.AxesHelper(10)
      scene.add(axesHelper)

      /**
       * 创建轨道控制器
       * 参数解释: 使相机围绕着目标进行轨道运动
       * 创建之后就可以控制了，但是要重新渲染才可以看到效果
       */
      const controls = new OrbitControls(camera, renderer.domElement)
      // 设置控制器阻尼，更具有真实效果，设置了这个之后必须在循环渲染函数中调用 control.update()
      controls.enableDamping = true

      // 设置时钟
      // const clock = new THREE.Clock()

      // 设置动画
      // const animate = gsap.to(cube.position, {
      //   x: 10,
      //   // 时长
      //   duration: 5,
      //   // 动画过渡效果
      //   ease: 'power1.inOut',
      //   // 重复次数: -1 无限次
      //   repeat: -1,
      //   // 往返运动
      //   yoyo: true,
      //   // 延迟时间
      //   delay: 2,
      //   onComplete: () => {
      //     console.log('动画结束');
      //   },
      //   onStart: (e) => {
      //     console.log('动画开始');
      //   }
      // })
      // gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: 'power1.inOut' })

      // const handle = () => {
      //   if (animate.isActive()) {
      //     // 暂停
      //     animate.pause()
      //   } else {
      //     // 恢复
      //     animate.resume()
      //   }
      // }
      const windowHandle = () => {
        const fullScreen = document.fullscreenElement
        if (!fullScreen) {
          renderer.domElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      }
      // window.addEventListener('dblclick', handle)
      window.addEventListener('dblclick', windowHandle)

      // 循环渲染: 浏览器每渲染一帧都调用渲染器重新渲染一次
      const render = () => {
        controls.update()
        // const runningTotalTime = clock.getElapsedTime()
        // const deltaTime = clock.getDelta()
        // console.log('运行时间总时长: ', runningTotalTime)
        // console.log('两次间隔时间: ', deltaTime)

        // cube.position.x += 0.01
        // // 设置物体旋转
        // cube.rotation.x += 0.01
        // if (cube.position.x > 5) cube.position.x = 0

        // 设置物体缩放
        // cube.scale.x += 0.1

        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }
      render()

      // 窗口变化渲染内容自适应
      window.addEventListener('resize', () => {
        console.log('resize');
        // 更新摄像头
        camera.aspect = box.clientWidth/box.clientHeight
        // 更新摄像机投影投影矩阵
        camera.updateProjectionMatrix()
        // 更新渲染器
        renderer.setSize(box.clientWidth, box.clientHeight)
        // 设置渲染器像素比为当前设备的像素比. TODO: 这个是解决失真问题的，如果需要 H5 这里需要设置，如果不是的话则可以不设置（个人理解）
        // renderer.setPixelRatio(window.devicePixelRatio)
      })
    })
  }
})
</script>

<style scoped>
.content {
  display: flex;
  height: 100%;
}
.menu {
  width: 150px;
  height: 100%;
}
.right-content {
  flex: 1;
}
.three {
  width: 100%;
  height: 100%;
}
</style>
