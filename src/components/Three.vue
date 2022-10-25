<template>
  <div id="three"></div>
</template>
<script lang="ts">
import { onMounted, ref, computed, defineComponent, Ref } from 'vue'
import * as THREE from 'three'

export default defineComponent({
  name: '',
  setup(props) {

    const init = () => {
      // 场景
      const scene = new THREE.Scene();
      /**
       * 相机: PerspectiveCamera(透视摄像机)
       * 第一个参数: 视野角度（FOV）: 无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)
       * 第二个参数: 长宽比（aspect ratio）: 也就是你用一个物体的宽除以它的高的值。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。
       * 最后两个参数: 两个参数是近截面（near）和远截面（far）: 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。
       */
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
      /**
       * 渲染器:
       * 这里是施展魔法的地方。
       * 除了我们在这里用到的WebGLRenderer渲染器之外，Three.js同时提供了其他几种渲染器，
       * 当用户所使用的浏览器过于老旧，或者由于其他原因不支持WebGL时，可以使用这几种渲染器进行降级。
       */
      const renderer = new THREE.WebGLRenderer();
      //
      /**
       * 设置一个渲染器的尺寸:
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
      /**
       * 给它一个材质:
       * 使用的是MeshBasicMaterial。所有的材质都存有应用于他们的属性的对象。
       */
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      /**
       * Mesh（网格）
       * 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
       */
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      /**
       * 默认情况下，当我们调用scene.add()的时候，物体将会被添加到(0,0,0)坐标。
       * 但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。
       * 个人理解: 默认坐标在左上角，
       */
      camera.position.z = 5;

      /**
       * 对上边的定义进行循环渲染
       * 基本上来说，当应用程序运行时，如果你想要移动或者改变任何场景中的东西，都必须要经过这个动画循环。
       */
      function animate() {
        requestAnimationFrame( animate );

        // 旋转起来
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
      }
      animate();

    }

    onMounted(init)

    return {

    }
  }
})
</script>

<style scoped>
#three {
  height: 100%;
}
</style>