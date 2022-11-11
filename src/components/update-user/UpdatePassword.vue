<template>
  <el-form ref="refUpdatePwdForm" :model="updatePwdForm.changePwd" label-width="100px" :rules="rules">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input type="password" v-model="updatePwdForm.changePwd.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="updatePwdForm.changePwd.password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="reNewPassword">
      <el-input type="password" v-model="updatePwdForm.changePwd.reNewPassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" round>修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {useLoginRegisterRules} from '../../hooks/useLoginRegisterRules';
import {useAxios} from '@/hooks/useAxios';
import {useBlogStore} from '../../store';
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
let refUpdatePwdForm = ref(null);
const store = useBlogStore();

const updatePwdForm = reactive({
  changePwd: {
    oldPassword: '', //旧密码
    Password: '', //新密码
    reNewPassword: '',
  },
});

const rules = useLoginRegisterRules(updatePwdForm, 'changePwd');

function onSubmit() {
  refUpdatePwdForm.value.validate(bool => {
    if (bool) {
      useAxios(
        () => {
          store.clearUserInfo(); //清空用户信息
          refUpdatePwdForm.value.resetFields(); //清空表单
          router.push('/');
        },
        'POST',
        '/updatePassword',
        {
          oldPassword: updatePwdForm.changePwd.oldPassword,
          newPassword: updatePwdForm.changePwd.reNewPassword,
        }
      );
    } else return false;
  });
}
</script>

<style scoped lang="scss">
</style>
