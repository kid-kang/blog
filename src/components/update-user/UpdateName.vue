<template>
  <el-form ref="refNicknameForm" :model="nicknameForm" label-width="100px" :rules="rules">
    <el-form-item label="当前昵称">
      <span class="cur-nickname">{{ store.userInfo.name }}</span>
    </el-form-item>
    <el-form-item label="新的昵称" prop="name">
      <el-input v-model="nicknameForm.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" round>修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {useBlogStore} from '../../store';
import {reactive, ref} from 'vue';
import {useLoginRegisterRules} from '../../hooks/useLoginRegisterRules';
import {useAxios} from '@/hooks/useAxios';

let refNicknameForm = ref(null);
const store = useBlogStore();
const nicknameForm = reactive({name: ''});
const rules = useLoginRegisterRules(nicknameForm, 'name');

function onSubmit() {
  refNicknameForm.value.validate(bool => {
    if (bool) {
      useAxios(
        res => {
          store.updateUserInfo(res.data);
          store.getVisitor(); // 更新访客
          refNicknameForm.value.resetFields();
        },
        'POST',
        '/updateName',
        {name: nicknameForm.name}
      );
    }
  });
}
</script>

<style scoped lang="scss">
.cur-nickname {
  color: #6bc30d;
  font-weight: 600;
}
</style>
