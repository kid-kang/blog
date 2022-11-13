<template>
  <ShareOrEdit :formData="formData" :text="`修改`" :id="route.query.id"/>
</template>

<script setup>
import ShareOrEdit from '../components/ShareOrEdit.vue';
import {useRoute} from 'vue-router';
import {useBlogStore} from '@/store';

const route = useRoute();
const store = useBlogStore();

const formData = store.showDynamicData.find(val => val._id === route.query.id);
</script>

<style scoped lang="scss"></style>
