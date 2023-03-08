<template>
  <div class="my-info" :class="{'add-border-radius': !store.userInfo.name}">
    <!-- <div class="unlogin" v-if="!store.userInfo.name" @click="openDialog">登陆/注册</div> -->
    <div class="unlogin" v-if="!store.userInfo.name" @click="openDialog">
      <svg
        t="1678280330652"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3391"
      >
        <path
          d="M841.3 645.4c18.9-22.7 15.4-56.2-7.6-74.8-53.4-43-115.2-74.5-180.9-93.3C727.2 432.4 777 351.6 777 259.6c-0.1-140.6-116.3-255-259.1-255S258.8 119 258.8 259.7c0 90.3 47.9 169.7 119.9 215-83.3 22-160 64.5-223.2 125.2C60 691.6 5.3 814.2 1.7 945.3c-0.1 4.7-0.2 9.4-0.2 14.1 0 29.3 24.2 53.1 54 53.1s54-23.8 54-53.1c0-3.7 0.1-7.4 0.2-11.2 6-215.6 182.5-384.5 401.7-384.5 92.5 0 182.7 31.7 254.2 89.2 22.8 18.6 56.8 15.3 75.7-7.5zM517.9 110.9c83.3 0 151.2 66.8 151.2 148.8s-67.8 148.8-151.2 148.8-151.2-66.8-151.2-148.8 67.8-148.8 151.2-148.8z"
          fill="#333333"
          p-id="3392"
        ></path>
        <path
          d="M969.5 809.9h-38.7v-38.1c0-29.2-24.3-53.1-54-53.1s-54 23.9-54 53.1v38.1h-38.7c-29.7 0-54 23.9-54 53.1s24.3 53.1 54 53.1h38.7v38.1c0 29.2 24.3 53.1 54 53.1s54-23.9 54-53.1v-38.1h38.7c29.7 0 54-23.9 54-53.1s-24.4-53.1-54-53.1z"
          fill="#10346D"
          p-id="3393"
        ></path>
      </svg>
    </div>
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
import {useAxios} from '@/hooks/useAxios'
import Dialog from '@/components/common/Dialog.vue'
import {useLoginRegisterRules} from '@/hooks/useLoginRegisterRules'
import {ref, reactive, provide} from 'vue'
import {useBlogStore} from '@/store'

let dialogVisible = ref(false)
let activeName = ref('login')
let refLogForm = ref(null)
let refRegForm = ref(null)
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
})
const rules = useLoginRegisterRules(formData, 'regForm')
const store = useBlogStore()
provide('dialogVisible', dialogVisible)

function openDialog() {
  dialogVisible.value = true
}

// 注册按钮
function submitRegister() {
  refRegForm.value.validate(bool => {
    if (bool) {
      //表单数据校验成功
      useAxios(
        () => {
          refRegForm.value.resetFields() //清空表单数据
          activeName.value = 'login'
        },
        'POST',
        '/register',
        {
          name: formData.regForm.name,
          user: formData.regForm.user,
          password: formData.regForm.password,
        }
      )
    }
  })
}

// 登录按钮
function submitLogin() {
  refLogForm.value.validate(bool => {
    if (bool) {
      //表单数据校验成功
      useAxios(
        res => {
          refLogForm.value.resetFields() //清空表单数据
          dialogVisible.value = false //关闭dialog
          store.updateUserInfo(res.data) //存储用户信息
          store.getVisitor() //更新访客
        },
        'POST',
        '/login',
        {
          user: formData.logForm.user,
          password: formData.logForm.password,
        }
      )
    }
  })
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-top: 5px;

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
      line-height: 18px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  svg {
    width: 40px;
  }
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
