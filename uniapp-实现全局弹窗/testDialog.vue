<template>
  <van-dialog v-model:show="showDialog">
    测试内容
    <view class="close-btn" @click="close"> 关闭 </view>
  </van-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  visible: Boolean,
  config: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const showDialog = ref(props.visible);

// 关闭弹窗时通知父组件
const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
