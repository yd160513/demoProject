<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
  <div class="bot">这里是底线</div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  align-items: stretch;
}
.bot {
  height: 30px;
  line-height: 30px;
  background-color: red;
}
</style>
