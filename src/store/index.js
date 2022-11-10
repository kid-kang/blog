import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    userInfo: {}
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