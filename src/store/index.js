import { defineStore } from 'pinia';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    userInfo: {},
    baseURL: 'http://127.0.0.1:3300'
    // baseURL: 'http://116.62.33.47:3300'
  }),
  actions: {
    updateUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    clearUserInfo() {
      this.userInfo = {};
    }
  },
  getters: {},
});