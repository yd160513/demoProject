<template>
  <h1>虚拟滚动（虚拟列表）参考: https://juejin.cn/post/6844903982742110216</h1>
  <div ref="content" class="content">
    <div class="fir">
      <h1 class="fir-tit" @click="handle">一次性加载全部数据</h1>
      <ul id="container"></ul>
    </div>
    <div class="sec">
      <h1>虚拟滚动 {{startOffset}}{{visibleData[0]}}</h1>
      <!-- 可视容器 -->
      <div ref="list" class="list-container" @scroll="scrollEvent">
        <!-- 容器内的占位，高度是列表总高度，用来形成滚动条 -->
        <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <!-- 具体列表项，也就是渲染区域  :style="{ position: 'absolute', top: `${startOffset}px`}" -->
        <div class="list" :style="{ transform: getTransform }" >
          <div
            ref="items"
            class="item"
            v-for="item in visibleData"
            :key="item.id"
            :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
          >{{start}} - {{ item.value }} - {{ visibleLineCount }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bot">这里是底线</div>
</template>
<script lang="ts">
import { onMounted, ref, computed, defineComponent, Ref } from 'vue'

export default defineComponent({
  name: '',
  props: {
    itemHeight: {
      type: Number,
      default: 100
    }
  },
  setup({ itemHeight }) {
    const listData: Ref<any[]> = ref([])
    for (let id = 0; id < 50; id++) {
      listData.value.push({
        id,
        value: id + 1 // 长文本
      });
    }
    // 可视区域高度
    const screenHeight = ref(0)
    // 偏移量
    const startOffset = ref(0)
    // 开始索引
    const start = ref(0)
    // 结束索引
    const end = ref(0)
    const list: Ref<HTMLDivElement | undefined> = ref()
    const content: Ref<HTMLDivElement | undefined> = ref()

    // 列表总高度
    const listHeight = computed(() => {
      return listData.value.length * itemHeight
    })

    // 视图内的总行数
    const visibleLineCount = computed(() => {
      // 避免产生展示不满的情况。比如得到 4.5 所以应该按 5 来算，而不应该按 4 来算。
      return Math.ceil(screenHeight.value / itemHeight)
    })

    /**
     * 偏移量对应的 style
     * 为什么需要偏移量: 
     *    因为在滚动后，渲染区域会偏离可视区域，目的是将滚动后的渲染区域偏移回可视区域内。
     *    需要偏移的时间点，就是前一条记录刚好离开可视区域，除此以外，不需要进行偏移。
     *    举例: 
     *    比如说，列表第 0 项，高度 100px，你现在滚动条滚动了 50px，期望的效果必然是第 0 项，
     *    一半在屏幕外，一半在屏幕内，此时是没有偏移量的，完全由滚动条来控制页面显示内容。
     *    此时又发生了滚动，滚动到了 100px，此时我们期望的效果: 可视区域已经没有第 0 项了，变成第 1 项。
     *    由于我们是虚拟列表，所以第 0 项的 dom 发生了修改变成了第 1 项的 dom，第 1 项的 dom 变成了第 2 项 dom，
     *    如果没有偏移量，可视区域的第一条内容就变成了第 2 项，所以我们需要修改偏移量，让列表像下偏移 100px，将第 1 项的 dom 显示出来。
     *    为什么偏移量越来越大?
     *    因为滚动的的距离越来越大，想要渲染区域永远在可视区域内，就要将偏移量和滚动距离统一。
     */
    const getTransform = computed(() => {
      return `translateY(${startOffset.value}px)`
      // return `translate3d(0, ${startOffset.value}px, 0)`
    })

    // 获取真实显示列表数据
    const visibleData = computed(() => {
      /**
       * 注意点: 
       * 1. slice() 返回的数组项不包括第二个参数，所以不需要 length - 1
       * 2. Math.min() + 1: 如果不加 1 在滚动的时候下一个还没有被加载导致白屏，滚动快了就会闪屏，所以这里多加载一条数据。
       */
      return listData.value.slice(start.value, Math.min(end.value, listData.value.length) + 1)
    })

    const scrollEvent = () => {
      // 当前滚动位置
      let scrollTop = list.value?.scrollTop;
      if (!scrollTop) return
      // 此时的开始索引。这里控制的是从第几个数据开始截取，如果滚动到 2.5 的时候，可视区域内还是应该能看到第 2 个的，所以向下取整得到 2，而不应该是 3。
      start.value = Math.floor(scrollTop / itemHeight);
      // 此时的结束索引
      end.value = start.value + visibleLineCount.value;
      // 此时的偏移量。
      startOffset.value = start.value * itemHeight
      // startOffset.value = Math.floor(scrollTop / itemHeight) * itemHeight
    }

    // 一次性加载全部是数据
    const handle = () => {
      // 记录任务开始时间
      let now = Date.now();
      // 插入一万条数据
      const total = 10000;
      // 获取容器z
      let ul = document.getElementById('container');
      // 将数据插入容器中
      for (let i = 0; i < total; i++) {
        let li = document.createElement('li');
        li.innerText = `${~~(Math.random() * total)}`
        ul?.appendChild(li);
      }
      console.log('JS运行时间：', Date.now() - now);
      setTimeout(() => {
        console.log('总运行时间：', Date.now() - now);
      }, 0)
    }

    onMounted(() => {
      if (list.value && content.value) {
        screenHeight.value = list.value?.clientHeight
        end.value = start.value + visibleLineCount.value
        console.log('end', end.value)
      }
    })

    return {
      start,
      startOffset,
      content,
      scrollEvent,
      list,
      visibleData,
      getTransform,
      visibleLineCount,
      listHeight,
      handle
    }
  }
})
</script>

<style scoped>
.content {
  display: flex;
  height: 100%;
  flex: 1;
  overflow: hidden;
}
.fir,
.sec {
  flex: 1;
  border: 1px solid red;
  overflow: hidden;
  flex-direction: column;
  display: flex;
}
.fir-tit {
  cursor: pointer;
}
#container {
  overflow: scroll;
}
.list-container {
  border: 1px solid blue;
  overflow: auto;
  position: relative;
  height: 100%;
}
.list {
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}
.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.item {
  color: #fff;
  background-color: #555;
  border: 1px solid green;
  box-sizing: border-box;
}
</style>