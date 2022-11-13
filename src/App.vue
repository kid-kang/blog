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

const store = useBlogStore();
store.getVisitor();
store.getDiscuss();
store.getDynamic();

let isFixed = useFixed();
useAvoidLogin();
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
  /* box-shadow: 0 0 4px #ddd; */
}

.app-wrap .info-section__box.fixed {
  position: fixed;
  top: 45px;
}
.app-wrap .router-view__box {
  min-height: 100vh;
  width: 800px;
  /* padding: 25px 20px; */
  /* border-radius: 10px; */
  /* box-shadow: 0 0 4px #ddd; */
  /* background-color: #fff; */
}
</style>
