import * as THREE from 'three'

const createGeometry = () => {
  // BoxGeometry 盒子
  //const width = 1
  //const height = 1
  //const depth = 1
  //const geometry = new THREE.BoxGeometry(width, height, depth)

  const width = 1;  // ui: width
  const height = 1;  // ui: height
  const depth = 1;  // ui: depth
  const widthSegments = 4;  // ui: widthSegments
  const heightSegments = 4;  // ui: heightSegments
  const depthSegments = 4;  // ui: depthSegments
  const geometry = new THREE.BoxGeometry(
    width, height, depth,
    widthSegments, heightSegments, depthSegments);


  return geometry
}

export default createGeometry