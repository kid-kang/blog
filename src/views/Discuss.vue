<template>
  <article>
    <h2>创建话题</h2>
    <p>请文明发言，禁止广告。不然拉黑了嗷😂\(^o^)/~</p>
    <el-input
      type="textarea"
      :autosize="{minRows: 3, maxRows: 7}"
      placeholder="请输入内容"
      v-model="textarea"
      maxlength="500"
    />
    <div class="publish">
      <div class="emoji-box">
        <span class="iconfont" @click.stop="showEmoji">😀😛</span>
        <div class="emoji" v-show="isShow">
          <ul>
            <li v-for="(item, index) in arrEmoji" :key="index" @click="printEmoji(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
      <el-button type="primary" size="small" @click="submit" round>发表话题</el-button>
    </div>
  </article>
</template>

<script setup>
import {arrEmoji} from '../hooks/useEmoji';
</script>

<style scoped lang="scss">
article {
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
  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
  }
  ::v-deeep textarea {
    margin-top: 10px;
  }
  .publish {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .emoji-box {
      position: relative;
      .emoji {
        position: absolute;
        top: 30px;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0 0 3px #ccc;
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
</style>
