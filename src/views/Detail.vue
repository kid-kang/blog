<template>详情</template>

<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();
console.log('文章id', route.query.id)
</script>

<style scoped lang="scss"></style>
