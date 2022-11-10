<template>
  <LoginRegister />
  <div class="user-btn" v-if="store.userInfo.name">
    <el-button type="primary" size="small" @click="updateInfo">修改信息</el-button>
    <el-button type="danger" size="small" @click="logout">退出登录</el-button>
  </div>
</template>

<script setup>
import LoginRegister from './LoginRegister.vue';
import {useAxios} from '@/hooks/useAxios';
import {useBlogStore} from '../store';
import {useRouter} from 'vue-router';

const store = useBlogStore();
const router = useRouter();

function logout() {
  useAxios(
    () => {
      store.clearUserInfo();
      router.push('/');
    },
    'post',
    '/logout'
  );
}

function updateInfo() {
  router.push('/updateUser');
}
</script>

<style scoped lang="scss">
.user-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0 12px 0;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
}
</style>
