<template>
  <div class="my-info">
    <div class="unlogin" v-if="!store.userInfo.name" @click="openDialog">登陆/注册</div>
    <div class="logined" v-else>
      <img :src="'http://116.62.33.47:3300'+store.userInfo.avatar" alt="头像">
      <p>{{ store.userInfo.name }}</p>
    </div>
  </div>

  <Dialog>
    <div class="dialog-form">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="formData.logForm"
            :rules="rules"
            ref="refLogForm"
            label-width="78px"
            class="dialog-form__logForm"
          >
            <el-form-item label="账号" prop="user">
              <el-input v-model="formData.logForm.user" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formData.logForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLogin">立即登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="formData.regForm" :rules="rules" ref="refRegForm" label-width="78px">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="formData.regForm.name" />
            </el-form-item>
            <el-form-item label="账号" prop="user">
              <el-input v-model="formData.regForm.user" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formData.regForm.password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input type="password" v-model="formData.regForm.rePassword" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitRegister">立即注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Dialog>
</template>

<script setup>
import {ElMessage} from 'element-plus';
import axios from '@/assets/axios';
import Dialog from './common/Dialog.vue';
import {useLoginRegisterRules} from '../hooks/useLoginRegisterRules';
import {ref, reactive, provide} from 'vue';
import {useBlogStore} from '../store';

let dialogVisible = ref(false);
let activeName = ref('login');
let refLogForm = ref(null);
let refRegForm = ref(null);
const formData = reactive({
  regForm: {
    name: '',
    user: '',
    password: '',
    rePassword: '',
  },
  logForm: {
    user: '',
    password: '',
  },
});
const rules = useLoginRegisterRules(formData);
const store = useBlogStore();
provide('dialogVisible', dialogVisible);

function openDialog() {
  dialogVisible.value = true;
}

// 注册按钮
function submitRegister() {
  refRegForm.value.validate(async bool => {
    if (bool) {
      //表单数据校验成功
      const res = await axios('POST', '/register', {
        name: formData.regForm.name,
        user: formData.regForm.user,
        password: formData.regForm.password,
      });

      if (res?.code && res?.code === 200) {
        ElMessage.success(res.message || '注册成功');
        refRegForm.value.resetFields(); //清空表单数据
        activeName.value = 'login';
      } else {
        ElMessage.error(res.message || '注册失败');
      }
    }
  });
}

// 登录按钮
function submitLogin() {
  refLogForm.value.validate(async bool => {
    if (bool) {
      //表单数据校验成功
      const res = await axios('POST', '/login', {
        user: formData.logForm.user,
        password: formData.logForm.password,
      });

      if (res?.code && res?.code === 200) {
        ElMessage.success(res.message || '登录成功');
        refLogForm.value.resetFields(); //清空表单数据
        dialogVisible.value = false; //关闭dialog
        store.updateUserInfo(res.data); //存储用户信息
      } else {
        ElMessage.error(res.message || '登录失败');
      }
    }
  });
}
</script>

<style lang="scss" scoped>
.my-info {
  text-align: center;
  height: 120px;
  padding: 16px;
  background-color: #fff;
  // background-color: #bfe2e6;
  border-radius: 10px;

  .logined {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 0 4px #ccc;
      cursor: pointer;
    }
    p {
      font-size: 14px;
      font-weight: 600;
    }
  }
}

.my-info .unlogin {
  cursor: pointer;
  font-size: 22px;
  line-height: 88px;
}

.dialog-form {
  position: absolute;
  width: 320px;
  height: 326px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background: #fff;
}

::v-deep {
  .dialog-form__logForm.el-form .el-form-item {
    margin: 40px 0;
  }
}
</style>
