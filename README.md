# blog

使用 Vue3 + Pinia 重构 myblog 项目，优化性能，优化界面。使其成为公共的技术分享及讨论平台。

## 优化详情

| 修改描述                   | 改进方案 1                                                                             | 改进方案 2              |
| :------------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| 没有做前后端分离           | 改成前后端完全分离                                                                     |                         |
| Element-plus 完整引入      | 按需引入                                                                               | CDN 在线引入            |
| history 模式刷新导致 404   | 改成哈希模式或使用 connect-history-api-fallback 中间件                                 | 使用 query 渲染对应组件 |
| Vuex                       | Pinia                                                                                  |                         |
| 管理后台需手动输入路由进入 | 将入口可视化                                                                           |                         |
| 字体引入零散               | 整体引入                                                                               |                         |
| 功能整改-文章              | 新增 Tabbar-发表文章，文章新增编辑按钮和全局搜索框，按钮做权限控制，点击编辑进入编辑页 |                         |
| 功能整改-留言              | 改成话题讨论，新增删除按钮，配置权限                                                   |                         |
| 功能整改-首页              | 将友链和关于展示放在首页，整改文案，滚动条去除                                         |                         |
| 功能整改-友链和反馈        | 新增 2 个权限 Tabbar- 友链管理 - 反馈收集                                              |                         |
| 功能整改-访客模块          | 样式调整，加入来访时间                                                                 |                         |
| 功能整改-注册模块          | 新增 昵称 ，左侧栏板块显示自己的头像和昵称，原内容提取到首页                           |                         |
| 功能整改-md 文档插件       | md 文档插件更新引用方式                                                                |                         |
| 后端细节处理               | 删除或修改文章，更新头像，将以前的文件删除，防止积累过多垃圾文件                       |                         |

## 遇到的问题

- 个人信息栏板块 fixed 控制
  - 一开始用 粘性定位，发现定位盒子的父级不是 body，再用这个方式处理起来比较繁琐
  - 通过构造了一个 useFixed 函数 和一个空的 div 占位标签解决

```js
import {onMounted, ref} from 'vue';

export function useFixed() {
  let isFixed = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', () => {
      let top = document.documentElement.scrollTop;
      if (top > 0) isFixed.value = true;
      else isFixed.value = false;
    });
  });

  return isFixed;
}
```

- 后端 设置 cookie 的时候 userInfo 中有中文-导致 cookie 设置不成功
  - encodeURIComponent() 写 cookie 时不能出现中文，需要进行 URI 编码
  - 响应之前用 decodeURIComponent() 解码
- el-form 组件的 :model 属性绑定的是直接的表单对象，不能是对嵌套的对象

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
