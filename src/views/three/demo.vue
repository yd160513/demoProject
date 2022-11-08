<template>
  <div class="three-demo">
    <canvas id="content"></canvas>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import * as THREE from 'three'// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {Mesh, MeshBasicMaterial, PlaneGeometry, Vector3, WebGLRenderer} from "three";

// 所有的图元
const primitives: Ref<Mesh<PlaneGeometry, MeshBasicMaterial>[]> = ref([])

const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = canvas.clientWidth * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

const createLineInstance = () => {
  const lineMaterial = new THREE.LineBasicMaterial( {
    color: 0xffffff,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin:  'round' //ignored by WebGLRenderer
  } );

  // 根据图元数量确定线的数量
  const linePoints = primitives.value.map((item, i) => {
    const points: Vector3[] = [];
    const next = primitives.value[i + 1]
    if (next) {
      points.push( new THREE.Vector3( item.position.x, item.position.y, item.position.z ) );
      points.push( new THREE.Vector3( next.position.x, next.position.y, next.position.z ) );
    }

    return points
  })

  const lines = linePoints.map(points => {
    console.log(points)
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, lineMaterial );
    return line
  })

  return lines
}

const createPlaneInstance = (color: string = '#FFB6C1', x: number = 2) => {
  const geometry = new THREE.PlaneGeometry()
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
  const plane = new THREE.Mesh(geometry, material)
  plane.position.set(0, x, 0)
  plane.rotation.set(-70, 0, 0)
  plane.scale.x = 2
  return plane
}

const init = () => {
  // 获取容器
  const content = document.getElementById('content')
  if (!content) return

  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, content.clientWidth / content.clientHeight, 0.1, 1000)
  // 初始都在 0,0,0 为了可以看到物体，所以将相机往远拿
  camera.position.set(4, 6, 8)
  camera.rotation.set(-36.8, 21.7, 15.6)

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ canvas: content, antialias: true })
  renderer.setSize(content.clientWidth, content.clientHeight, false)

  // 添加坐标轴辅助器: 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)

  /**
   * 创建轨道控制器
   * 参数解释: 使相机围绕着目标进行轨道运动。相当于眼睛在动，物体不动
   * 创建之后就可以控制了，但是要重新渲染才可以看到效果
   */
  const controls = new OrbitControls(camera, renderer.domElement)
  // 设置控制器阻尼，更具有真实效果，设置了这个之后必须在循环渲染函数中调用 control.update()
  controls.enableDamping = true

  // 创建平面
  const arr = [
    {
      color: '#bf242a',
      x: 2
    },
    {
      color: '#ff461f',
      x: 1.5
    },
    {
      color: '#845a33',
      x: 1
    },
    {
      color: '#1685a9',
      x: 0.5
    },
    {
      color: '#003472',
      x: 0
    }
  ]
  arr.forEach(i => {
    const plane = createPlaneInstance(i.color, i.x)
    primitives.value.push(plane)
    scene.add(plane)
  })

  // 生成线
  const lines = createLineInstance()
  lines.forEach(line => {
    scene.add(line)
  })


  const render = () => {
    controls.update()
    renderer.render(scene, camera)
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    requestAnimationFrame(render)
  }
  render()
}

onMounted(() => {
  init()
})
</script>

<style scoped>
#content {
  display: block;
  width: 100%;
  height: 100%;
}
</style>