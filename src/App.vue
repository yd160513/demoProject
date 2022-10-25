<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <router-view></router-view>
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
