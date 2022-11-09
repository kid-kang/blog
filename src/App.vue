<template>
  <TopNav />
  <div class="app-wrap">
    <div class="info-section">

    </div>
    <div class="router-view">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import TopNav from './components/common/TopNav.vue';
</script>

<style scoped>
.app-wrap {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 1080px;
  margin: 45px auto;
}
.app-wrap .info-section {
  height: 300px;
  margin-right: 12px;
  flex: 1;
  background-color: skyblue;
  box-shadow: 0 0 4px #ddd;
}
.app-wrap .router-view {
  box-sizing: border-box;
  padding: 25px 20px;
  min-height: 100vh;
  width: 800px;
  box-shadow: 0 0 4px #ddd;
}
</style>
