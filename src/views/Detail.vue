<template>
  <div class="md-wrap">
    <v-md-preview :text="text"></v-md-preview>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {useAxios, $axios} from '@/hooks/useAxios';
import {ref, onMounted} from 'vue';
const route = useRoute();

let text = ref('# 资源未找到');

function getSingleArticleDetail() {
  useAxios(
    async res => {
      text.value = `${await $axios.get(res.data.mdUrl)}`;
    },
    'get',
    '/getSingleArticle',
    {id: route.query.id}
  );
}
onMounted(() => getSingleArticleDetail());
</script>

<style scoped lang="scss">
.md-wrap {
  background-color: #fff;
  border-radius: 10px;
}
</style>
