<template>
  <TopNav />
  <div class="app-wrap">
    <div class="info-section__box" v-if="isFixed"></div>
    <div class="info-section__box" :class="{fixed: isFixed}">
      <InfoSection />
    </div>
    <div class="router-view__box">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import {RouterView} from 'vue-router';
import TopNav from './components/TopNav.vue';
import InfoSection from './components/InfoSection.vue';
import {useFixed} from './hooks/useFixed';
import {useAvoidLogin} from './hooks/useAvoidLogin';
import {useBlogStore} from '@/store';

useAvoidLogin(); // 如果cookie有效则免登录

const store = useBlogStore();
store.getVisitor();
store.getDynamic();
store.getFriendLink();
store.getDiscuss();

let isFixed = useFixed();
</script>

<style scoped>
.app-wrap {
  display: flex;
  justify-content: start;
  width: 1080px;
  margin: 45px auto;
}
.app-wrap .info-section__box {
  width: 268px;
  margin-right: 12px;
  border-radius: 10px;
}

.app-wrap .info-section__box.fixed {
  position: fixed;
  top: 45px;
}
.app-wrap .router-view__box {
  min-height: 100vh;
  width: 800px;
}
</style>
