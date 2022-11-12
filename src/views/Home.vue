<template>
  <ul>
    <li>
      <h2>HELLO</h2>
      <p>
        你好👋！欢迎来到博客分享平台！你现在看到的是我最引以为傲的作品，在这里你可以浏览或分享一些你的技术文章亦或是美文美诗，甚至可以分享生活中的趣事，你也可以在讨论区说出你的看法，在这里你或许能遇见相似的灵魂...
      </p>
      <p>
        本站开源，如果你对该项目感兴趣，可以进入我的
        <a href="https://github.com/kid-kang/blog" target="_blank">Github</a>
        ，其中记录了我重构本站的思路以及遇到的困难，如果觉得不错的话就点个 star 以作鼓励叭，你们的支持就是我前进的动力！
      </p>
      <p class="it">
        <a href="https://github.com/kid-kang/blog" target="_blank">前 端</a>
        ：
        <span>Vue3 + Pinia + Element-plus</span>
      </p>
      <p class="it">
        <a href="https://github.com/kid-kang/blog-api" target="_blank">后 端</a>
        ：
        <span>Node + Koa2 + MongoDB</span>
      </p>
      <p>该平台诞生于2021.9，重构于2022.11</p>
      <p>
        早就有过重构本站的念头但迟迟没有动手，这次终于撸起袖子，但是遇到的种种困难让我夜不能寐。我想，就算是通宵达旦我也要尽快的完成它！
      </p>
    </li>
    <li>
      <h2>反馈</h2>
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
      <h2>关于我</h2>
      <p>
        小王-前端工程师，精通 Ai、Fw、Fl、Br、Ae、Pr、Id、Ps 等软件的安装与卸载，精通
        CSS、JavaScript、PHP、ASP、C、C++、C#、Java、Ruby、Perl、Lisp、Python、Objective-C、ActionScript、Pascal
        等单词的拼写，熟悉 Windows、Linux、OS X、Android、iOS、WP8
        等系统的开关机。并持续学习前端开发，立志成为优秀的前端开发工程师~做个终身学习者。
      </p>
      <p>帅气这个形容词，大概就是为我而创造的吧😏</p>
      <p>有必要强调一下！我还没有脱发！大概是写的代码还不够多...</p>
      <p>什么?想加我微信？还是第一次被别人要微信，害羞🙈，什么？还要打赏我？幸福来得太突然了🤡</p>
      <p class="QR-code">
        <img src="https://tva1.sinaimg.cn/large/007dOMStgy1h80t7dn7a6j30qe0pkdll.jpg" alt="二维码" />
        <img src="https://tva1.sinaimg.cn/large/007dOMStgy1h80t7qrrgfj30ir0kf76y.jpg" alt="二维码" />
      </p>
    </li>
    <li>
      <h2>关于版权</h2>
      <p>在注明出处的前提下，本站文章允许非商业用途的转载。</p>
    </li>
  </ul>
</template>

<script setup>
import {useAxios} from '@/hooks/useAxios';
import {reactive, ref} from 'vue';

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
}
</style>
