<template>
  <div class="three-demo">
    <div id="content"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import * as THREE from 'three'

export default defineComponent({
  setup() {

    const init = () => {
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer()
      // 添加到页面
      document.getElementById('content')?.appendChild(renderer.domElement)
      // 创建场景
      const scene = new THREE.Scene()
      // 创建相机
      const camera = new THREE.PerspectiveCamera(90, 2, 0.2, 1000)
      // 默认相机和被渲染的东西的位置都在 0,0,0 这里先将相机往远了拿
      camera.position.z = 2

      // 创建要渲染的东西
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      // 添加材质
      const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
      // 创建 mesh 将要渲染的东西和材质结合到一起
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      // 因为 MeshPhongMaterial 这种材质是受灯光影响的，有灯光才可以看到，添加一个灯光
      const light = new THREE.DirectionalLight(0xFFFFFF, 1)
      // 设置灯光的位置，也就是从哪里往下照射
      light.position.set(-1, 2, 4)
      scene.add(light)

      // 添加坐标辅助器
      const axesHelper = new THREE.AxesHelper(10)
      scene.add(axesHelper)

      // 循环渲染函数
      const render = () => {
        // 动起来
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        // 将场景和相机添加到渲染器
        renderer.render(scene, camera)
        // 循环渲染
        requestAnimationFrame(render)
      }

      render()
    }

    onMounted(() => {
      init()
    })

  }
})

</script>

<style scoped>
.three-demo {

}
</style>
