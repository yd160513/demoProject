<template>
<!-- 第一种创建方式 -->
<!--  <div id="three"></div>-->
  <canvas id="box"></canvas>

<!--
  第二种创建方式
  这里直接定义一个 canvas 下边通过选择器去选择，会有一些问题
  当将这个 canvas 的样式 width 和 height 和 display: block; 的时候，渲染内容会根据浏览器的宽高变化被拉伸，解决方案有两个:
  1. 在 HTML 中声明一个 div，在 js 中通过 const renderer = new THREE.WebGLRenderer(); 生成 canvas 然后 appendChild 到 div 下，
     设置渲染器尺寸: renderer.setSize( window.innerWidth, window.innerHeight );
-->
<!--  <canvas id="c"></canvas>-->


<!--
 差别:
 1. 第一种通过 js 生成 canvas，第二种在页面中创建 canvas
 问题:
 1. 第一种方式不存在渲染内容根据浏览器变化被拉伸；
    第二种方式存在渲染内容根据浏览器变化被拉伸，前提: 设置了 canvas 的样式(width: 100%; height: 100%; display: block;)
    解决方案: 设置相机的宽高比设置为 canvas 的宽高比，在循环渲染函数里边增加:
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
 2. 分辨率低、块状化，被渲染项很模糊的问题
    定义: canvas的内部尺寸，它的分辨率，通常被叫做绘图缓冲区(drawingbuffer)尺寸。在three.js中我们可以通过调用renderer.setSize来设置canvas的绘图缓冲区
    解决方案: renderer.setSize( window.innerWidth, window.innerHeight, false )，
            可以在创建 renderer 的时候直接 setSize() 也可以在循环渲染的时候设置。
            建议在循环渲染中处理:
            1. 改变窗口之后可以随着改变。
            2. 应对HD-DPI显示器时更好，创建 renderer 时直接设置 canvas 的宽高获取不准确
    设置 false 的原因:
    1. render.setSize默认会设置canvas的CSS尺寸（增加行内样式），这样并不好。
    2. 如果你希望保持你的应用程序的尺寸，但是以较低的分辨率来渲染，你可以在调用setSize时，将updateStyle（第三个参数）设为false。
       例如，假设你的<canvas> 标签现在已经具有了100%的宽和高，调用setSize(window.innerWidth/2, window.innerHeight/2, false)将使得你的应用程序以一半的分辨率来进行渲染。
 -->
</template>
<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { makeInstance, initFun, initFun2, initFun3 } from '../utils/three'

export default defineComponent({
  name: '',
  setup(props) {

     //onMounted(initFun)
    //onMounted(initFun2)
    onMounted(initFun3)

    return {

    }
  }
})
</script>

<style scoped>
#three, #c {
  height: 100%;
  width: 100%;
  display: block;
}
</style>