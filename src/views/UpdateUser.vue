<template>
  <ul>
    <li>
      <h2>修改用户名</h2>
      <UpdateName></UpdateName>
    </li>
    <li>
      <h2>修改密码</h2>
      <UpdatePassword></UpdatePassword>
    </li>
    <li>
      <h2>头像上传</h2>
      <UpdateAvatar></UpdateAvatar>
    </li>
  </ul>
</template>

<script setup>
import UpdateAvatar from '../components/update-user/UpdateAvatar.vue';
import UpdateName from '../components/update-user/UpdateName.vue';
import UpdatePassword from '../components/update-user/UpdatePassword.vue';
</script>

<style scoped lang="scss">
ul {
  width: 100%;
  li {
    width: 100%;
    margin-bottom: 10px;
    padding: 25px 20px;
    background-color: #fff;
    box-shadow: 0 0 4px #ddd;
    border-radius: 10px;
    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
  }
}
</style>
