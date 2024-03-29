import { defineStore } from 'pinia';
import { useAxios } from '@/hooks/useAxios';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    baseURL: 'http://127.0.0.1:3300',
    userInfo: {},
    visitorData: [],
    discussData: [],
    dynamicData: [],
    myDynamic: [],
    unMyDynamic: [],
    showArticleList: [],
    friendLink: [],
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
        },
        'GET',
        '/getVisitor'
      );
    },
    getDiscuss() {
      useAxios(
        res => {
          res.data.forEach(host => {
            host.isShowInput = false; // 控制host下的回复框显示隐藏
            host.replyText = '';   // 控制当前评论下的回复input框里的内容
            host.aiteUser = host.author; // @的人默认是作者
            host.likesNumber = host.likes.length;  //host点赞的数量
            // 是否是点赞的状态
            host.like = this.userInfo._id && host.likes.includes(this.userInfo._id);
            host.children = host.children.map(child => {
              child.likesNumber = child.likes.length;
              child.like = this.userInfo._id && child.likes.includes(this.userInfo._id);
              return child;
            });
          });
          this.discussData = res.data; //将数据赋值给数组
        },
        'GET',
        '/getTalk'
      );
    },
    getDynamic() {
      useAxios((res) => {
        this.dynamicData = res.data; //获取所有文章动态数据
        this.myDynamic = [];
        this.unMyDynamic = [];
        this.dynamicData.forEach(val => {
          if (val.author._id === this.userInfo._id) this.myDynamic.push(val);
          else this.unMyDynamic.push(val);
        });
      }, 'get', '/getAllArticle');
    },
    getFriendLink() {
      useAxios((res) => {
        this.friendLink = res.data;
      }, 'get', '/getLinks');
    },
  },
});