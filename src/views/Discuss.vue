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

  <ul class="discuss">
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
            <span
              v-if="store.userInfo.admin || store.userInfo._id === host.author._id"
              @click="openDialogAndGetHostId(host._id)"
            >
              ❌
            </span>
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
      <div class="print-reply__wrap" v-show="host.isShowInput">
        <el-input
          type="textarea"
          size="small"
          maxlength="500"
          class="print-reply__input"
          v-model="host.replyText"
          :placeholder="`@${host.aiteUser.name}`"
          :autosize="{minRows: 2, maxRows: 4}"
        />
        <el-button type="primary" size="small" @click="submitReply(host)" round>提交回复</el-button>
      </div>
    </li>
  </ul>
  <Dialog>
    <el-card class="box-card">
      <h3>删除后该话题下的所有回复将一并清空！您确定删除吗？</h3>
      <p class="box-card__btn">
        <el-button round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" round @click="deleteDiscuss">确定</el-button>
      </p>
    </el-card>
  </Dialog>
</template>

<script setup>
import {arrEmoji} from '@/hooks/useEmoji';
import {useBlogStore} from '@/store';
import {ElMessage} from 'element-plus';
import Dialog from '@/components/common/Dialog.vue';
import {useAxios} from '@/hooks/useAxios';
import {ref, onMounted, provide} from 'vue';
import {isLogin} from '@/hooks/useIsLogin';

const store = useBlogStore();
let createDiscussText = ref('');

let isShowEmoji = ref(false);
function showEmoji() {
  //显示/关闭表情框
  isShowEmoji.value = !isShowEmoji.value;
}
onMounted(() => {
  document.addEventListener('click', () => {
    isShowEmoji.value = false;
  });
});

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
    //提交当前的评论hostId
    () => {
      store.getDiscuss();
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

// 删除留言的弹框
let dialogVisible = ref(false);
let deleteDiscussId = ref(''); // 保存二次确认要删除话题的ID
provide('dialogVisible', dialogVisible);
function openDialogAndGetHostId(hostId) {
  deleteDiscussId.value = hostId;
  dialogVisible.value = true;
}
function deleteDiscuss() {
  useAxios(
    () => {
      store.getDiscuss();
      dialogVisible.value = false;
    },
    'post',
    `/deleteTalk`,
    {hostId: deleteDiscussId.value}
  );
}
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
        &::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 17px;
          z-index: 10;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom-color: #000;
        }
        ul {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          width: 656px;
          padding: 10px;
          z-index: 999;
          border-radius: 10px;
          box-shadow: 0 0 4px #aaa;
          background-color: #fff;
          li {
            width: 35px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 18px;
            border-radius: 5px;
            box-shadow: 0 0 3px #aaa;
            margin: 5px;
          }
        }
      }
    }
  }
}

ul.discuss {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;

  li {
    margin: 10px 0;
    padding: 15px 20px;
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
          letter-spacing: 3px;
          span:nth-child(1) {
            color: #73b899;
          }
          span:nth-child(2) {
            color: #aaa;
          }
        }
        p.text {
          letter-spacing: 2px;
          margin-bottom: 16px;
          font-size: 14px;
          span {
            font-size: 12px;
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
          span:nth-child(3) {
            margin-right: 10px;
          }
        }
      }
    }
    // 回复框
    .print-reply__wrap {
      width: 100%;
      margin-top: 15px;
      text-align: end;
      .print-reply__input {
        margin-bottom: 12px;
      }
    }

    .reply-wrap {
      margin: 10px 8px 8px 55px;
    }
  }
}

.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 10px;
  padding: 20px;
  letter-spacing: 2px;
  line-height: 26px;
  .box-card__btn {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
}
</style>
