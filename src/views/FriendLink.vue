<template>
  <ul>
    <li>
      <h2>反馈&友链申请</h2>
      <p>有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)，若是想在本站申请友链，请按照以下格式提交反馈👇</p>
      <p class="example">名称：乐此不疲</p>
      <p class="example">主页地址：https://github.com/kid-kang</p>
      <p class="example">图标链接：https://avatars.githubusercontent.com/u/85065275?v=4</p>
      <p class="example">描述：爱踢足球的前端小码农一枚</p>
      <el-form :model="feedbackForm" :rules="rules" ref="refFeedbackForm" label-position="top">
        <el-form-item label="你的名字是？" prop="name">
          <el-input v-model="feedbackForm.name" />
        </el-form-item>
        <el-form-item label="你的邮箱" prop="email">
          <el-input v-model="feedbackForm.email" />
        </el-form-item>
        <el-form-item label="你要发送的消息内容" prop="message">
          <el-input v-model="feedbackForm.message" type="textarea" :autosize="{minRows: 1, maxRows: 7}" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" round>发送</el-button>
        </el-form-item>
      </el-form>
    </li>
    <li>
      <h2>友友们</h2>
      <div class="friends-wrap">
        <a v-for="item in store.friendLink" :key="item._id" :href="item.home">
          <img :src="item.logo" alt="logo" />
          <div class="text">
            <p>{{ item.name }}</p>
            <p>{{ item.describe }}</p>
          </div>
        </a>
      </div>
    </li>
  </ul>
</template>

<script setup>
import {useAxios} from '@/hooks/useAxios';
import {reactive, ref} from 'vue';
import {useBlogStore} from '../store';

const store = useBlogStore();

const rules = {
  name: [{required: true, message: '请填写您的称呼', trigger: 'input'}],
  email: [{required: true, type: 'email', message: '请填写正确的邮箱', trigger: 'input'}],
  message: [{required: true, message: '请填反馈内容', trigger: 'input'}],
};
let refFeedbackForm = ref(null);

const feedbackForm = reactive({
  name: '',
  email: '',
  message: '',
});

function submitForm() {
  refFeedbackForm.value.validate(bool => {
    if (bool) {
      useAxios(
        () => {
          refFeedbackForm.value.resetFields();
        },
        'POST',
        '/addFeedback',
        feedbackForm
      );
    }
  });
}
</script>

<style scoped lang="scss">
ul li {
  margin-bottom: 10px;
  padding: 25px 20px;
  background-color: #fff;
  border-radius: 10px;
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
  }
  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    a {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  p.it {
    span:nth-child(2) {
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
  }

  .QR-code {
    display: flex;
    justify-content: end;
    img {
      width: 150px;
      height: 150px;
      margin-left: 20px;
      box-shadow: 0 0 4px #aaa;
      border-radius: 10px;
    }
  }

  .el-form {
    margin-top: 30px;
  }

  p.example {
    user-select: text;
  }

  .friends-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    a {
      display: flex;
      width: 48%;
      border-radius: 8px;
      box-shadow: 0 0 4px #aaa;
      padding: 10px;
      margin-bottom: 18px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        margin-right: 18px;
      }
      .text {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: start;

        p:nth-child(1) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 16px;
          text-indent: 0;
        }
        p:nth-child(2) {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-indent: 0;
          color: #aaa;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
