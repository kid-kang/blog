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
.nav-wrap {
  display: flex;
  position: fixed;
  justify-content: center;
  width: 100%;
  min-width: 1080px;
  z-index: 2000;
  top: 0;
  background-color: #fff;
}
.nav-wrap nav {
  display: flex;
  justify-content: space-around;
  width: 680px;
  height: 40px;
}
.nav-wrap nav a {
  display: inline-block;
  height: 38px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
  color: rgb(134, 130, 130);
}
.nav-wrap nav a:hover {
  color: tomato;
}
.nav-wrap nav a.router-link-active {
  color: tomato;
  border-bottom: solid 2px tomato;
}
</style>