<template>
  <div class="nav-wrap">
    <nav>
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/dynamic">动态</RouterLink>
      <RouterLink to="/share">分享</RouterLink>
      <RouterLink to="/discuss">话题讨论</RouterLink>
      <RouterLink to="/friendLink">友链管理</RouterLink>
      <RouterLink to="/feedback">反馈</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
</style>