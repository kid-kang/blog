<template>
  <div class="my-info" :class="{'add-border-radius': !store.userInfo.name}">
    <div class="unlogin" v-if="!store.userInfo.name" @click="openDialog">登陆/注册</div>
    <div class="logined" v-else>
      <img :src="store.baseURL + store.userInfo.avatar" alt="头像" />
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
import {useAxios} from '@/hooks/useAxios';
import Dialog from '@/components/common/Dialog.vue';
import {useLoginRegisterRules} from '@/hooks/useLoginRegisterRules';
import {ref, reactive, provide} from 'vue';
import {useBlogStore} from '@/store';

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
const rules = useLoginRegisterRules(formData, 'regForm');
const store = useBlogStore();
provide('dialogVisible', dialogVisible);

function openDialog() {
  dialogVisible.value = true;
}

// 注册按钮
function submitRegister() {
  refRegForm.value.validate(bool => {
    if (bool) {
      //表单数据校验成功
      useAxios(
        () => {
          refRegForm.value.resetFields(); //清空表单数据
          activeName.value = 'login';
        },
        'POST',
        '/register',
        {
          name: formData.regForm.name,
          user: formData.regForm.user,
          password: formData.regForm.password,
        }
      );
    }
  });
}

// 登录按钮
function submitLogin() {
  refLogForm.value.validate(bool => {
    if (bool) {
      //表单数据校验成功
      useAxios(
        res => {
          refLogForm.value.resetFields(); //清空表单数据
          dialogVisible.value = false; //关闭dialog
          store.updateUserInfo(res.data); //存储用户信息
          store.getVisitor(); //更新访客
        },
        'POST',
        '/login',
        {
          user: formData.logForm.user,
          password: formData.logForm.password,
        }
      );
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
  border-radius: 10px 10px 0 0;

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
      box-shadow: 0 0 4px #aaa;
      cursor: pointer;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      letter-spacing: 3px;
      font-weight: 600;
      // color: #6bc30d;
    }
  }
}

.my-info.add-border-radius {
  border-radius: 10px;
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
