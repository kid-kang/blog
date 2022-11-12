<template>
  <section>
    <h2>创建话题</h2>
    <p>请文明发言，禁止广告。不然拉黑了嗷😂\(^o^)/~</p>
    <el-input
      type="textarea"
      :autosize="{minRows: 3, maxRows: 7}"
      placeholder="请输入内容"
      v-model="createDiscussText"
      maxlength="500"
    />
    <div class="publish">
      <div class="emoji-box">
        <span class="iconfont" @click.stop="showEmoji">😀😛</span>
        <div class="emoji" v-show="isShowEmoji">
          <ul>
            <li v-for="(item, index) in arrEmoji" :key="index" @click="printEmoji(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
      <el-button type="primary" size="small" @click="submitDiscuss" round>发表话题</el-button>
    </div>
  </section>

  <ul>
    <li v-for="host in store.discussData" :key="host._id">
      <!-- host -->
      <div class="discuss-wrap">
        <img :src="store.baseURL + '/avatar' + host.author.avatar" />
        <div class="message-box">
          <div class="name-time">
            <span>{{ host.author.name }}</span>
            <span>{{ new Date(host.date).toLocaleString() }}</span>
          </div>
          <p class="text">{{ host.content }}</p>
          <div class="like-reply">
            <span @click="toHostLike(host._id)">{{ host.like ? '💖' : '🤍' }}</span>
            <span>{{ host.likesNumber }}</span>
            <span @click="replayToShowInpt(host)">💬</span>
          </div>
        </div>
      </div>
      <!-- child -->
      <div class="reply-wrap" v-for="(child, index) in host.children" :key="child._id">
        <img :src="store.baseURL + '/avatar' + child.author.avatar" />
        <div class="message-box">
          <div class="name-time">
            <span>{{ child.author.name }}</span>
            <span>{{ new Date(child.date).toLocaleString() }}</span>
          </div>
          <p class="text">
            <span>@{{ child.toId.name }}&nbsp</span>
            {{ child.content }}
          </p>
          <div class="like-reply">
            <span @click="toChildLike(host._id, child._id, index)">{{ child.like ? '💖' : '🤍' }}</span>
            <span>{{ child.likesNumber }}</span>
            <span @click="replayToShowInpt(host, child)">💬</span>
          </div>
        </div>
      </div>
      <!-- 回复框 -->
      <div class="print-reply" :class="{show: host.isShowInput}">
        <el-input size="small" v-model="host.replyText" :placeholder="`@${host.aiteUser.name}`" />
        <el-button type="primary" @click="submitReply(host)" round>提交回复</el-button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import {arrEmoji} from '@/hooks/useEmoji';
import {useBlogStore} from '@/store';
import {ElMessage} from 'element-plus';
import {useAxios} from '@/hooks/useAxios';
import {ref, onMounted} from 'vue';
import {isLogin} from '@/hooks/useIsLogin';

const store = useBlogStore();
let createDiscussText = ref('');
let isShowEmoji = ref(false);

function showEmoji() {
  isShowEmoji.value = !isShowEmoji.value; //显示/关闭表情框
}
function printEmoji(item) {
  createDiscussText.value += item; //点击输入表情到文本域
}

// 发表话题
function submitDiscuss() {
  if (!isLogin()) return false;
  if (!createDiscussText.value.trim()) return ElMessage.error('留言内容不能为空');

  useAxios(
    () => {
      store.getDiscuss();
      createDiscussText.value = ''; //清空文本域内容
    },
    'POST',
    '/addTalk',
    {textarea: createDiscussText.value.trim()}
  );
}

//给host点赞
function toHostLike(hostId) {
  if (!isLogin()) return false;

  useAxios(
    //提交当前的评论hostId + 当前点击了按钮的用户id
    () => {
      store.getDiscuss();
      console.log(store.userInfo)
      console.log(store.discussData)
    },
    'POST',
    '/toHostLike',
    {hostId}
  );
}

//给子节点点赞
function toChildLike(hostId, childId, childIndex) {
  if (!isLogin()) return false;

  useAxios(
    () => {
      store.getDiscuss();
    },
    'POST',
    '/toChildLike',
    {
      hostId,
      childId,
      childIndex,
    }
  );
}

// 显示隐藏input输入框 + @name
function replayToShowInpt(host, child) {
  if (!isLogin()) return false;

  if (!child) child = host;

  if (child.author._id !== host.aiteUser._id) {
    host.isShowInput = true;
  } else {
    host.isShowInput = !host.isShowInput; //点击显示/隐藏
  }
  host.aiteUser = child.author;
}

//提交回复按钮
function submitReply(host) {
  if (!isLogin()) return false;

  if (!host.replyText.trim()) return ElMessage.error('请输入回复的内容！');
  if (host.replyText.length > 500) return ElMessage.error('字数不能超过500');

  useAxios(
    () => {
      store.getDiscuss();
    },
    'POST',
    '/reply',
    {
      hostId: host._id,
      content: host.replyText.trim(),
      toId: host.aiteUser._id,
    }
  );
}

onMounted(() => {
  document.addEventListener('click', () => {
    isShowEmoji.value = false;
  });
});
</script>

<style scoped lang="scss">
section {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    text-indent: 10px;
    border-left: 5px solid #73b899;
  }
  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    margin-bottom: 15px;
  }
  .publish {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
    .emoji-box {
      position: relative;
      .emoji {
        position: absolute;
        top: 30px;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0 0 3px #aaa;
        &::before {
          content: '';
          position: absolute;
          top: -12px;
          left: -1px;
          z-index: 10;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom-color: #d8d6d6;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 250px;
          border-left: 1px solid #d8d6d6;
          border-bottom: 1px solid #d8d6d6;
          li {
            overflow: hidden;
            width: 25px;
            height: 25px;
            border-right: 1px solid #d8d6d6;
            border-top: 1px solid #d8d6d6;
            line-height: 25px;
            font-size: 18px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}

ul {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;

  li {
    margin: 10px 0;
    padding: 10px 20px;
    font-size: 12px;
    border-radius: 10px;
    box-shadow: 0 0 4px #aaa;

    .discuss-wrap,
    .reply-wrap {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 50%;
        box-shadow: 0 0 4px #aaa;
      }
      .message-box {
        width: 100%;
        .name-time {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 10px;
          span:nth-child(1) {
            color: #73b899;
            letter-spacing: 3px;
          }
          span:nth-child(2) {
            color: #aaa;
            letter-spacing: 2px;
          }
        }
        p.text {
          letter-spacing: 2px;
          margin-bottom: 16px;
          font-size: 14px;
          span {
            color: tomato;
          }
        }
        .like-reply {
          span:nth-child(1) {
            cursor: pointer;
            font-size: 14px;
          }
          span:nth-child(2) {
            display: inline-block;
            min-width: 40px;
            margin: 0 10px 0 5px;
            font-size: 14px;
          }
        }
      }
    }
    // 回复框
    .print-reply {
      overflow: hidden;
      width: 100%;
      height: 0;
      margin-top: 5px;
      padding-left: 55px;
      box-sizing: border-box;
      transition: height 0.2s;
      &.show {
        height: 60px;
      }
      .el-button {
        float: right;
      }
    }

    .reply-wrap {
      margin: 10px 8px 8px 55px;
    }
  }
}
</style>
