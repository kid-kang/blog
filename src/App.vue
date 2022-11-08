<template>
  <TopNav />
  <RouterView />
  <el-card>
    <el-button type="primary">Primary</el-button>
    <el-button type="primary">Primary</el-button>
  </el-card>
</template>

<script setup>
import { RouterView } from 'vue-router';
import TopNav from './components/common/TopNav.vue';
</script>

<style scoped>
</style>
