import { defineStore } from 'pinia';
import { useAxios } from '@/hooks/useAxios';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    userInfo: {},
    visitorData: [],
    baseURL: 'http://127.0.0.1:3300'
    // baseURL: 'http://116.62.33.47:3300'
  }),
  actions: {
    updateUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    clearUserInfo() {
      this.userInfo = {};
    },
    getVisitor() {
      useAxios(
        res => {
          // 按日期排序 + 只展示前8个 + 格式化时间戳
          this.visitorData = res.data
            .sort((a, b) => b.date - a.date)
            .slice(0, 8)
            .map(val => {
              val.date = new Date(val.date).toLocaleString();
              return val;
            });
          console.log('访客数据', this.visitorData);
        },
        'GET',
        '/getVisitor'
      );
    }
  },
  getters: {},
});