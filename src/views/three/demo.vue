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

// 生成平面间的线
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

// 生成平面
const createPlaneInstance = (color: string = '#FFB6C1', x: number = 2) => {
  const geometry = new THREE.PlaneGeometry(5, 3)
  /**
   * Z-Fighting: 两个平面重叠之后闪烁的官方术语，类似于 z-index
   * 解决办法: polygonOffset: true, polygonOffsetUnits: 1, polygonOffsetFactor: 1
   */
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 })
  const plane = new THREE.Mesh(geometry, material)
  plane.position.set(0, x, 0)
  plane.rotation.set(-70, 0, 0)

  // 创建 geometry 的描边
  const edges = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: '#c2f1fb'
  })
  const line = new THREE.LineSegments(edges,edgesMaterial);
  plane.add(line)
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
      color: '#ffffff',
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

  const childGeometry = new THREE.PlaneGeometry(1, 1)
  const childMaterial = new THREE.MeshBasicMaterial({ color: '#0f3a9c', side: THREE.DoubleSide })
  const plane = new THREE.Mesh(childGeometry, childMaterial)
  plane.position.x = -1
  plane.position.y = 0.8
  const childGeometry2 = new THREE.PlaneGeometry(1, 1)
  const childMaterial2 = new THREE.MeshBasicMaterial({ color: '#2ccc5a', side: THREE.DoubleSide })
  const plane2 = new THREE.Mesh(childGeometry2, childMaterial2)
  plane2.position.x = 1
  plane2.position.y = 0.8
  const childGeometry3 = new THREE.PlaneGeometry(1, 1)
  const childMaterial3 = new THREE.MeshBasicMaterial({ color: '#471806', side: THREE.DoubleSide })
  const plane3 = new THREE.Mesh(childGeometry3, childMaterial3)
  plane3.position.x = 1
  plane3.position.y = -0.8
  const childGeometry4 = new THREE.PlaneGeometry(1, 1)
  const childMaterial4 = new THREE.MeshBasicMaterial({ color: '#6b15cb', side: THREE.DoubleSide })
  const plane4 = new THREE.Mesh(childGeometry4, childMaterial4)
  plane4.position.x = -1
  plane4.position.y = -0.8
  primitives.value[0].add(plane, plane2, plane3, plane4)


  const render = () => {
    controls.update()
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    // 这个放在 resizeRendererToDisplaySize 前边会有比较明显的闪烁
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.three-demo {
  width: 100%;
  height: 100%;
}
#content {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
