<template>
  <div class="visitor-wrap">
    <h3>最近访客</h3>
    <ul>
      <li v-for="item in store.visitorData" :key="item._id">
        <img :src="store.baseURL + '/avatar' + item.visitor.avatar" alt="头像" />
        <div class="visit-time">
          <p>{{ item.visitor.name }}</p>
          <p>{{ item.date }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useBlogStore} from '@/store';
const store = useBlogStore();
</script>

<style scoped lang="scss">
.visitor-wrap {
  padding: 16px;
  background-color: #fff;
  // background-color: #bfe2e6;
  border-radius: 10px;
  margin-top: 10px;

  h3 {
    height: 25px;
    font-weight: bold;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 6px 12px;
      box-shadow: 0 0 4px #ccc;
      border-radius: 10px;
      margin-top: 4px;
      img {
        width: 38px;
        height: 38px;
        margin-right: 10px;
        border-radius: 6px;
      }
      .visit-time {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        font-size: 13px;
        color: rgb(168, 166, 166);
        p:nth-child(1) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #000;
        }
      }
    }
  }
}
</style>
