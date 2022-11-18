# blog

你好 👋！欢迎来到博客分享平台！在这里你可以浏览或分享一些你的技术文章亦或是美文美诗，甚至可以分享生活中的趣事，你也可以在讨论区说出你的看法，在这里你或许能遇见相似的灵魂...

该项目前端使用 Vue3 + Pinia 重构 [MyBlog](https://github.com/kid-kang/MyBlog) 项目，优化性能，优化界面。

后端源码请看 [blog-api](https://github.com/kid-kang/blog-api)

该平台诞生于 2021.9，重构于 2022.11

早就有过重构本站的念头但迟迟没有动手，这次终于撸起袖子，但是遇到的种种困难让我夜不能寐。我想，就算是通宵达旦我也要尽快的完成它！

## 优化详情

| 修改描述                   | 改进方案 1                                                   | 改进方案 2              |
| :------------------------- | ------------------------------------------------------------ | ----------------------- |
| 没有做前后端分离           | 改成前后端完全分离✋🏻                                         |                         |
| Element-plus 完整引入      | 按需引入                                                     | CDN 在线引入✋🏻          |
| history 模式刷新导致 404   | 改成哈希模式✋🏻或使用 connect-history-api-fallback 中间件     | 使用 query 渲染对应组件 |
| Vuex                       | Pinia✋🏻                                                      |                         |
| 管理后台需手动输入路由进入 | 将入口可视化✋🏻                                               |                         |
| 字体引入零散               | 整体引入✋🏻                                                   |                         |
| 功能整改-文章              | 新增 Tabbar-发表文章，文章新增编辑按钮和全局搜索框，按钮做权限控制，点击编辑进入编辑页✋🏻 |                         |
| 功能整改-留言              | 改成话题讨论，新增删除按钮，配置权限✋🏻                       |                         |
| 功能整改-首页              | 将友链和关于展示放在首页，整改文案✋🏻                         |                         |
| 功能整改-友链和反馈        | 新增 2 个权限 Tabbar- 友链管理 - 反馈收集✋🏻                  |                         |
| 功能整改-访客模块          | 样式调整，加入来访时间✋🏻                                     |                         |
| 功能整改-注册模块          | 新增 昵称 ，左侧栏板块显示自己的头像和昵称，原内容提取到首页✋🏻 |                         |
| 功能整改-md 文档插件       | md 文档插件更新引用方式✋🏻                                    |                         |
| 后端细节处理               | 删除或修改文章，更新头像，将以前的文件删除，防止积累过多垃圾文件✋🏻 |                         |

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
- 无法在 router.js 和 axios.js（等外部 js 文件）里使用 pinia，原因是外部 js 文件在 pinia 实例化之前解析，从而获取不到 pinia 的 store 实例对象。应该是 vue3 待决解的一个问题。目前没有找到绝对有效的方式解决。
  - 所以我的路由守卫改成封装 onBeforeMount 的方式解决
- 未知原因：router 要定义在 use 内才生效，store 就不需要。

```js
import {ElMessage} from 'element-plus';
import {useBlogStore} from '@/store';
import {onBeforeMount} from 'vue';
import {useRouter} from 'vue-router';
const store = useBlogStore();

export function useRedirect(isAdminPages) {
  const router = useRouter(); //未知原因 router要定义在use内才生效，store 就不需要。

  onBeforeMount(() => {
    if (isAdminPages && !store.userInfo.admin) {
      ElMessage.error('您没有管理员权限');
      router.replace('/');
    } else if (!store.userInfo.name) {
      ElMessage.error('请登录后操作！');
      router.replace('/');
    }
  });
}
```
- `<el-form :model="dialogFormData" :rules="rules">` 中的model属性不能嵌套，不然可能会绑定不到
- mongo表定义时间要写 Date.now ，不能加括号。

## 上线遇到的问题

- 后端部署到线上环境，前端在本地测试，发现接口无效
  - 原因：线上和本地为两个域名环境。cookie不同域不生效。
  - 把前端部署到同域名下的服务器就好了
  
- 前端升级到了https，但是后端还是http，导致https下的浏览器不请求http的接口
  
  - 解决：把后端也升级到https
  
- 后端升级https遇到的问题

  - 下载https包然后配置
  - 然后发现https放在本地运行无效  要放在线上环境
  - 遇见`NET::ERR_CERT_COMMON_NAME_INVALID`这个报错的原因是网站ssl证书颁发的域名与网站实际打开的域名（或者请求的URL）不匹配

  - 我的项目在部署https访问的时候报了该错误。于是我看了一下请求后台就接口地址。发现是(IP)https://ip/api，不是域名(https://www.xxx.com/api)。所以会报这个错。于是去前端把axios的请求路径换成域名形式的就ok。然后打包，重新上线！
  - [解释](https://blog.csdn.net/xzwwjl1314/article/details/105006707)

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
