import * as THREE from 'three'
import {Ref, ref} from 'vue'
import { BufferGeometry, Camera, Mesh, MeshPhongMaterial, Scene } from 'three'

const raycaster = new THREE.Raycaster()
// TODO: 这里就是一个几何体，下边对应就是获取/设置几何体的材质，以这个为出发点看一下问题
const pickedObject: Ref<Mesh<BufferGeometry, MeshPhongMaterial> | undefined> = ref()
const pickedObjectSavedColor = ref(0)

const pick = (normalizedPosition: { x: number, y: number }, scene: Scene, camera: Camera, time: number) => {
  // 恢复上一个被拾取对象的颜色
  if (pickedObject.value) {
    pickedObject.value.material.emissive.setHex(pickedObjectSavedColor.value)
    pickedObject.value = undefined
  }

  // 发出射线
  raycaster.setFromCamera(normalizedPosition, camera)
  // 获取与射线相交的对象
  const intersectedObjects = raycaster.intersectObjects(scene.children)
  if (intersectedObjects.length) {
    // 获取包含平面的 object
    const objects: Mesh<BufferGeometry, MeshPhongMaterial>[] = []

    // 找到第一个对象，它是离鼠标最近的对象
    intersectedObjects.forEach(i => {
      if (i.object instanceof Mesh) {
        objects.push(i.object)
      }
    })

    pickedObject.value = objects[0]
    // 保存它的颜色
    pickedObjectSavedColor.value = pickedObject.value?.material.emissive.getHex()
    // 设置它的发光为 黄色/红色闪烁
    pickedObject.value?.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
  }

}

export default {
  pick
}
